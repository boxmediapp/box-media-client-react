

import React, {Component} from 'react'
import {Table, Column, Cell} from "fixed-data-table-2";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import Dropzone from 'react-dropzone';

import {ProgressBar,ModalDialog,AppHeader,ImageUploader,LoadingIcon} from "../components";
import {genericUtil,imageUtil,ResizeProcess} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues,imageRequirements} from "../configs";
import {styles} from "./styles";
import DisplayImage from "./DisplayImage";






export default class ImageManagerView extends Component{
  constructor(props){
    super(props);
    this.state={episode:null,programme:null,programmeCollection:null, progressValue:0, progressTotal:0, progressMessage:null,modalMessage:null};
  }
  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }
  setEpisode(episode){
      this.setState({episode,programme:null,programmeCollection:null,progressValue:0, progressTotal:0, progressMessage:null,modalMessage:null});
  }
  setProgramme(programme){
      this.setState({episode:null,programme,programmeCollection:null,progressValue:0, progressTotal:0, progressMessage:null,modalMessage:null});
  }
  setPrgrammeCollection(programmeCollection){
      this.setState({episode:null,programme:null,programmeCollection,progressValue:0, progressTotal:0, progressMessage:null,modalMessage:null});
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

  componentWillMount(){
      this.bindToQueryParameters();
  }

  bindToQueryParameters(){
      var episodeid=genericUtil.getQueryParam(this.props.location.search, "episodeid");
      var programmeid=genericUtil.getQueryParam(this.props.location.search, "programmeid");
      var collectionid=genericUtil.getQueryParam(this.props.location.search, "collectionid");
      if(episodeid){
            this.loadEpisodeDetails(episodeid);
      }
      else if(programmeid){
          this.loadProgrammeDetails(programmeid);
      }
      else if(collectionid){
          this.loadCollectionDetails(collectionid);
      }

  }

  loadEpisodeDetails(episodeid){
     api.loadEpisodeDetails(episodeid).then(episode=>{
        episode.uploadImageData=imageUtil.getEpisodeImageUploadData(episode);
        this.setEpisode(episode);
        this.loadEpisodeImages(episode);

     }).catch(error=>{
        this.onUploadError("Error loading the episode details:"+error);
     });
  }
  loadProgrammeDetails(programmeid){
     api.loadProgrammeDetails(programmeid).then(programme=>{
        programme.uploadImageData=imageUtil.getProgrammeImageUploadData(programme);
        this.setProgramme(programme);
        this.loadProgrammeImages(programme);

     }).catch(error=>{
        this.onUploadError("Error loading the programme details:"+error);
     });
  }
loadCollectionDetails(collectionid){
      api.loadCollectionDetails(collectionid).then(programmeCollection=>{
         programmeCollection.uploadImageData=imageUtil.getCollectionImageUploadData(programmeCollection);
         this.setPrgrammeCollection(programmeCollection);
         this.loadCollectionImages(programmeCollection);

      }).catch(error=>{
         this.onUploadError("Error loading the programmeCollection details:"+error);
      });
}

  loadEpisodeImages(episode){

    api.getEpisodeImages(episode).then(data=>{
        if(data.episode){
            var episode=this.state.episode;
            episode.uploadImageData.s3images={
              episode:data.episode,
	            masterImages:data.masterImages,
	            publicImages:data.publicImages,
            };
            this.setEpisode(episode);
        }
        else{
          console.log("No s3 images found");
        }
    }).catch(error=>{
       this.onUploadError("Error loading the Episode Images:"+error);
    });

  }

  loadProgrammeImages(programme){
    api.getProgrammeImages(programme).then(data=>{
        if(data.programme){
            var programme=this.state.programme;
            programme.uploadImageData.s3images={
              programme:data.programme,
              masterImages:data.masterImages,
              publicImages:data.publicImages,
            };
            this.setProgramme(programme);
        }
        else{
          console.log("No s3 images found");
        }
    }).catch(error=>{
       this.onUploadError("Error loading the Programme images:"+error);
    });


  }

  loadCollectionImages(programmeCollection){
    api.getCollectionImages(programmeCollection).then(data=>{
        if(data.programmeCollection){
            var programmeCollection=this.state.programmeCollection;
            programmeCollection.uploadImageData.s3images={
              programmeCollection:data.programmeCollection,
              masterImages:data.masterImages,
              publicImages:data.publicImages,
            };
            this.setPrgrammeCollection(programmeCollection);
        }
        else{
          console.log("No s3 images found");
        }
    }).catch(error=>{
       this.onUploadError("Error loading the programmeCollection images:"+error);
    });


  }

  onDrop(acceptedFiles, rejectedFiles){
     if(acceptedFiles && acceptedFiles.length>0){
       imageUtil.getImagePreviewAndInfo(acceptedFiles[0],imageinfo=>{
            if(this.state.episode){
                var episode=this.state.episode;
                episode.uploadImageData.imageinfo=imageinfo;
                this.setEpisode(episode);
            }
            else if(this.state.programme){
                var programme=this.state.programme;
                programme.uploadImageData.imageinfo=imageinfo;
                this.setProgramme(programme);
            }
            else if(this.state.programmeCollection){
                var programmeCollection=this.state.programmeCollection;
                programmeCollection.uploadImageData.imageinfo=imageinfo;
                this.setPrgrammeCollection(programmeCollection);
            }
            else{
              console.error("Dropped image on not metadata");
            }

       }, errorMessage =>{
           this.onUploadError(errorMessage);
       });

     }


  }
  onUploadClicked(){
    if(this.state.episode){
      var request={
                  progressMessage: "Uploading the master image",
                  filepath:this.state.episode.uploadImageData.filepath,
                  imageBucket:this.state.episode.uploadImageData.imageBucket,
                  imageData:this.state.episode.uploadImageData.imageinfo.file,
                  onComplete:this.onUploadMasterImageComplete.bind(this)
       };
       this.uploadImage(request);
    }
    else if(this.state.programme){
      var request={
                  progressMessage: "Uploading the master image",
                  filepath:this.state.programme.uploadImageData.filepath,
                  imageBucket:this.state.programme.uploadImageData.imageBucket,
                  imageData:this.state.programme.uploadImageData.imageinfo.file,
                  onComplete:this.onUploadMasterImageComplete.bind(this)
       };
       this.uploadImage(request);
    }
    else if(this.state.programmeCollection){
      var request={
                  progressMessage: "Uploading the master image",
                  filepath:this.state.programmeCollection.uploadImageData.filepath,
                  imageBucket:this.state.programmeCollection.uploadImageData.imageBucket,
                  imageData:this.state.programmeCollection.uploadImageData.imageinfo.file,
                  onComplete:this.onUploadMasterImageComplete.bind(this)
       };
       this.uploadImage(request);
    }

  }
  onUploadComplete(){
          var modalMessage={
                 title:"Image Copmplete",
                 content:"Image is uploaded to the s3 bucket successfully",
                 onConfirm:()=>{
                   if(this.state.episode){
                      this.loadEpisodeDetails(this.state.episode.id);
                   }
                   else if(this.state.programme){
                       this.loadProgrammeDetails(this.state.programme.id);
                   }
                   else if(this.state.programmeCollection){
                       this.loadCollectionDetails(this.state.programmeCollection.id);
                   }

                 },
                 confirmButton:"OK"
          }
          var progressValue=0;
          var progressTotal=0;



    if(this.state.episode){
            var imagefilename=this.state.episode.uploadImageData.filename;
            api.patchEpisode(this.state.episode.id,{imageURL:imagefilename}).then(response=>{
                  console.log("episode imageURL is updated");
                  this.setState(Object.assign({}, this.state,{modalMessage,progressValue,progressTotal}));
            }).catch(error=>{
              var modalMessage={
                     title:"Error",
                     content:"Failed to patch the episode with imageURL",
                     onConfirm:this.onClearMessage.bind(this),
                     confirmButton:"OK"
              }
              this.setState(Object.assign({}, this.state,{modalMessage}));
            });
    }
    else   if(this.state.programme){
              var imagefilename=this.state.programme.uploadImageData.filename;
              api.patchProgramme(this.state.programme.id,{imageURL:imagefilename}).then(response=>{
                    console.log("programme imageURL is updated");
                    this.setState(Object.assign({}, this.state,{modalMessage,progressValue,progressTotal}));
              }).catch(error=>{
                var modalMessage={
                       title:"Error",
                       content:"Failed to patch the episode with imageURL",
                       onConfirm:this.onClearMessage.bind(this),
                       confirmButton:"OK"
                }
                this.setState(Object.assign({}, this.state,{modalMessage}));
              });
      }

      else   if(this.state.programmeCollection){
                var imagefilename=this.state.programmeCollection.uploadImageData.filename;
                api.patchProgrammeCollection(this.state.programmeCollection.id,{imageURL:imagefilename}).then(response=>{
                      console.log("programmeCollection imageURL is updated");
                      this.setState(Object.assign({}, this.state,{modalMessage,progressValue,progressTotal}));
                }).catch(error=>{
                  var modalMessage={
                         title:"Error",
                         content:"Failed to patch the programmeCollection with imageURL",
                         onConfirm:this.onClearMessage.bind(this),
                         confirmButton:"OK"
                  }
                  this.setState(Object.assign({}, this.state,{modalMessage}));
                });
        }


    }

  onUploadMasterImageComplete(){
      if(this.state.episode){
              this.uploadPublicImage(this.state.episode.uploadImageData);
      }
      else   if(this.state.programme){
                this.uploadPublicImage(this.state.programme.uploadImageData);
      }
      else   if(this.state.programmeCollection){
                  this.uploadPublicImage(this.state.programmeCollection.uploadImageData);
      }
  }
  uploadPublicImage(uploadImageData){

    if(uploadImageData.publicImages.length==0){
            this.onUploadComplete();
            return;
    }
    var punlicImage=uploadImageData.publicImages[0];
    uploadImageData.publicImages.splice(0,1);

    imageUtil.resizeImage({
      imageURL:uploadImageData.imageinfo.imagePreviewUrl,
      sourceWidth:uploadImageData.imageinfo.width,
      sourceHeight:uploadImageData.imageinfo.height,
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
                        this.uploadPublicImage(uploadImageData);
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


onDeleteMasterImage(){
  if(this.state.episode && this.state.episode.imageURL){
      api.deleteEpisodeLevelImage(this.state.episode.id,this.state.episode.imageURL).then(response=>{
          this.loadEpisodeDetails(this.state.episode.id);
      }).catch(error=>{
         this.onUploadError("Failed delete the master image:"+error);
      });
  }
  else if(this.state.programme && this.state.programme.imageURL){
    api.deleteProgrammeLevelImage(this.state.programme.id,this.state.programme.imageURL).then(response=>{
        this.loadProgrammeDetails(this.state.programme.id);
    }).catch(error=>{
       this.onUploadError("Failed delete the master image:"+error);
    });
  }
  else if(this.state.programmeCollection && this.state.programmeCollection.imageURL){
    api.deleteCollectionLevelMasterImage(this.state.programmeCollection.id,this.state.programmeCollection.imageURL).then(response=>{
        this.loadCollectionDetails(this.state.programmeCollection.id);
    }).catch(error=>{
       this.onUploadError("Failed delete the master image:"+error);
    });
  }

}
 renderPreviewImage(uploadImageData,width, height){
   if(uploadImageData.imageinfo){
        return(
          <img src={uploadImageData.imageinfo.imagePreviewUrl} style={styles.dropzone(width, height)}/>
        );
   }
   else{
     return(
            <div>
               {textValues.uploadHDImageText.map((txt,ind)=>{
                 return(<div style={styles.previewText} key={ind}>{txt}</div>);
               })}
            </div>
      );
   }
 }

 renderUploadButton(uploadImageData){
   if((!this.state.progressTotal) && uploadImageData.imageinfo){
     return(
       <button type="button" className="btn btn-primary btn-normal imageControlButton" onClick={this.onUploadClicked.bind(this)}>Upload</button>
     );
   }
   else{
     return null;
   }


 }

 renderDropZoneWithData(uploadImageData){
         var width=396;
         var height=216;
         return(
           <div style={styles.uploadImageContainer}>
                 <div  className="dropzone">
                     <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropzone(width, height)}>
                            {this.renderPreviewImage(uploadImageData,width,height)}
                            <ProgressBar width={width} height={height} progressValue={this.state.progressValue}
                              progressTotal={this.state.progressTotal}
                              message={this.state.progressMessage}/>
                     </Dropzone>
                 </div>
                 <div  style={styles.imageFooter}>
                       {this.renderUploadButton(uploadImageData)}
                       {this.renderCaptureFromVideLink()}
                 </div>
           </div>
         );
 }
  renderDropZone(){
    if(this.state.episode && this.state.episode.uploadImageData){
        return this.renderDropZoneWithData(this.state.episode.uploadImageData)
    }
    else if(this.state.programme && this.state.programme.uploadImageData){
        return this.renderDropZoneWithData(this.state.programme.uploadImageData)
    }
    else if(this.state.programmeCollection && this.state.programmeCollection.uploadImageData){
        return this.renderDropZoneWithData(this.state.programmeCollection.uploadImageData)
    }
    else{
      return null;
    }
  }
  renderCaptureFromVideLink(){
      if(this.state.episode && this.state.episode.ingestSource){
          if(this.state.episode.uploadImageData && this.state.episode.uploadImageData.imageinfo){
                return null;
          }
          else{

              var url=textValues.episodeCuePointView.link+"?episodeid="+this.state.episode.id;

              return (<a href={url} className="btn btn-primary btn-normal imageControlButton">Capture From Video</a>);
          }


      }
      else{
        return null;
      }


  }

  renderTitle(){

    if(this.state.episode){
      var programmelink=null;
      if(this.state.episode.series){
          programmelink=textValues.imageManager.link+"?programmeid="+this.state.episode.series.id;
      }

      return (
         <div style={styles.header}>
              <div style={styles.title}>Episode Level Image: {this.state.episode.title} ({this.state.episode.programmeNumber})
              </div>
              <div style={styles.rightContainer}>
                  <a href={programmelink} className="btn btn-primary btn-normal">Programme Level Images</a>
              </div>
        </div>
        );
    }
    else if(this.state.programme){
      var collectionlink=null;
      if(this.state.programme.seriesGroup){
        collectionlink=textValues.imageManager.link+"?collectionid="+this.state.programme.seriesGroup.id;
      }
      return (
        <div style={styles.header}>
              <div style={styles.title}>Programme Level Image: {this.state.programme.name} ({this.state.programme.contractNumber})</div>
              <div style={styles.rightContainer}>
                  <a href={collectionlink} className="btn btn-primary btn-normal">Collection Level Images</a>
              </div>
        </div>
      );
    }
    else if(this.state.programmeCollection){
      return (<div style={styles.title}>Collection Level Image: {this.state.programmeCollection.title}</div>);
    }
    else{
      return (<LoadingIcon loading={true}/>);
    }
  }
  renderDeleteButton(){
    if((this.state.episode && this.state.episode.imageURL)||
       (this.state.programme && this.state.programme.imageURL) ||
       (this.state.programmeCollection && this.state.programmeCollection.imageURL)){
         return(
           <div style={styles.rightContainer}>
             <button type="button" className="btn btn-primary btn-normal imageControlButton" onClick={this.onDeleteMasterImage.bind(this)}>Delete</button>
           </div>
         );
       }
       else{
         return null;
       }

  }
  renderS3ImagesWithData(uploadImageData){
      if(uploadImageData.s3images){
          return(
            <div style={styles.s3imageContainer}>
              <div style={styles.masterImageContainer}>
                <div style={styles.imagesHeader}>
                    <div style={styles.imagetype}>Master Image</div>
                    {this.renderDeleteButton()}
                </div>

                     {this.renderMasterImage(uploadImageData.s3images)}

              </div>
              <div style={styles.publicImageContainer}>
                    <div style={styles.imagetype}>Public Images</div>
                     {this.renderPublicImage(uploadImageData.s3images)}
              </div>
          </div>


          )
      }
      else{
        return null;
      }
  }
  renderS3Images(){
      if(this.state.episode && this.state.episode.uploadImageData){
            return this.renderS3ImagesWithData(this.state.episode.uploadImageData);
      }
      else if(this.state.programme && this.state.programme.uploadImageData){
            return this.renderS3ImagesWithData(this.state.programme.uploadImageData);
      }
      else if(this.state.programmeCollection && this.state.programmeCollection.uploadImageData){
            return this.renderS3ImagesWithData(this.state.programmeCollection.uploadImageData);
      }
      else{
        return null;
      }
  }
  renderMasterImage(s3images){
    var imageURL=null;
    if(s3images.episode){
      imageURL=s3images.episode.imageURL;
    }
    else if(s3images.programme){
      imageURL=s3images.programme.imageURL;
    }
    else if(s3images.programmeCollection){
      imageURL=s3images.programmeCollection.imageURL;
    }
    if(imageURL && s3images.masterImages && s3images.masterImages.length>0){
          return s3images.masterImages.map((image,index)=>{
              return this.renderImage(image,index);
          });
    }
    return null;
  }
  renderPublicImage(s3images){
    if(s3images.publicImages && s3images.publicImages.length>0){
          return s3images.publicImages.map((image,index)=>{
              return this.renderImage(image,index);
          });
    }
    return null;
  }
  renderImage(image,index){
        return(
            <div style={styles.imageContainer} key={index}>
                  <DisplayImage image={image}/>
            </div>
        );
  }


  render(){
      return (
          <div>
            <AppHeader selected="episodeList"/>

              <div style={AppHeader.styles.content}>
                    {this.renderTitle()}
                        <div style={styles.uploadContainer}>
                              {this.renderDropZone()}
                        </div>
                        {this.renderS3Images()}
             </div>
              <ModalDialog message={this.state.modalMessage}/>
          </div>
      );

  }


}
