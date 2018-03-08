import React, {Component} from 'react'
import {AppHeader,ModalDialog,LoadingIcon,ItemIconList,SelectionModalDialog} from "../../components";
import {textValues,localImages} from "../../configs";
import {api} from "../../api";
import {genericUtil} from "../../utils";
import {styles} from "./styles";

var ACTIONS={
    LIST_EPISODE_PLAYLIST:1
}

export default class EpisodePlaylistsView extends Component{
  constructor(props){
        super(props);
        this.state={modalMessage:null,loading:true,episode:null,items:[], action:null};
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
  onError(error){
        console.error(error);
        api.processAPIError(error, (errorMessage, code)=>{
              if(code && code===422){
                    this.setErrorMessage("The playlist is full, you can no longer add new items to the playlist");
              }
              else{
                this.setErrorMessage(errorMessage);
              }
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
  buildEpisodeItems(episode, items){
          var itemsAdded=[];
          var itemsAvailable=[];

          items.forEach(itm=>{
            if(itm.playlist.playListData && itm.playlist.playListData.video_ids){
                var missing=true;

                for(var i=0;i<itm.playlist.playListData.video_ids.length;i++){
                  if(itm.playlist.playListData.video_ids[i]===episode.brightcoveId){
                        itemsAdded.push(itm);
                        missing=false;
                        break;
                  }
                }
                if(missing){
                    itemsAvailable.push(itm);
                }
            }
          });
          episode.itemsAdded=itemsAdded;
          episode.itemsAvailable=itemsAvailable;
          episode.itemsAddedCopy=[...itemsAdded];
  }

  loadItems(){
         var pr=new Promise((resolve,reject)=>{
              api.loadExplictPlaylists().then(playlists=>{
                  if(playlists && playlists.length){
                     var items=[];
                      playlists.forEach(pl=>{
                        items.push({
                            label:pl.playListData.name,
                            value:pl.playListData.id,
                            playlist:pl
                        });
                      });
                      resolve(items);
                  }
              }).catch(error=>{
                  reject(error);
              });
        });
        return pr;
  }

  loadEpisodeDetails(items,episodeid){
    var loading=false;
        api.loadEpisodeDetails(episodeid).then(episode=>{
            if(!episode.brightcoveId){
                  this.onError("The episode is not yet published to the brighcove yet");

                  return;
             }
             else{
                  this.buildEpisodeItems(episode,items);
                  this.setState(Object.assign({}, this.state,{loading,episode,items, action:ACTIONS.LIST_EPISODE_PLAYLIST}));
             }

        }).catch(error=>{
            this.onError(error);
        });
  }
  processQueryParameters(props){

      this.loadItems().then(items=>{
        if(props && props.location && props.location.search){
              var episodeid=genericUtil.getQueryParam(props.location.search, "episodeid");
              if(episodeid){
                    this.loadEpisodeDetails(items,episodeid);
              }
              else{
                this.onError("missing episodeid");
              }
        }
      }).catch(error=>{
        this.onError(error);
      });

  }

 onAddItem(item){
       var episode=this.state.episode;
       var matched=episode.itemsAdded.filter(itm=>itm.value===item.value);
       if(matched.length){
         console.log("already added");
         return;
       }
       else{
         episode.itemsAdded.push(item);
         episode.itemsAvailable=episode.itemsAvailable.filter(itm=>itm.value!==item.value);
         episode.modified=true;
         this.setState(Object.assign({}, this.state,{episode}));
       }

 }
 onDeleteItem(item){
      var episode=this.state.episode;
      var matched=episode.itemsAdded.filter(itm=>itm.value===item.value);
      if(!matched.length){
            console.log("already deleted");
            return;
      }
      else{
        episode.itemsAdded=episode.itemsAdded.filter(itm=>itm.value!==item.value);
        episode.itemsAvailable.push(item);
        episode.modified=true;
        this.setState(Object.assign({}, this.state,{episode}));
      }

 }
  cancel(){
    this.loadEpisodeDetails(this.state.items,this.state.episode.id);
  }
  getUpdatedPlaylist(){
          var updatelist=[];
          this.state.episode.itemsAdded.forEach(itm=>{
                var newrecord=true;
                for(var i=0;i<this.state.episode.itemsAddedCopy.length;i++){
                      if(itm.value===this.state.episode.itemsAddedCopy[i].value){
                          newrecord=false;
                          break;
                        }
                }
               if(newrecord){
                   itm.playlist.playListData.video_ids.push(this.state.episode.brightcoveId);
                   updatelist.push(itm.playlist);
               }
            });
            this.state.episode.itemsAddedCopy.forEach(itm=>{
                  var deletedrecord=true;
                  for(var i=0;i<this.state.episode.itemsAdded.length;i++){
                        if(itm.value===this.state.episode.itemsAdded[i].value){
                              deletedrecord=false;
                              break;
                         }
                   }
                   if(deletedrecord){
                         itm.playlist.playListData.video_ids=itm.playlist.playListData.video_ids.filter(vid=>vid!==this.state.episode.brightcoveId);
                         updatelist.push(itm.playlist);
                   }
               });
              return  updatelist;
  }
saveEpisodePlaylist(){
    if(genericUtil.array1IsIdentidicalToArray2(this.state.episode.itemsAdded,this.state.episode.itemsAddedCopy, (p1, p2)=>{
        return p1.value===p2.value;
    })){
       console.log("not modified");
    }
    else{
          var updatelist=this.getUpdatedPlaylist();
          this.setState(Object.assign({}, this.state,{loading:true}));
          this.processUpdatePlaylistQueue(updatelist);
    }
}
processUpdatePlaylistQueue(queue){
    if(!queue.length){
          this.processQueryParameters(this.props);
          return;
    }
    var playlist=queue.pop();
    api.patchBCPlaylist(playlist).then(response=>{
        this.processUpdatePlaylistQueue(queue);
    }).catch(error=>{
        this.onError(error);
    });


}
renderSaveButton(){
  if(this.state.episode && this.state.episode.modified){
     return(
      <div style={styles.footer}>

          <div style={styles.buttonContainer}>
                 <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                          this.saveEpisodePlaylist();
                      }}>SAVE</button>
          </div>
          <div style={styles.buttonContainer}>
                <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                               this.cancel();
                }}>CANCEL</button>
          </div>

      </div>


          );
  }
  else{
    return null;
  }

}

renderEpisodeDetails(){
  if(this.state.episode){
    return(
  <div style={styles.formContainer}>
        <div style={styles.formItem}>
            <div style={styles.label}>Episode Title:</div>
            <div style={styles.valueField}>{this.state.episode.title}</div>
        </div>
        <div style={styles.formItem}>
            <div style={styles.label}>Programme number:</div>
            <div style={styles.valueField}>{this.state.episode.programmeNumber}</div>
        </div>

        <div style={styles.formItem}>
            <div style={styles.label}>Added Playlists:</div>

            <ItemIconList label="" selectIcon={localImages.deleteIcon}
            items={this.state.episode.itemsAdded}
            onSelectedItem={this.onDeleteItem.bind(this)}/>
        </div>

              {this.renderSaveButton()}

        <div style={styles.availablePlayListContainer}>
          <div style={styles.formItem}>
              <div style={styles.label}>Available Playlists:</div>
          </div>
              <div style={styles.formItem}>
                  <ItemIconList label="" selectIcon={localImages.addIcon}
                  items={this.state.episode.itemsAvailable}
                  onSelectedItem={this.onAddItem.bind(this)}/>
              </div>

        </div>
  </div>

    );
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
                        <div style={styles.title}>Playlist</div>
                         <LoadingIcon loading={this.state.loading}/>
                         {this.renderEpisodeDetails()}
           </div>

            <ModalDialog message={this.state.modalMessage}/>
        </div>
      );
    }



}
