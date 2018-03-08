import React, {Component} from 'react'
import {AppHeader,ModalDialog,LoadingIcon,ItemIconList,SelectionModalDialog} from "../../components";
import {textValues,localImages} from "../../configs";
import {api} from "../../api";
import {genericUtil} from "../../utils";
import {styles} from "./styles";
import DisplayPlaylists from "./DisplayPlaylists";
import  PlaylistEditor from "./PlaylistEditor";
import DisplayPlaylistVideos from "./DisplayPlaylistVideos";

var ACTIONS={
    LIST:0,
    CREATE:1,
    EDIT:2
}


export default class PlaylistManagerView extends Component{
  constructor(props){
        super(props);
        this.state={modalMessage:null,loading:true,playlists:[], search:"", action:ACTIONS.LIST,playlistToEdit:null};
  }
  setErrorMessage(message){
    var modalMessage={
           title:textValues.playlists.error.title,
           content:message,
           onConfirm:this.onClearMessage.bind(this),
           confirmButton:"Ok",
    }
    this.setState(Object.assign({}, this.state,{modalMessage,loading:false}));
  }
  setSearch(search){
    this.setState(Object.assign({}, this.state,{search}));
  }
  onError(error){
        console.error(error);
        api.processAPIError(error, (errorMessage, code)=>{
                this.setErrorMessage(errorMessage);
        });
  }

  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }
  componentWillMount(){
      this.processQueryParameters(this.props);
  }
  componentWillReceiveProps(nextprops){
      this.processQueryParameters(nextprops);
  }

  editPlaylist(playlistid){
    this.setState(Object.assign({}, this.state,{loading:true, action:ACTIONS.EDIT}));
    api.loadABCPlaylist(playlistid).then(playlistToEdit=>{
        this.setState(Object.assign({}, this.state,{loading:false, playlistToEdit, action:ACTIONS.EDIT}));
    }).catch(error=>{
      this.onError(error);
    });
  }
  listPlaylist(){
    this.setState(Object.assign({}, this.state,{loading:true, action:ACTIONS.LIST}));
    api.loadBCPlaylists().then(playlists=>{
        if(playlists && playlists.length){
           this.setState(Object.assign({}, this.state,{playlists, loading:false}));
        }
    }).catch(error=>{
        this.onError(error);
    });
  }
  displayCreatePlaylistDataForm(){
      this.setState(Object.assign({}, this.state,{loading:true, playlistToEdit:null,action:ACTIONS.CREATE}));
  }

  processQueryParameters(props){
        this.setState(Object.assign({}, this.state,{loading:true}));
        var playlistid=null;
        if(props && props.location && props.location.search){
            playlistid=genericUtil.getQueryParam(props.location.search, "playlistid");
        }
        if(playlistid){
            this.editPlaylist(playlistid);
        }
        else{
            this.listPlaylist();
        }


  }

  getFilteredPlayLists(){
    if(!this.state.search){
      return this.state.playlists;
    }
    return this.state.playlists.filter(pl=>{
        return pl.playListData.name.toLowerCase().indexOf(this.state.search.toLowerCase())>=0;
    });

  }
  onUpdatePlaylistData(playlist){
      api.patchBCPlaylist(playlist).then(response=>{
              this.listPlaylist();

      }).catch(error=>{
        this.onError(error);
      });
  }
  onDeleteChannel(){

  }
  renderVideosList(){
    if(this.state.playlistToEdit){
          return(
              <div style={styles.videoListContainer}>
                <div style={styles.subtitle}>The videos in this playlist</div>
                  <DisplayPlaylistVideos playlistid={this.state.playlistToEdit.playListData.id}/>
              </div>
          )
    }
    else{
      return null;
    }

  }
  renderEditor(){
      return (
        <div>
                <AppHeader selected="playlists"/>
                <div style={AppHeader.styles.content}>
                      <PlaylistEditor playlistToEdit={this.state.playlistToEdit}
                         onUpdatePlaylistData={this.onUpdatePlaylistData.bind(this)}
                         onDeleteChannel={this.onDeleteChannel.bind(this)}/>
                      {this.renderVideosList()}

                </div>

        </div>

      );
  }
  renderCreate(){
          return (
            <div>
                    <AppHeader selected="playlists"/>
                    <div style={AppHeader.styles.content}>
                          <PlaylistEditor playlistToEdit={{}}
                             onUpdatePlaylistData={this.onUpdatePlaylistData.bind(this)}/>
                    </div>

            </div>

          );

  }

    renderList(){
      var playlists=this.getFilteredPlayLists();
      return (
        <div>
            <AppHeader selected="playlists"/>
            <div style={AppHeader.styles.content}>
                        <div style={styles.title}>Playlists</div>
                        <div style={styles.formContainer}>
                            <div style={styles.formItem}>

                                <input type="text" className="form-control" placeholder="Search playlists"
                                onChange={(evt) => {
                                  this.setSearch(evt.target.value);
                              }} value={this.state.search}/>

                                  <a style={styles.createIcon} onClick={(evt) => {
                                           this.displayCreatePlaylistDataForm();
                                  }}>
                                    <img src={localImages.addIcon}/>

                                  </a>

                            </div>

                        </div>
                         <LoadingIcon loading={this.state.loading}/>

                         <DisplayPlaylists playlists={playlists}/>
           </div>

            <ModalDialog message={this.state.modalMessage}/>
        </div>
      );
    }
    render(){
        if(this.state.action===ACTIONS.EDIT){
          return this.renderEditor();
        }
        else if(this.state.action===ACTIONS.CREATE){
          return this.renderCreate();
        }

        else{
          return this.renderList();
        }
    }


}
