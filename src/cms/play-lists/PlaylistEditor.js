import React, {Component} from 'react'
import {AppHeader,ModalDialog,ItemIconList,SelectionModalDialog,LoadingIcon} from "../../components";
import {LoadingScreen} from "../../loading-screen";
import {textValues, localImages} from "../../configs";
import {styles} from "./styles";
import {genericUtil} from "../../utils";
import {api} from "../../api";
import {
  Link

} from 'react-router-dom'


export default class PlaylistEditor extends Component{
  constructor(props){
        super(props);
        this.state={playlistToEdit:this.buildPlaylist(this.props.playlistToEdit)};
  }
  buildPlaylist(playlistToEdit){
      var playListData={
        favorite:false,
        name:"",
        reference_id:"",
        type:"EXPLICIT",
        video_ids:[]
      };
      if(playlistToEdit){
          playListData=Object.assign(playListData,playlistToEdit.playListData);
      }
      return Object.assign({},playlistToEdit,{playListData});
  }
  onError(error){
      this.props.onError(error);
  }

  componentWillReceiveProps(nextProps){
      if((!nextProps.playlistToEdit) || this.state.playlistToEdit!=nextProps.playlistToEdit){
          this.setState(Object.assign({}, this.state,{playlistToEdit:this.buildPlaylist(nextProps.playlistToEdit)}));
      }
  }
  setPlaylistValues(values){
        var playlistToEdit=Object.assign({},this.state.playlistToEdit);

        playlistToEdit.playListData=Object.assign({},playlistToEdit.playListData,values);
        this.setState(Object.assign({}, this.state,{playlistToEdit}));
  }
  updatePlaylistData(){
      this.props.onUpdatePlaylistData(this.state.playlistToEdit);
  }
  deletePlaylist(){
      this.props.onDeleteChannel(this.state.playlistToEdit);
  }
  renderDeleteDutton(){
    if(this.props.playlistToEdit){
      return(
          <div style={styles.deleteButtonContainer}>
                 <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                          this.deletePlaylist();
                      }}>DELETE</button>
          </div>
      );
    }
    else{
          return null;
    }

  }

 isNewPlaylist(){
      return (!this.state.playlistToEdit.playListData.id);
}

onDeleteItem(item){
      var search=this.state.playlistToEdit.playListData.search;
      var searchResult={};
      genericUtil.parsePlaylistTagSearchString(search,searchResult);
      var tags=searchResult.tags.filter(t=>t!==item.value);
      var search=genericUtil.toPlaylistTagSearchString({
        type:searchResult.type,
        tags
      });
      this.setPlaylistValues({search});
}
changeSearchTagType(type){
      var search=this.state.playlistToEdit.playListData.search;
      var searchResult={};

      genericUtil.parsePlaylistTagSearchString(search,searchResult);
      var tags=searchResult.tags;
      var search=genericUtil.toPlaylistTagSearchString({
      type,
      tags
    });
  this.setPlaylistValues({search});
}
renderSmartFields(){
    if(this.state.playlistToEdit.playListData.type==='EXPLICIT'){
        return null;
    }
    var search=this.state.playlistToEdit.playListData.search;
    var searchResult={};

    genericUtil.parsePlaylistTagSearchString(search,searchResult);

    var searchType=searchResult.type;
    var searchTags=[];
    if(searchResult.tags){
        searchTags= searchResult.tags.map(t=>{
            return{
              value:t,
              label:t
            }
        });
    }
    return(
      <div style={styles.formContainer}>
            <div style={styles.formItem}>
                <label style={styles.label}>Tags:</label>
                <select value={searchType} onChange={(evt) => {
                this.changeSearchTagType(evt.target.value);
              }}>
                                    <option value="any">contains one or more</option>
                                    <option value="all">contains all</option>
                </select>
                <ItemIconList label="" selectIcon={localImages.deleteIcon}
                items={searchTags}
                onSelectedItem={this.onDeleteItem.bind(this)}/>

            </div>


      </div>



    );


}

renderPlayListType(){
  if(this.isNewPlaylist()){
      return (<select id="playlisttype" style={styles.playlistname} value={this.state.playlistToEdit.playListData.type}
      onChange={(evt) => {
      this.setPlaylistValues({type:evt.target.value});
    }} >
                  <option value={'EXPLICIT'}>Manual</option>
                  <option value={'ACTIVATED_OLDEST_TO_NEWEST'}>Activated Date (Oldest First)</option>
                  <option value={'ACTIVATED_NEWEST_TO_OLDEST'}>Activated Date (Newest First)</option>
                  <option value={'ALPHABETICAL'}>Video Name (A-Z)</option>
                  <option value={'PLAYS_TOTAL'}>Total Plays</option>
                  <option value={'PLAYS_TRAILING_WEEK'}>Trailing Week Plays</option>
                  <option value={'START_DATE_OLDEST_TO_NEWEST'}>Start Date (Oldest First)</option>
                  <option value={'START_DATE_NEWEST_TO_OLDEST'}>Start Date (Newest First)</option>
              </select>
      );
  }
  else{
    return(<input type="text" style={styles.playlistname} id="playlisttype"
    value={this.state.playlistToEdit.playListData.type} readOnly/>);
  }
}

render(){
  var title="Playlist Editor";
  var buttonLabel="UPDATE"
  if(this.isNewPlaylist()){
      title="Creating a New Playlist";
      buttonLabel="CREATE";
  }


  return (
                      <div style={styles.formContainer}>
                          <div style={styles.title}>{title}</div>

                            <div style={styles.formItem}>
                                <label htmlFor="playlistname" style={styles.label}>Playlist Name:</label>
                                <input type="text" style={styles.playlistname} id="playlistname" placeholder="Playlist Name"
                                onChange={(evt) => {
                                this.setPlaylistValues({name:evt.target.value});
                              }} value={this.state.playlistToEdit.playListData.name}/>
                            </div>

                            <div style={styles.formItem}>
                                <label htmlFor="playlisttype" style={styles.label}>Playlist Type:</label>
                                {this.renderPlayListType()}

                            </div>


                            <div style={styles.formItem}>
                                <label htmlFor="reference_id" style={styles.label}>Reference ID:</label>
                                <input type="text"  style={styles.playlistname} id="reference_id" placeholder="Reference ID"
                                onChange={(evt) => {
                                this.setPlaylistValues({reference_id:evt.target.value});
                              }} value={this.state.playlistToEdit.playListData.reference_id}/>
                            </div>

                            <div style={styles.formItem}>
                                <label htmlFor="description" style={styles.label}>Description:</label>
                                <textarea style={styles.description} id="description" placeholder="Playlist Description"
                                onChange={(evt) => {
                                this.setPlaylistValues({description:evt.target.value});
                              }} value={this.state.playlistToEdit.playListData.description}/>
                            </div>


                            <div style={styles.formItem}>
                                <label htmlFor="favorite" style={styles.label}>Show Playlist in Sidebar:</label>
                                <input type="checkbox" style={styles.playlistname} id="favorite"
                                onChange={(evt) => {
                                this.setPlaylistValues({favorite:evt.target.checked});
                              }} checked={this.state.playlistToEdit.playListData.favorite}/>
                            </div>
                            {this.renderSmartFields()}


                            <div style={styles.footer}>
                                  <div style={styles.buttonContainer}>
                                         <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                                                  this.updatePlaylistData();
                                              }}>{buttonLabel}</button>
                                  </div>
                                  <div style={styles.buttonContainer}>
                                         <Link to={textValues.playlists.link} className="btn btn-primary btn-normal">
                                              CANCEL
                                        </Link>
                                  </div>
                                  {this.renderDeleteDutton()}
                            </div>


                      </div>

  );
}


}
