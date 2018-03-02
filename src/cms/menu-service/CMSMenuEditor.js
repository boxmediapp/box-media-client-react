import React, {Component} from 'react'
import {AppHeader,ModalDialog,ItemIconList,SelectionModalDialog} from "../../components";
import {LoadingScreen} from "../../loading-screen";
import {textValues, localImages} from "../../configs";
import {styles} from "./styles";
import {genericUtil} from "../../utils";

var ACTIONS={
    ADD_PLAY_LIST:1
}


export default class CMSMenuEditor extends Component{
  constructor(props){
        super(props);
        this.state={title:"",selectedPlaylists:[],action:null};
  }
  componentWillMount(){
    this.updateEditorFromProps(this.props);
  }

  componentWillReceiveProps(nextProps){
      if(this.state.menuItemToEdit!=nextProps.menuItemToEdit){
            this.updateEditorFromProps(nextProps);
      }
  }
  updateEditorFromProps(props){
          if(props.menuItemToEdit){
                  var selectedPlaylists=[];
                  props.menuItemToEdit.playlist.forEach(pl=>{
                          for(var i=0;i<this.props.playlists.length;i++){
                            if(this.props.playlists[i].id===pl.id){
                              selectedPlaylists.push(this.props.playlists[i]);
                              break;
                            }
                          }
                      });
                 this.setState({title:this.props.menuItemToEdit.title,selectedPlaylists,action:null});
          }
  }

  setTitle(title){
       this.setState(Object.assign({}, this.state,{title}));
  }

  updateMenu(){
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
          }
          var cmsMenu={
                id:this.props.menuItemToEdit.id,
                title:this.state.title,
                playlist:this.state.selectedPlaylists
          }
          this.props.onUpdateCMSMenu(cmsMenu);

    }
    else{
      var cmsMenu={
            title:this.state.title,
            playlist:this.state.selectedPlaylists
      }
      this.props.onUpdateCMSMenu(cmsMenu);
    }

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
      if(this.state.action===ACTIONS.ADD_PLAY_LIST){
        return (<SelectionModalDialog items={this.props.playlists}
                title={textValues.cms.menuService.addPlayList.title}
                content={textValues.cms.menuService.addPlayList.content}
                selectedItem={this.props.playlists[0]}
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
