import React, {Component} from 'react'
import {api} from "../api";
import {
  Link
} from 'react-router-dom'

import {textValues,config} from "../configs";
import {AppHeader,BigButton,LoadingIcon,ModalDialog} from "../components";
import {styles} from "./styles";
import {genericUtil} from "../utils";
import ListVideoFiles from "./ListVideoFiles";
import SearchVideoFiles from "./SearchVideoFiles";
import {appdata} from "../store";

var LOAD_RECORDS_STATUS={
      LOADING:0,
      PARTIAL_LOADED:1,
      FAILED:2,
      FULLY_LOADED:3
};


export  default class ListS3FilesView extends  Component{
  constructor(props){
        super(props);
        this.state=this.buildDefaultState();
        this.recordsState=this.state.recordsState;
  }
  buildDefaultState(){
    var prefix=genericUtil.getQueryParam(this.props.location.search, "prefix");
    if(!prefix){
      prefix="";
    }
    var sortBy=genericUtil.getQueryParam(this.props.location.search, "sortBy");
    var sortOrder=genericUtil.getQueryParam(this.props.location.search, "sortOrder");
    if(!sortBy){
         sortBy="lastModifiedDate";
         sortOrder="desc";
    }
    return {
                 videoToPlay:null,
                 modalMessage:null,
                 videofiles:[],
                 queryparameters:{prefix,sortBy,sortOrder},
                 recordsState:LOAD_RECORDS_STATUS.LOADING,
            };
  }
  componentWillMount(){
        this.startSearch(this.state.queryparameters);
  }
  startLoadRecordsState(){
    var recordsState=LOAD_RECORDS_STATUS.LOADING;
    this.recordsState=recordsState;
    this.setState(Object.assign({},this.state,{recordsState}));
  }
  startSearch(queryparameters){
          this.startLoadRecordsState();
          api.findS3BoxVideo(queryparameters).then(response =>{
            var videofiles=response.files;
              this.setVideofiles(videofiles);
              this.videBaseURL=response.baseUrl;
         }).catch(error=>{
             this.setErrorMessage("Error loading video data from the server"+error);
         });
  }


  setVideofiles(videofiles){
      var recordLimit=appdata.getAppConfig().recordLimit;
      var recordsState=LOAD_RECORDS_STATUS.PARTIAL_LOADED;
      if(videofiles.length<recordLimit){
            recordsState=LOAD_RECORDS_STATUS.FULLY_LOADED;
      }
      this.recordsState=recordsState;
      this.setState(Object.assign({},this.state,{videofiles,recordsState}));
  }
  appendVideoFilesForNextPage(vd){
    var recordLimit=appdata.getAppConfig().recordLimit;
    var recordsState=LOAD_RECORDS_STATUS.PARTIAL_LOADED;
    if(vd.length<recordLimit){
          recordsState=LOAD_RECORDS_STATUS.FULLY_LOADED;
    }
    var videofiles=[...this.state.videofiles,...vd];
    this.recordsState=recordsState;
    this.setState(Object.assign({},this.state,{videofiles,recordsState}));
  }

  getNextPageStart(){
    if(this.recordsState===LOAD_RECORDS_STATUS.PARTIAL_LOADED){
          return this.state.videofiles.length;
    }
    else{
          return -1;
    }
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
     var recordsState=LOAD_RECORDS_STATUS.FAILED;
     this.recordsState=recordsState;
     this.setState(Object.assign({}, this.state,{modalMessage,recordsState}));
  }

onPlayVideo(videoitem){
      var appconfig=appdata.getAppConfig();
      api.presigned(this.videBaseURL+"/"+videoitem.file).then(data=>{
        if(data && data.file){
            this.setVideoToPlay(data.file);
        }
      });
}


  onLoadLoadNextPage(){
    var start=this.getNextPageStart();
      if(start<=0){
            return;
      }
      this.startLoadRecordsState();
      api.findS3BoxVideo(this.state.queryparameters,start).then(response =>{
        var videofiles=response.files;
               console.log("Next batch of data is loaded");
               this.appendVideoFilesForNextPage(videofiles);
           });
  }

  onSearch(q){
    var queryparameters=Object.assign({},this.state.queryparameters,q);
    this.setState(Object.assign({}, this.state,{queryparameters}));
    this.startSearch(queryparameters);
  }
  setVideoToPlay(videoToPlay){
    var v=document.getElementById("videoPlayer");
    if(v){
      v.pause();
    }
    this.setState(Object.assign({}, this.state,{videoToPlay}));
  }

  render(){
      var queryparameters={search:this.state.queryparameters.search};
       return (
           <div>
             <AppHeader selected="s3"/>
             <div style={AppHeader.styles.content}>
               <div style={styles.listHeader}>

                 <SearchVideoFiles queryparameters={queryparameters} onSearch={this.onSearch.bind(this)}/>
                 <LoadingIcon loading={this.state.recordsState===LOAD_RECORDS_STATUS.LOADING}/>
               </div>
               <ListVideoFiles videofiles={this.state.videofiles}
                    onLoadLoadNextPage={this.onLoadLoadNextPage.bind(this)}
                    onPlayVideo={this.onPlayVideo.bind(this)}/>
            </div>
            <BoxVideoPlayer videoToPlay={this.state.videoToPlay} setVideoToPlay={this.setVideoToPlay.bind(this)}/>
            <ModalDialog message={this.state.modalMessage}/>
           </div>
         );
  }


}

class BoxVideoPlayer extends Component{
  onCloseVideo(evt){
      this.props.setVideoToPlay(null);
  }
    render(){
        if(this.props.videoToPlay){
                  return (
                      <div align="center" className="embed-responsive embed-responsive-16by9 boxVideoPlayer">
                        <video id="videoPlayer" autoPlay="autoPlay" controls>
                            <source type="video/mp4" src={this.props.videoToPlay}/>

                        </video>

                        <button onClick={evt=>this.onCloseVideo()} className="btn btn-primary btn-normal closeVideoPlayer">Close</button>
                      </div>
                  );


        }
        else {
          return null;
        }


    }


}
