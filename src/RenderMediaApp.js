import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import {textValues,images} from  "./configs";

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







export default class RenderMediaApp extends Component{

  render(){
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
                      );


    }




}