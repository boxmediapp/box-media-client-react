import React, {Component} from 'react'
import {api} from "../api";


import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'

import {textValues,config} from "../configs";
import {AppHeader,BigButton} from "../components";
import {styles} from "./styles";
import {genericUtil} from "../utils";

export  default class AdminView extends Component {
    constructor(props){
      super(props);
    }
    render(){
     console.log("****")
        return (
          <div>
            <AppHeader selected="admin"/>

              <div style={AppHeader.styles.content}>
                  <div style={styles.iconContainer}>

                    <BigButton label={textValues.manageUser.linkText}
                                content={textValues.manageUser.actionText}
                               link={textValues.manageUser.link}
                               icon={textValues.manageUser.icon}/>


                    <BigButton label={textValues.importSchedules.linkText}
                              content={textValues.importSchedules.actionText}
                              link={textValues.importSchedules.link}
                              icon={textValues.importSchedules.icon}/>



                    <BigButton label={textValues.appConfig.linkText}
                                content={textValues.appConfig.actionText}
                                link={textValues.appConfig.link}
                                icon={textValues.appConfig.icon}/>

                    <BigButton label={textValues.appReports.linkText}
                        content={textValues.appReports.actionText}
                        link={textValues.appReports.link}
                        icon={textValues.appReports.icon}/>

                      <BigButton label={textValues.manageTags.linkText}
                        content={textValues.manageTags.actionText}
                        link={textValues.manageTags.link}
                        icon={textValues.manageTags.icon}/>


                      <BigButton label={textValues.manageDevices.linkText}
                          content={textValues.manageDevices.actionText}
                          link={textValues.manageDevices.link}
                          icon={textValues.manageDevices.icon}/>

                        <BigButton label={textValues.manageAdvertRules.linkText}
                            content={textValues.manageAdvertRules.actionText}
                            link={textValues.manageAdvertRules.link}
                            icon={textValues.manageAdvertRules.icon}/>


            </div>
             </div>




          </div>
        );

    }

}
