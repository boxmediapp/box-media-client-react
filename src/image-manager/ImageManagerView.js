

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



export default class ImageManagerView extends Component{
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
        this.loadEpisodeImages(episode);
     }).catch(error=>{
        this.setErrorMessage("Error loading the episode details:"+error);
     });
  }

  loadEpisodeImages(episode){
/*
    api.loadEpisodeImages(episode.ingestSource).then(data=>{
      if(data && data.file){
          this.setSignedVideoURL(data.file);
          this.loadCuePoints(episode);
      }
    }).catch(error=>{
       this.setErrorMessage("Error loading the Presgined URL:"+error);
    });
    */
  }
  render(){
      return (
          <div>
            <AppHeader selected="episodeList"/>

              <div style={AppHeader.styles.content}>
                    <div style={styles.title}>{this.state.episode.title} </div>
                        <div style={styles.editorContainer}>
                              Image Manager
                        </div>
             </div>
              <ModalDialog message={this.state.modalMessage}/>
          </div>
      );

  }


}
