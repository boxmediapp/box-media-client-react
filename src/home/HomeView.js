import React, {Component} from 'react'
import {api} from "../api";
import {
  Link
} from 'react-router-dom'

import {textValues,config} from "../configs";


import {AppHeader,BigButton} from "../components";
import {styles} from "./styles";

export  default class HomeView extends Component {
  render(){

      return (
        <div>
          <AppHeader selected="home"/>

            <div style={AppHeader.styles.content}>
                <div style={styles.iconContainer}>

                    <BigButton label={textValues.episodeList.linkText}
                               content={textValues.episodeList.actionText}
                               redirect={textValues.episodeList.redirect}
                               icon={textValues.episodeList.icon}/>

                    <BigButton label={textValues.programmeList.linkText}
                              content={textValues.programmeList.actionText}
                              redirect={textValues.programmeList.redirect}
                              icon={textValues.programmeList.icon}/>

                    <BigButton label={textValues.collectionList.linkText}
                              content={textValues.collectionList.actionText}
                              redirect={textValues.collectionList.redirect}
                              icon={textValues.collectionList.icon}/>

                    <BigButton label={textValues.s3.linkText}
                                        content={textValues.s3.actionText}
                                        link={textValues.s3.link}
                                        icon={textValues.s3.icon}/>

                  <BigButton label={textValues.schedules.linkText}
                             content={textValues.schedules.actionText}
                             redirect={textValues.schedules.redirect}
                             icon={textValues.schedules.icon}/>

                  <BigButton label={textValues.playLists.linkText}
                                        content={textValues.playLists.actionText}
                                        redirect={textValues.playLists.redirect}
                                        icon={textValues.playLists.icon}/>


                  <BigButton label={textValues.manageUser.linkText}
                              content={textValues.manageUser.actionText}
                             link={textValues.manageUser.link}
                             icon={textValues.manageUser.icon}/>


                <BigButton label={textValues.importSchedules.linkText}
                            content={textValues.importSchedules.actionText}
                            link={textValues.importSchedules.link}
                            icon={textValues.importSchedules.icon}/>



              <BigButton label={textValues.manageAdvertRules.linkText}
                        content={textValues.manageAdvertRules.actionText}
                        link={textValues.manageAdvertRules.link}
                        icon={textValues.manageAdvertRules.icon}/>


            <BigButton label={textValues.manageTags.linkText}
                      content={textValues.manageTags.actionText}
                      link={textValues.manageTags.link}
                       icon={textValues.manageTags.icon}/>


            <BigButton label={textValues.manageDevices.linkText}
                         content={textValues.manageDevices.actionText}
                         link={textValues.manageDevices.link}
                         icon={textValues.manageDevices.icon}/>


            <BigButton label={textValues.appReports.linkText}
                        content={textValues.appReports.actionText}
                       link={textValues.appReports.link}
                       icon={textValues.appReports.icon}/>

                       <BigButton label={textValues.appConfig.linkText}
                                  content={textValues.appConfig.actionText}
                                  link={textValues.appConfig.link}
                                  icon={textValues.appConfig.icon}/>

                                <BigButton label={textValues.cms.menuService.linkText}
                                             content={textValues.cms.menuService.actionText}
                                             link={textValues.cms.menuService.link}
                                             icon={textValues.cms.menuService.icon}/>


                                           <BigButton label={textValues.account.linkText}
                                                          content={textValues.account.actionText}
                                                          link={textValues.account.link}
                                                          icon={textValues.account.icon}/>         



          </div>
           </div>




        </div>
      );

  }

}
