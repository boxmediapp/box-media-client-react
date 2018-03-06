

import React, {Component} from 'react'
import {Table, Column, Cell} from "fixed-data-table-2";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {ProgressBar,ModalDialog,AppHeader} from "../components";
import {genericUtil,imageUtil,ResizeProcess} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues,imageRequirements} from "../configs";
import {styles} from "./styles";
import ListCuePoints from "./ListCuePoints";
import CuePointEditor from "./CuePointEditor";

import DisplayVideoObject from "./DisplayVideoObject";
import VideoImageUploader from "./VideoImageUploader";

import DisplayEmbeddedCode from "./DisplayEmbeddedCode";



export default class EpisodeCuePointView extends Component{
  constructor(props){
    super(props);
    this.state={modalMessage:null, episode:{}};
  }
  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }
  setErrorMessage(content){
     var modalMessage={
            title:"Error",
            content,
            onConfirm:this.onClearMessage.bind(this),
            confirmButton:"OK"
     }
     this.setState(Object.assign({}, this.state,{modalMessage}));
  }

  componentWillMount(){
      this.bindToQueryParameters();
  }

  bindToQueryParameters(){
      var episodeid=genericUtil.getQueryParam(this.props.location.search, "episodeid");
      if(episodeid){
            this.loadEpisodeDetails(episodeid);
      }
  }

  loadEpisodeDetails(episodeid){
     api.loadEpisodeDetails(episodeid).then(episode=>{
        this.setState({episode, modalMessage:null});
        this.loadViodeURL(episode);
     }).catch(error=>{
        this.setErrorMessage("Error loading the episode details:"+error);
     });
  }

  loadViodeURL(episode){
    api.presigned(episode.ingestSource).then(data=>{
      if(data && data.file){
          this.setSignedVideoURL(data.file);
          this.loadCuePoints(episode);
      }
    }).catch(error=>{
       this.setErrorMessage("Error loading the Presgined URL:"+error);
    });
  }
  loadCuePoints(episode){
    api.loadCuePoints(episode.id).then(cuepoints=>{
      if(cuepoints){
            this.setCuePoints(cuepoints);
      }
    }).catch(error=>{
       this.setErrorMessage("Error loading the cue points:"+error);
    });
  }
  cueSortingFunction(c1,c2){
    if(!c1.time){
      return -1;
    }
    else if(!c2.time){
      return 1;
    }
    else{
        return parseFloat(c1.time)-parseFloat(c2.time);
      }
  }

  setCuePoints(cuepoints){
    cuepoints=cuepoints.sort(this.cueSortingFunction);
    var episode=Object.assign({},this.state.episode,{cuepoints, editAction:null});
    this.setState({episode, modalMessage:null});
  }
  getVideoObject(){
    return document.getElementById("videoPlayer");
  }
  setSignedVideoURL(signedVideoURL){
    var v=this.getVideoObject();
    if(v){
      v.pause();
    }
    var episode=Object.assign({},this.state.episode,{signedVideoURL,editAction:null})
    this.setState({episode, modalMessage:null});
  }

onDeleteCuePoint(cuepoint){
    var episode=this.state.episode;
    if(episode.editAction &&  episode.editAction.cueToEdit && episode.editAction.cueToEdit.id || episode.editAction.cueToEdit.id ===0){
            var cueToEdit=episode.editAction.cueToEdit;
            episode.editAction=null;
            var cuepoints=episode.cuepoints.filter(c=>c!==cueToEdit);
            this.setCuePoints(cuepoints);
            api.removeCuePoint(episode,cueToEdit.id);

    }
}


  onUpdateCuePoint(cuepoint){
         var episode=this.state.episode;
        if(cuepoint.id || cuepoint.id ===0){
                var cuepoints=episode.cuepoints.map(c=>{
                   if(c.id===cuepoint.id){
                       return cuepoint;
                   }
                   else{
                     return c;
                   }
                });

                this.setCuePoints(cuepoints);

                api.updateCuePoint(episode,cuepoint);
        }
        else{
            episode.cuepoints.push(cuepoint);
            this.setCuePoints(episode.cuepoints);
            api.createCuePoint(episode,cuepoint);

        }

  }
  onCancelEdit(){
    var episode=this.state.episode;
    episode.editAction=null;
    this.setState({episode, modalMessage:null});
  }
  displayEmbeddedCode(){
    var displayCode="BrightCodeWebPlayer";
    var episode=Object.assign({},this.state.episode,{editAction:{displayCode}})
    this.setState({episode, modalMessage:this.state.modalMessage});
    window.scrollTo(0, 0);
  }

  renderCueEditor(){
    if(this.state.episode && this.state.episode.editAction && this.state.episode.editAction.cueToEdit){
        return (<CuePointEditor cueToEdit={this.state.episode.editAction.cueToEdit}
                 onUpdate={this.onUpdateCuePoint.bind(this)}
                 onCancel={this.onCancelEdit.bind(this)}
                 onDelete={this.onDeleteCuePoint.bind(this)}/>
               );

    }
    else{
      return null;
    }
  }
  onUploadComplete(imageData){
        var imagefilename=imageData.filename;
        api.patchEpisode(this.state.episode.id,{imageURL:imagefilename}).then(response=>{
              console.log("episode imageURL is updated");
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
  renderImageUploader(){
    if(this.state.episode && this.state.episode.editAction && this.state.episode.editAction.imageToUpload){
          var imageData=imageUtil.getEpisodeImageUploadData(this.state.episode);

        return (<VideoImageUploader imageurl={this.state.episode.editAction.imageToUpload}
                videoWidth={this.state.episode.editAction.videoWidth}  videoHeight={this.state.episode.editAction.videoHeight}
                 onCancel={this.onCancelEdit.bind(this)} imageData={imageData}
                 onUploadComplete={this.onUploadComplete.bind(this)}
                 episode={this.state.episode}/>
               );

    }
    else{
      return null;
    }
  }
  renderDisplayEmbeddedCode(){
    if(this.state.episode && this.state.episode.editAction && this.state.episode.editAction.displayCode){
        return (<DisplayEmbeddedCode displayCode={this.state.episode.editAction.displayCode}
                 onCancel={this.onCancelEdit.bind(this)}
                 episode={this.state.episode}/>
               );

    }
    else{
      return null;
    }

  }
  renderVideoPlayer(){
      if(this.state.episode && this.state.episode.signedVideoURL){
        return(
            <DisplayVideoObject url={this.state.episode.signedVideoURL} ref={videoPlayer=>this.videoPlayer=videoPlayer}
            onTimeUpdate={this.onTimeUpdate.bind(this)}
            onCaptureImage={this.onCaptureImage.bind(this)}
            displayEmbeddedCode={this.displayEmbeddedCode.bind(this)}/>
        );
      }
      else{
        return null;
      }

  }
  setVideoCurrentTime(currentTime){
    this.videoPlayer.setCurrentTime(currentTime);
  }


  onTimeUpdate(currentTime){
      if(this.state.episode.editAction && this.state.episode.editAction.cueToEdit){
        var cueToEdit=this.state.episode.editAction.cueToEdit;
        cueToEdit.time=currentTime;
        var episode=Object.assign({},this.state.episode,{editAction:{cueToEdit}})
        this.setState({episode, modalMessage:this.state.modalMessage});
      }

  }
  onAddNewCuePoint(){
      var currentTime=this.videoPlayer.getCurrentTime();
      var  cueToEdit={time:currentTime, name:"break", type:"AD",metadata:{materialId:this.state.episode.materialId,numberOfAds:1}};
      var episode=Object.assign({},this.state.episode,{editAction:{cueToEdit}})
      this.setState({episode, modalMessage:this.state.modalMessage});
      window.scrollTo(0, 0);
      this.setVideoCurrentTime(cueToEdit.time);
  }
  onEditCuePoint(episode,cueToEdit){
        var episode=Object.assign({},this.state.episode,{editAction:{cueToEdit}})
        this.setState({episode, modalMessage:null});
        window.scrollTo(0, 0);
        this.setVideoCurrentTime(cueToEdit.time);
  }
  onCaptureImage(imageToUpload, videoWidth,videoHeight){
      var episode=Object.assign({},this.state.episode,{editAction:{imageToUpload,videoWidth,videoHeight}})
      this.setState({episode, modalMessage:null});
      window.scrollTo(0, 0);
  }
  renderCuePoints(){
      if(this.state.episode && this.state.episode.cuepoints){
            return (<ListCuePoints episode={this.state.episode} onEditCuePoint={this.onEditCuePoint.bind(this)}/>);
      }
      else{
            return null;
      }


  }
  render(){
      var editepisodeURL=textValues.editEpisode.applink(this.state.episode.id);
      var editimageURL=textValues.imageManager.link+"?episodeid="+this.state.episode.id;
      return (
          <div>
            <AppHeader selected="episodeList"/>

              <div style={AppHeader.styles.content}>
                    <div style={styles.header}>
                          <div style={styles.title}>{this.state.episode.title}</div>
                          <div style={styles.title}>{this.state.episode.programmeNumber}</div>
                          <a href={editimageURL} className="btn btn-primary btn-normal">Manage Images</a>
                          <a href={editepisodeURL} className="btn btn-primary btn-normal">Edit Metadata</a>
                    </div>


                        <div style={styles.editorContainer}>
                              {this.renderVideoPlayer()}
                              {this.renderCueEditor()}
                              {this.renderImageUploader()}
                              {this.renderDisplayEmbeddedCode()}
                        </div>
                        {this.renderCuePoints()}
                        <div style={styles.buttonContainer}>
                              <a className="btn btn-primary btn-normal" onClick={this.onAddNewCuePoint.bind(this)}>
                                  <div style={styles.buttonLabel}>Create New Cue Point</div>
                              </a>
                       </div>
             </div>
              <ModalDialog message={this.state.modalMessage}/>
          </div>
      );

  }


}
