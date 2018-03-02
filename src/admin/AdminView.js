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
                                 link={textValues.manageUser.link}/>


                                 <BigButton label={textValues.importSchedules.linkText}
                                            content={textValues.importSchedules.actionText}
                                            link={textValues.importSchedules.link}/>



                      <BigButton label={textValues.appConfig.linkText}
                                 content={textValues.appConfig.actionText}
                                 link={textValues.appConfig.link}/>

                    <BigButton label={textValues.appReports.linkText}
                                            content={textValues.appReports.actionText}
                                            link={textValues.appReports.link}/>

                  <BigButton label={textValues.manageTags.linkText}
                                                                    content={textValues.manageTags.actionText}
                                                                    link={textValues.manageTags.link}/>

                  <BigButton label={textValues.manageDevices.linkText}
                    content={textValues.manageDevices.actionText}
                    link={textValues.manageDevices.link}/>

                    <BigButton label={textValues.manageAdvertRules.linkText}
                      content={textValues.manageAdvertRules.actionText}
                      link={textValues.manageAdvertRules.link}/>


            </div>
             </div>




          </div>
        );

    }

}
