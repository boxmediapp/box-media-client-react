import React, {Component} from 'react'
import {AppHeader,ModalDialog,LoadingIcon} from "../../components";
import {textValues} from "../../configs";
import {api} from "../../api";
import {styles} from "./styles";
import CMSMenuEditor from "./CMSMenuEditor";
import ListCMSMenu from "./ListCMSMenu";

var ACTIONS={
    LIST_MENU:0,
    CREATE_MENU:1,
    EDIT_MENU:2
}

export default class MenuServiceView extends Component{
  constructor(props){
        super(props);
        this.state={playlists:[],modalMessage:null,loading:true, cmsmenu:[],action:ACTIONS.LIST_MENU, menuItemToEdit:null};
  }
  setErrorMessage(message){
    var modalMessage={
           title:textValues.cms.menuService.error.title,
           content:message,
           onConfirm:this.onClearMessage.bind(this),
           confirmButton:"Ok",
    }
    this.setState(Object.assign({}, this.state,{modalMessage,loading:false}));
  }

  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }

componentWillMount(){
      var loading=false;
      this.loadPlayLists().then(playlists=>{
                api.loadAllCMSMenu().then(cmsmenu=>{
                      this.setState(Object.assign({}, this.state,{playlists,cmsmenu,loading}));
                }).catch(error=>{
                    this.setErrorMessage(""+error);
                });

      }).catch(error=>{
          this.setErrorMessage(""+error);
      });

}
onCancel(){
    this.setState(Object.assign({}, this.state,{action:ACTIONS.LIST_MENU}));
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


  onUpdateCMSMenu(cmsMenu){
    if(!cmsMenu.title){
      this.setErrorMessage(textValues.cms.menuService.error.missingTitle);
    }
    else if((!cmsMenu.playlist)||(!cmsMenu.playlist.length)){
      this.setErrorMessage(textValues.cms.menuService.error.missingPlaylists);
    }
    else{
      this.setState(Object.assign({}, this.state,{loading:true}));
      var playlist=[];
      cmsMenu.playlist.forEach(pl=>{
          playlist.push({
            id:pl.id,
            title:pl.playListData.name
          });
      });

          api.updateCMSMenu({
            id:cmsMenu.id,
            title:cmsMenu.title,
            playlist
          }).then(response=>{
             this.setState(Object.assign({}, this.state,{loading:false,created:true}));
           }).catch(error=>{
             this.setState(Object.assign({}, this.state,{loading:false,created:false}));
             this.setErrorMessage("Failed to update cms menu:"+error);
           });
    }

  }



  onDisplayCreateMenuForm(){
    this.setState(Object.assign({}, this.state,{action:ACTIONS.CREATE_MENU}));
  }
  renderCreateCMSMenu(){
      return (<CMSMenuEditor playlists={this.state.playlists} onUpdateCMSMenu={this.onUpdateCMSMenu.bind(this)} onCancel={this.onCancel.bind(this)}/>);
  }
  renderEditCMSMenu(){
       return (<CMSMenuEditor playlists={this.state.playlists} onUpdateCMSMenu={this.onUpdateCMSMenu.bind(this)}
          menuItemToEdit={this.state.menuItemToEdit} onCancel={this.onCancel.bind(this)}/>);
  }
  editCMSMenu(menuItemToEdit){
    this.setState(Object.assign({}, this.state,{menuItemToEdit, action:ACTIONS.EDIT_MENU}));
  }
  renderListCMSMenu(){
      return (<ListCMSMenu cmsmenu={this.state.cmsmenu}
        onDisplayCreateMenuForm={this.onDisplayCreateMenuForm.bind(this)}
        editCMSMenu={this.editCMSMenu.bind(this)}
        />);
  }
   renderActions(){
        if(this.state.action===ACTIONS.LIST_MENU){
              return this.renderListCMSMenu();

        }
        else if(this.state.action===ACTIONS.CREATE_MENU){
              return this.renderCreateCMSMenu();

        }
        else if(this.state.action===ACTIONS.EDIT_MENU){
            return this.renderEditCMSMenu();

        }
        else{
          return null;
        }
   }

    render(){
      return (
        <div>
            <AppHeader selected="home"/>

            <div style={AppHeader.styles.content}>
                         <LoadingIcon loading={this.state.loading}/>
                         {this.renderActions()}

           </div>
            <ModalDialog message={this.state.modalMessage}/>
        </div>
      );
    }



}
