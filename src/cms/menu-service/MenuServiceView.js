import React, {Component} from 'react'
import {AppHeader,ModalDialog,LoadingIcon} from "../../components";
import {textValues} from "../../configs";
import {genericUtil} from "../../utils";
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
        this.state={modalMessage:null,loading:true, cmsmenu:[],action:ACTIONS.LIST_MENU, menuItemToEdit:null,availablePlaylists:[]};
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
  onError(error){
    console.error(error);
    this.setErrorMessage(""+error);
  }

  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }

componentWillMount(){
      this.processQueryParameters(this.props);
      this.loadAvailablePlaylists();
}
componentWillReceiveProps(nextprops){
    this.processQueryParameters(nextprops);
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
loadAvailablePlaylists(){
  this.loadPlayLists().then(availablePlaylists=>{
      this.setState(Object.assign({}, this.state,{availablePlaylists}));
  }).catch(error=>{
      this.onError(error);
  });
}

processQueryParameters(props){
      var loading=false;
      var menuId=null;
      if(props && props.location && props.location.search){
            menuId=genericUtil.getQueryParam(props.location.search, "menuId");
      }
      if(menuId){
        api.loadACMSMenu(menuId).then(menuItemToEdit=>{
            this.setState(Object.assign({}, this.state,{loading,menuItemToEdit, action:ACTIONS.EDIT_MENU}));
        }).catch(error=>{
            this.onError(error);
        });
        return;

      }
      else{
        api.loadAllCMSMenu().then(cmsmenu=>{
                this.setState(Object.assign({}, this.state,{loading,cmsmenu,action:ACTIONS.LIST_MENU}));
          }).catch(error=>{
              this.setErrorMessage(""+error);
          });

      }
}
loadCMSMenu(){
      var loading=false;
      api.loadAllCMSMenu().then(cmsmenu=>{
            this.setState(Object.assign({}, this.state,{cmsmenu,loading}));
      }).catch(error=>{
          this.setErrorMessage(""+error);
      });
}
onCancel(){
    this.setState(Object.assign({}, this.state,{action:ACTIONS.LIST_MENU}));
}

  onUpdateCMSMenu(cmsMenu){
    if(!cmsMenu.title){
      this.setErrorMessage(textValues.cms.menuService.error.missingTitle);
    }
    else if((!cmsMenu.playlist)||(!cmsMenu.playlist.length)){
      this.setErrorMessage(textValues.cms.menuService.error.missingPlaylists);
    }
    else{
      this.setState(Object.assign({}, this.state,{loading:true, action:ACTIONS.LIST_MENU}));
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
            this.loadCMSMenu();
           }).catch(error=>{
                this.onError(error);
           });
    }

  }
deleteCMSMenu(cmsMenu){
  if(cmsMenu && cmsMenu.id){
      this.setState(Object.assign({}, this.state,{loading:true}));
      api.deleteCMSMenu(cmsMenu).then(response=>{
          this.setState(Object.assign({}, this.state,{loading:false}));
          genericUtil.redirect(textValues.cms.menuService.link);
      }).catch(error=>{
          this.onError(error);
      });
  }
  else{
    console.error("cannot delete empty channel");
  }
}
  onDeleteCMSMenu(cmsMenu){

    var modalMessage={
           title:textValues.cms.menuService.confirmDelete.title,
           content:textValues.cms.menuService.confirmDelete.content+cmsMenu.title,
           onConfirm:()=>{
              this.deleteCMSMenu(cmsMenu)
                },
           onCancel:this.onClearMessage.bind(this),
           cancelButton:textValues.cms.menuService.confirmDelete.cancelButton,
           confirmButton:textValues.cms.menuService.confirmDelete.confirmButton,
    }
    this.setState(Object.assign({}, this.state,{modalMessage,loading:false}));
  }

  onDisplayCreateMenuForm(){
    this.setState(Object.assign({}, this.state,{action:ACTIONS.CREATE_MENU}));
  }
  renderCreateCMSMenu(){
      return (<CMSMenuEditor
        onUpdateCMSMenu={this.onUpdateCMSMenu.bind(this)}
        availablePlaylists={this.state.availablePlaylists}

        onError={this.onError.bind(this)}/>);
  }
  renderEditCMSMenu(){
       return (<CMSMenuEditor
                 onUpdateCMSMenu={this.onUpdateCMSMenu.bind(this)}
                 menuItemToEdit={this.state.menuItemToEdit}
                 availablePlaylists={this.state.availablePlaylists}
                 onDeleteCMSMenu={this.onDeleteCMSMenu.bind(this)}
                 onError={this.onError.bind(this)}/>);
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
