import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/App.css";


import {textValues,images} from  "./configs";

import {appdata,store} from "./store";
import {api} from "./api";

import {DisplayLogin} from "./display-login";
import {AdminView} from "./admin";
import {HomeView} from "./home";
import {ListEpisodesView} from "./list-episodes";
import {ListProgrammeView} from "./list-programme";
import {ListCollectionsView} from "./list-collections";
import {ListS3FilesView} from "./list-s3-files";
import {ListSchedulesView} from "./list-schedules";
import {ListPlayListView} from "./playlists";
import {ImportSchedulesView} from "./import-schedules";
import {HelpView} from "./help";
import {ManageUsersView} from "./manage-users";
import {ManageAppConfigView} from "./manage-app-config";
import {AppReportsView} from "./app-reports";
import {ManageTagsView} from "./manage-tags";
import {ManageDevicesView} from "./manage-devices";
import {ManageAdvertisementRulesView} from "./manage-advertisement-rules";
import {genericUtil} from "./utils";

import {ModalDialog} from "./components";

import {LoadingScreen} from "./loading-screen";



export default class App extends Component{
  constructor(props){
    super(props);
    this.state={userinfo:"", message:null,loading:true};
    this.ubsubsribe=store.subscribe(this.receiveStateFromStore.bind(this));
    genericUtil.clearOldStorage();
    var userInfo=genericUtil.loadUserInfo();
    if(genericUtil.isUserInfoValid(userInfo)){
        appdata.setUserInfo(userInfo);
    }
    else{
      this.state.loading=false;
    }
  }

  componentWillUnmount(){
    if(this.ubsubsribe){
      this.ubsubsribe();
    }
    genericUtil.stopRefreshLoginThread();    
  }

  receiveStateFromStore(){
       var userinfo= appdata.getUserInfo();
       if(!userinfo){
          if(this.state.userinfo){
            this.setState(Object.assign({}, this.state, {userinfo:null,loading:false}));
            genericUtil.signout();
          }
          return;
       }
       else if(userinfo === this.userinfo){
            return;
       }
       this.userinfo=userinfo;
       api.loadConfig().then(appconfig=>{
                var loading=false;
                this.setState(Object.assign({}, this.state, {userinfo,loading}));
                appdata.setAppConfig(appconfig);
                genericUtil.startRefreshLoginThread(userinfo);
       }).catch((err)=>{
           console.error("failed to load the appinfo:"+err.stack);
           appdata.setUserInfo(null);
           this.setState(Object.assign({}, this.state, {userinfo:null,loading:false}));
           this.setErrorMessage("Login failed:"+err);
       })
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
     this.setState(Object.assign({}, this.state,{modalMessage,loading:false}));
  }

  render(){
                if(this.state.loading){
                    return (<LoadingScreen/>);
                }
                else if(this.state.userinfo){
                    return (
                            <Router>
                              <div className="topContainer">
                                  <Route  path={textValues.home.link} exact component={HomeView}/>
                                  <Route  path={textValues.home.link2} exact component={HomeView}/>
                                  <Route  path={textValues.episodeList.link} component={ListEpisodesView}/>
                                  <Route  path={textValues.programmeList.link} component={ListProgrammeView}/>
                                  <Route  path={textValues.collectionList.link} component={ListCollectionsView}/>
                                  <Route  path={textValues.s3.link} component={ListS3FilesView}/>
                                  <Route  path={textValues.schedules.link} component={ListSchedulesView}/>
                                  <Route  path={textValues.playLists.link} component={ListPlayListView}/>
                                  <Route  path={textValues.importSchedules.link} component={ImportSchedulesView}/>

                                  <Route  path={textValues.admin.link} component={AdminView}/>
                                  <Route  path={textValues.help.link} component={HelpView}/>



                                  <Route path={textValues.admin.link} component={AdminView}/>
                                  <Route path={textValues.manageUser.link} component={ManageUsersView}/>
                                  <Route path={textValues.appConfig.link} component={ManageAppConfigView}/>
                                  <Route path={textValues.appReports.link} component={AppReportsView}/>
                                  <Route path={textValues.manageTags.link} component={ManageTagsView}/>
                                  <Route path={textValues.manageDevices.link} component={ManageDevicesView}/>
                                  <Route path={textValues.manageAdvertRules.link} component={ManageAdvertisementRulesView}/>

                              </div>
                            </Router>
                      )
                    }
                    else{
                        return (
                            <DisplayLogin/>

                        );

                   }
    }




}
