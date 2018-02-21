import React, {Component} from 'react';
import {styles} from "./styles";
import {ModalDialog,ProgressBar} from "../components";
import {api} from "../api";
import {genericUtil,imageUtil} from "../utils";
import {textValues} from "../configs";

export default class VideoImageUploader extends Component{

  constructor(props){
    super(props);
    this.state={progressValue:0, progressTotal:0, progressMessage:null};

  }
  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }


  setProgressValue(progressValue,progressTotal){
    this.setState(Object.assign({}, this.state,{progressValue,progressTotal,progressMessage:this.state.progressMessage}));
  }
  setProgressValueWithMessage(progressValue,progressTotal,progressMessage){
    this.setState(Object.assign({}, this.state,{progressValue,progressTotal,progressMessage}));
  }

  onUploadProgess(progressValue,total){
    this.setProgressValue(progressValue,total);
  }
  onUploadError(result){
        console.log("error:"+JSON.stringify(result));
        var modalMessage={
               title:"Error",
               content:result,
               onConfirm:this.onClearMessage.bind(this),
               confirmButton:"OK"
        }
        var progressValue=0;
        var progressTotal=0;
        this.setState(Object.assign({}, this.state,{modalMessage,progressValue,progressTotal}));
  }
  onUploadAborted(){
        var progressValue=0;
        var progressTotal=0;
        this.setState(Object.assign({}, this.state,{modalMessage:null,progressValue,progressTotal}));
  }
  onUploadAsEpisodeImage(){
        var request={
                    progressMessage: "Uploading the master image",
                    filepath:this.props.imageData.filepath,
                    imageBucket:this.props.imageData.imageBucket,
                    imageData:imageUtil.dataURLToBlob(this.props.imageurl),
                    onComplete:this.onUploadMasterImageComplete.bind(this)
         };
         this.uploadImage(request);

  }
  onUploadMasterImageComplete(data, props){
        this.uploadPublicImage(this.props.imageData.publicImages);
  }
  uploadPublicImage(publicImages){
    if(publicImages.length==0){
            this.onUploadComplete();
            return;
    }
    var punlicImage=publicImages[0];
    publicImages.splice(0,1);

    imageUtil.resizeImage({
      imageURL:this.props.imageurl,
      sourceWidth:this.props.videoWidth,
      sourceHeight:this.props.videoHeight,
      sourceX:0,
      sourceY:0,
      destX:0,
      destY:0,
      destWidth:punlicImage.width,
      destHeight:punlicImage.height,
      imageType:punlicImage.type,
      onComplete:(resizeImgData)=>{
          var request={
                    progressMessage: "Uploading the image:"+punlicImage.width+" x "+punlicImage.height,
                    filepath:punlicImage.filepath,
                    imageBucket:punlicImage.imageBucket,
                    imageData:resizeImgData,
                    onComplete:()=>{
                        this.uploadPublicImage(publicImages);
                    }
         };
         this.uploadImage(request);
      }
    });


  }
  uploadImage(request){
        this.setProgressValueWithMessage(0,1, request.progressMessage);
        var uploadRequest={
                    file:request.filepath,
                    bucket:request.imageBucket
         };
         api.requestS3UploadURL(uploadRequest).then(data=>{
              this.startUpload(data, request);
        }).catch(error=>{
               this.onUploadError("Failed upload the file:"+error);
           });

  }
  startUpload(s3,request){
                genericUtil.startUpload({
                  s3,
                  file:request.imageData,
                  onProgress:this.onUploadProgess.bind(this),
                  onComplete:request.onComplete,
                  onError:this.onUploadError.bind(this),
                  onAbort:this.onUploadAborted.bind(this)
                    });
  }

onUploadComplete(){
    this.props.onUploadComplete(this.props.imageData);    
    var modalMessage={
           title:"Image Copmplete",
           content:"Image is uploaded to the s3 bucket successfully",
           onConfirm:()=>{
             this.props.onCancel();
           },
           confirmButton:"OK",
           customButton:{
             label:"Got to Image Manager",
             link:textValues.imageManager.link+"?episodeid="+this.props.episode.id
           }
    }
    var progressValue=0;
    var progressTotal=0;
    this.setState(Object.assign({}, this.state,{modalMessage,progressValue,progressTotal}));
  }


  onCancel(){
    this.props.onCancel();
  }

  render(){
      var width=this.props.videoWidth;
      var height=this.props.videoHeight;

      var {progressValue,progressTotal,progressMessage}=this.state;
      return(
        <div  style={styles.cueEditor}>
                <div style={styles.title}>Episode Image Uploader</div>
                <div className="row">
                    <div style={styles.buttonContainer}>
                        <a className="btn btn-primary btn-normal" onClick={this.onUploadAsEpisodeImage.bind(this)}>
                            <div style={styles.buttonLabel}>Upload As Episode Image</div>
                          </a>
                    </div>
                    <div style={styles.buttonContainer}>
                        <a className="btn btn-primary btn-normal" onClick={this.onCancel.bind(this)}>
                            <div style={styles.buttonLabel}>Cancel</div>
                        </a>
                    </div>
              </div>
              <div styles={styles.imageContainer}>
                        <img src={this.props.imageurl}/>
              </div>
               <ProgressBar width={width} height={height} progressValue={progressValue} progressTotal={progressTotal}
                 message={progressMessage}/>
               <ModalDialog message={this.state.modalMessage}/>
      </div>
    );



  }
}
