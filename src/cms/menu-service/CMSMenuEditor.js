import React, {Component} from 'react'
import {AppHeader,ModalDialog,ItemIconList,SelectionModalDialog} from "../../components";
import {LoadingScreen} from "../../loading-screen";
import {textValues, localImages} from "../../configs";
import {styles} from "./styles";
import {genericUtil} from "../../utils";
import {api} from "../../api";
import {
  Link

} from 'react-router-dom'

var ACTIONS={
    ADD_PLAY_LIST:1
}


export default class CMSMenuEditor extends Component{
  constructor(props){
        super(props);
        this.state={menuItemToEdit:this.buildCMMenu(this.props.menuItemToEdit, this.props.availablePlaylists),action:null};
  }

buildCMMenu(menuItemToEdit,availablePlaylists){
        var ret={
            title:"",
            playlist:[]
        }
        if(menuItemToEdit){
            ret=Object.assign(ret,menuItemToEdit);
        }
        if(ret.playlist.length>0 && availablePlaylists.length>0){
              var playlist=[];
              ret.playlist.forEach(pl=>{
                        for(var i=0;i<availablePlaylists.length;i++){
                        if(availablePlaylists[i].id===pl.id){
                            playlist.push(availablePlaylists[i]);
                            break;
                        }
                      }
                  });
              ret.playlist=playlist;
        }
        return ret;
}
componentWillReceiveProps(nextProps){
    if((!nextProps.menuItemToEdit) || this.state.menuItemToEdit.id!=nextProps.menuItemToEdit.id || this.props.availablePlaylists.length!=nextProps.availablePlaylists.length){
            var menuItemToEdit=this.buildCMMenu(this.state.menuItemToEdit,nextProps.availablePlaylists);
            this.setState(Object.assign({}, this.state,{menuItemToEdit}));
    }
}


updateMenu(){
  if(this.props.menuItemToEdit){
        var modified=false;
        if(this.props.menuItemToEdit.title!==this.state.menuItemToEdit.title){
              modified=true;
        }
        else if(!genericUtil.array1IsIdentidicalToArray2(this.state.menuItemToEdit.playlist,this.props.menuItemToEdit.playlist, (p1,p2)=>{
          return p1.id===p2.id;
        })){
            modified=true;
        }
        if(!modified){
            console.log("not Modified");
            return;
        }
  }
  this.props.onUpdateCMSMenu(this.state.menuItemToEdit);
}

onError(error){
      this.props.onError(error);
  }


  displatAddPlayListDialog(){
    this.setState(Object.assign({}, this.state,{action:ACTIONS.ADD_PLAY_LIST}));
  }
  onCancelPlayList(){
    this.setState(Object.assign({}, this.state,{action:null}));
  }

  addPlayList(playlist){
    var menuItemToEdit=this.state.menuItemToEdit;
    var existing=menuItemToEdit.playlist.filter(pl=>pl.id===playlist.id);
    if(existing && existing.length){
        console.log("already added");
    }
    else{
          menuItemToEdit.playlist.push(playlist);
          this.setState(Object.assign({}, this.state,{menuItemToEdit,action:null}));
    }

  }
  onDeletePlayList(playList){
    var menuItemToEdit=this.state.menuItemToEdit;
    menuItemToEdit.playlist=menuItemToEdit.playlist.filter(pl=>pl.id!=playList.id);
    this.setState(Object.assign({}, this.state,{menuItemToEdit,action:null}));
  }
  renderAction(){
      if(this.state.action===ACTIONS.ADD_PLAY_LIST && this.props.availablePlaylists && this.props.availablePlaylists.length>0){
        return (<SelectionModalDialog items={this.props.availablePlaylists}
                title={textValues.cms.menuService.addPlayList.title}
                content={textValues.cms.menuService.addPlayList.content}
                selectedItem={this.props.availablePlaylists[0]}
                onConfirm={this.addPlayList.bind(this)}
                onCancel={this.onCancelPlayList.bind(this)}
                confirmButton={textValues.cms.menuService.addPlayList.confirmButton}
                cancelButton={textValues.cms.menuService.addPlayList.cancelButton}/>);
      }
      else{
        return null;
      }
  }

  deleteCMSMenu(){
      this.props.onDeleteCMSMenu(this.state.menuItemToEdit);
  }
  renderDeleteDutton(){
    if(this.props.menuItemToEdit){
      return(
          <div style={styles.deleteButtonContainer}>
                 <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                          this.deleteCMSMenu();
                      }}>DELETE</button>
          </div>
      );
    }
    else{
          return null;
    }

  }


  setCMSMenuValues(values){
    var menuItemToEdit=this.state.menuItemToEdit;
    menuItemToEdit=Object.assign(menuItemToEdit,values);
    this.setState(Object.assign({}, this.state,{menuItemToEdit}));
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
                                this.setCMSMenuValues({title:evt.target.value});
                            }} value={this.state.menuItemToEdit.title}/>
                          </div>

                          <div style={styles.formItem}>
                              <ItemIconList label="Selected Playlists:" selectIcon={localImages.deleteIcon}
                              items={this.state.menuItemToEdit.playlist}
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
                              <Link to={textValues.cms.menuService.link} className="btn btn-primary btn-normal">
                                   CANCEL
                             </Link>

                            </div>

                              {this.renderDeleteDutton()}
                          </div>

                      </div>

  );
}


}
