

import React, {Component} from 'react'
import {Table, Column, Cell} from "fixed-data-table-2";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {ImageUploader,ProgressBar,ModalDialog,AppHeader} from "../components";
import {genericUtil,imageUtil,ResizeProcess} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues,imageRequirements} from "../configs";
import {styles} from "./styles";
import ListCuePoints from "./ListCuePoints";
import CuePointEditor from "./CuePointEditor";

import DisplayVideoObject from "./DisplayVideoObject";


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
    var episode=Object.assign({},this.state.episode,{cuepoints, cueToEdit:null});
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
    var episode=Object.assign({},this.state.episode,{signedVideoURL,cueToEdit:null})
    this.setState({episode, modalMessage:null});
  }

onDeleteCuePoint(cuepoint){
    var episode=this.state.episode;
    if(episode.cueToEdit.id || episode.cueToEdit.id ===0){
            var cueToEdit=episode.cueToEdit;
            episode.cueToEdit=null;
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
                episode.cueToEdit=null;
                this.setCuePoints(cuepoints);
                this.setState({episode, modalMessage:null});
                api.updateCuePoint(episode,cuepoint);
        }
        else{
            episode.cuepoints.push(cuepoint);
            this.setCuePoints(episode.cuepoints);
            api.createCuePoint(episode,cuepoint);

        }

  }
  onCancelEditCuePoint(){
    var episode=this.state.episode;
    episode.cueToEdit=null;
    this.setState({episode, modalMessage:null});
  }

  renderCueEditor(){
    if(this.state.episode && this.state.episode.cueToEdit){
        return (<CuePointEditor cueToEdit={this.state.episode.cueToEdit}
                 onUpdate={this.onUpdateCuePoint.bind(this)}
                 onCancel={this.onCancelEditCuePoint.bind(this)}
                 onDelete={this.onDeleteCuePoint.bind(this)}/>
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
            onTimeUpdate={this.onTimeUpdate.bind(this)}/>
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
      if(this.state.episode.cueToEdit){
        var cueToEdit=this.state.episode.cueToEdit;
        cueToEdit.time=currentTime;
        var episode=Object.assign({},this.state.episode,{cueToEdit})
        this.setState({episode, modalMessage:this.state.modalMessage});
      }

  }
  onAddNewCuePoint(){
      var currentTime=this.videoPlayer.getCurrentTime();
      var  cueToEdit={time:currentTime, name:"break", type:"AD",metadata:{materialId:this.state.episode.materialId,numberOfAds:1}};
      var episode=Object.assign({},this.state.episode,{cueToEdit})
      this.setState({episode, modalMessage:this.state.modalMessage});
      window.scrollTo(0, 0);
      this.setVideoCurrentTime(cueToEdit.time);
  }
  onEditCuePoint(episode,cueToEdit){
        var episode=Object.assign({},this.state.episode,{cueToEdit})
        this.setState({episode, modalMessage:null});
        window.scrollTo(0, 0);
        this.setVideoCurrentTime(cueToEdit.time);
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

      return (
          <div>
            <AppHeader selected="episodeList"/>

              <div style={AppHeader.styles.content}>
                    <div style={styles.title}>{this.state.episode.title} </div>
                        <div style={styles.editorContainer}>
                              {this.renderVideoPlayer()}
                              {this.renderCueEditor()}
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