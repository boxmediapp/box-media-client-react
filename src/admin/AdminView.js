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
      genericUtil.redirectToMediaApp(textValues.admin.redirect);

    }
    render(){

        return (
          <div>
            <AppHeader selected="admin"/>

              <div style={AppHeader.styles.content}>
                  <div style={styles.iconContainer}>

                    {textValues.redirect.message}
                     {/*
                      <BigButton label={textValues.newepisodes.linkText}
                               content={textValues.newepisodes.actionText}
                               link={textValues.newepisodes.link}/>

                      <BigButton label={textValues.assignedEpisodes.linkText}
                                content={textValues.assignedEpisodes.actionText}
                                link={textValues.assignedEpisodes.link}/>
                      */}






                  </div>
             </div>




          </div>
        );

    }

}
