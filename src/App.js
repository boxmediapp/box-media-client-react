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
import {UserManagerView} from "./user-manager";



import {genericUtil} from "./utils";




export default class App extends Component{
  constructor(props){
    super(props);
    var cred=genericUtil.loadCred();
    if(cred){
          var username=cred.username;
          var password=cred.password;
          appdata.setCredentials(username,password);

          this.state={authorization:appdata.buildAuthorization(username,password)};
    }
    else{
          this.state={authorization:appdata.getAuthorization()};
    }
    this.ubsubsribe=store.subscribe(()=>{
          this.setAuthorization(appdata.getAuthorization());
    });
  }

  onLoggedOut(currentAuthorization){
    this.setState(Object.assign({}, this.state, {authorization:null}));
  }
  onLoggedIn(currentAuthorization){
    api.loadConfig().then(appconfig=>{
        appdata.setAppConfig(appconfig);
        this.setState(Object.assign({}, this.state, {authorization:currentAuthorization}));
    }).catch((err)=>{
        console.error("failed to load the appinfo:"+err.stack);

    })


  }
  setAuthorization(currentAuthorization){
       if(this.state.authorization && (!currentAuthorization) ){
             this.onLoggedOut(currentAuthorization);
       }
       else if((!this.state.authorization) && currentAuthorization){
            this.onLoggedIn(currentAuthorization);
       }
       else if(this.state.authorization && currentAuthorization && this.state.authorization!==currentAuthorization){
            this.onLoggedIn(currentAuthorization);
       }
  }
  render(){
                if(this.state.authorization){
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
                                  <Route path={textValues.manageUser.link} component={UserManagerView}/>


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
    componentWillUnmount(){
      if(this.ubsubsribe){
        this.ubsubsribe();
      }
    }




}
