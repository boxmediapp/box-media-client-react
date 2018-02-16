import React, {Component} from 'react';
import {styles} from "./styles";
import {ProgressBar,ModalDialog} from "../components";
import {api} from "../api";
import {genericUtil,imageUtil} from "../utils";

export default class VideoImageUploader extends Component{

  constructor(props){
    super(props);
    this.state={file:null, progressValue:0, progressTotal:0};
  }
  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }


  setProgressValue(progressValue,progressTotal){
    this.setState(Object.assign({}, this.state,{progressValue,progressTotal}));
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
        this.setProgressValue(0,1);

        var uploadRequest={
                    file:this.props.imageData.filepath,
                    bucket:this.props.imageData.imageBucket
         };

           api.requestS3UploadURL(uploadRequest).then(data=>{
              console.log("presign response:"+JSON.stringify(data));
              this.startUpload(data);
           }).catch(error=>{
               this.onUploadError("Failed upload the file:"+error);
           });

  }
  onUploadComplete(data, props){

    var modalMessage={
           title:"Image Copmplete",
           content:"Image is uploaded to the s3 bucket successfully",
           onConfirm:()=>{
             this.props.onCancel();             
           },
           confirmButton:"OK"
    }
    var progressValue=0;
    var progressTotal=0;
    this.setState(Object.assign({}, this.state,{modalMessage,progressValue,progressTotal}));
  }
  startUpload(s3){
                this.setProgressValue(0,1);
                genericUtil.startUpload({s3,
               file:imageUtil.dataURLToBlob(this.props.imageurl),
               onProgress:this.onUploadProgess.bind(this),
               onComplete:this.onUploadComplete.bind(this),
               onError:this.onUploadError.bind(this),
               onAbort:this.onUploadAborted.bind(this)
        });
  }

  onCancel(){
    this.props.onCancel();
  }

  render(){
      var width=this.props.videoWidth;
      var height=this.props.videoHeight;

      var {progressValue,progressTotal}=this.state;
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
               <ProgressBar width={width} height={height} progressValue={progressValue} progressTotal={progressTotal}/>
               <ModalDialog message={this.state.modalMessage}/>
      </div>
    );



  }
}
