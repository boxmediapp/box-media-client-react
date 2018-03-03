import React, {Component} from 'react'
import {AppHeader,ModalDialog,ItemIconList,SelectionModalDialog,LoadingIcon} from "../../components";
import {LoadingScreen} from "../../loading-screen";
import {textValues, localImages} from "../../configs";
import {styles} from "./styles";
import {genericUtil} from "../../utils";
import {api} from "../../api";
var ACTIONS={
    ADD_PLAY_LIST:1
}


export default class CMSMenuEditor extends Component{
  constructor(props){
        super(props);
        this.state={title:"",selectedPlaylists:[],action:null,availablePlaylists:null,loading:true};
  }
  componentWillMount(){
    var loading=false;

    this.loadPlayLists().then(availablePlaylists=>{
          if(this.props.menuItemToEdit){
              this.setStateFromMenuItem(this.props.menuItemToEdit,availablePlaylists);
          }
          else{
              this.setState(Object.assign({}, this.state,{availablePlaylists,loading}));
          }
    }).catch(error=>{
        this.onError(error);
        this.setState(Object.assign({}, this.state,{availablePlaylists:[],loading}));
    });
  }
  onError(error){
      this.props.onError(error);
  }
  loadPlayLists(){
         var pr=new Promise((resolve,reject)=>{
              api.loadBCPlaylists().then(playlists=>{
                  if(playlists && playlists.length){
                    playlists.forEach(pl=>{
                      pl.label=pl.playListData.name;
                      pl.value=pl.playListData.id;
                    });
                    resolve(playlists);
                  }
              }).catch(error=>{
                  reject(error);
              });
        });
        return pr;
  }

  componentWillReceiveProps(nextProps){
      if(this.state.menuItemToEdit!=nextProps.menuItemToEdit){
            if(nextProps.menuItemToEdit){
                  this.setStateFromMenuItem(nextProps.menuItemToEdit,this.state.availablePlaylists);
            }
            else{
                this.setState(Object.assign({}, this.state,{title:"",selectedPlaylists:[],action:null}));
            }
      }
  }
  setStateFromMenuItem(menuItemToEdit, availablePlaylists){
        var selectedPlaylists=[];
        var loading=false;

        menuItemToEdit.playlist.forEach(pl=>{
                for(var i=0;i<availablePlaylists.length;i++){
                  if(availablePlaylists[i].id===pl.id){
                      selectedPlaylists.push(availablePlaylists[i]);
                      break;
                  }
                }
            });
       this.setState({title:menuItemToEdit.title,selectedPlaylists,action:null,availablePlaylists,loading});
  }

  setTitle(title){
       this.setState(Object.assign({}, this.state,{title}));
  }

  updateMenu(){

    var cmsMenu={
          title:this.state.title,
          playlist:this.state.selectedPlaylists
    }

    if(this.props.menuItemToEdit){
          var modified=false;
          if(this.props.menuItemToEdit.title!==this.state.title){
            modified=true;
          }
          else if(!genericUtil.array1IsIdentidicalToArray2(this.state.selectedPlaylists,this.props.menuItemToEdit.playlist, (p1,p2)=>{
            return p1.id===p2.id;
          })){
              modified=true;
          }
          if(modified){
              console.log("Modified");
          }
          else{
            console.log("not modified");
            return;
          }
          cmsMenu.id=this.props.menuItemToEdit.id;
    }

    this.props.onUpdateCMSMenu(cmsMenu);
  }

  displatAddPlayListDialog(){
    this.setState(Object.assign({}, this.state,{action:ACTIONS.ADD_PLAY_LIST}));
  }
  onCancelPlayList(){
    this.setState(Object.assign({}, this.state,{action:null}));
  }
  cancelEdit(){
    this.props.onCancel();
  }
  addPlayList(playlist){
    var selectedPlaylists=this.state.selectedPlaylists;
    var existing=selectedPlaylists.filter(pl=>pl.id===playlist.id);
    if(existing && existing.length){
        console.log("already added");
    }
    else{
          selectedPlaylists.push(playlist);
          this.setState(Object.assign({}, this.state,{selectedPlaylists,action:null}));
    }

  }
  onDeletePlayList(playList){

    var selectedPlaylists=this.state.selectedPlaylists.filter(pl=>pl.id!=playList.id);

    this.setState(Object.assign({}, this.state,{selectedPlaylists,action:null}));
  }
  renderAction(){
      if(this.state.action===ACTIONS.ADD_PLAY_LIST && this.state.availablePlaylists && this.state.availablePlaylists.length>0){
        return (<SelectionModalDialog items={this.state.availablePlaylists}
                title={textValues.cms.menuService.addPlayList.title}
                content={textValues.cms.menuService.addPlayList.content}
                selectedItem={this.state.availablePlaylists[0]}
                onConfirm={this.addPlayList.bind(this)}
                onCancel={this.onCancelPlayList.bind(this)}
                confirmButton={textValues.cms.menuService.addPlayList.confirmButton}
                cancelButton={textValues.cms.menuService.addPlayList.cancelButton}/>);
      }
      else{
        return null;
      }
  }

render(){
  var title="Create New CMS Menu";
  var buttonLabel="Create";

  if(this.props.menuItemToEdit){
    title="Edit CMS Menu";
    buttonLabel="Update"
  }
  return (
                      <div style={styles.formContainer}>
                          <div style={styles.title}>{title}</div>
                          <LoadingIcon loading={this.state.loading}/>
                          <div style={styles.formItem}>
                              <label htmlFor="title" style={styles.label}>Title:</label>
                              <input type="text" className="form-control" id="title" placeholder="Menu Title"
                              onChange={(evt) => {
                              this.setTitle(evt.target.value);
                            }} value={this.state.title}/>
                          </div>

                          <div style={styles.formItem}>
                              <ItemIconList label="Selected Playlists:" selectIcon={localImages.deleteIcon}
                              items={this.state.selectedPlaylists}
                              onSelectedItem={this.onDeletePlayList.bind(this)}/>


                            <a onClick={this.displatAddPlayListDialog.bind(this)}>
                                <img src={localImages.addIcon}/>
                            </a>
                            {this.renderAction()}

                          </div>

                          <div style={styles.footer}>
                            <div style={styles.buttonContainer}>
                                   <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                                            this.updateMenu();
                                        }}>{buttonLabel}</button>
                            </div>
                            <div style={styles.buttonContainer}>

                                <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                                         this.cancelEdit();
                                     }}>Cancel</button>
                            </div>
                          </div>

                      </div>

  );
}


}
