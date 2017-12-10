import React, {Component} from 'react'
import {api} from "../api";
import {
  Link
} from 'react-router-dom'

import {textValues,config} from "../configs";
import {AppHeader,BigButton} from "../components";
import {styles} from "./styles";


export  default class ListProgrammeView extends Component {
    constructor(props){
      super(props);
      if(textValues.programmeList.redirect)
        window.location.pathname=textValues.programmeList.redirect;
    }


    render(){

        return (
            <div>
              <AppHeader selected="programmeList"/>

                <div style={AppHeader.styles.content}>
                    <div className="dataContainer">
                            {textValues.redirect.message}
                    </div>
               </div>
            </div>
        );

    }

}
