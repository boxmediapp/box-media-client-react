import React, {Component} from 'react'
import {api} from "../api";
import {
  Link
} from 'react-router-dom'

import {textValues,config} from "../configs";
import {AppHeader,BigButton} from "../components";
import {styles} from "./styles";


export  default class ListS3FilesView extends Component {
    constructor(props){
      super(props);
      if(textValues.s3.redirect)
        window.location.pathname=textValues.s3.redirect;
    }


    render(){

        return (
            <div>
              <AppHeader selected="s3"/>

                <div style={AppHeader.styles.content}>
                    <div className="dataContainer">
                              {textValues.redirect.message}
                    </div>
               </div>
            </div>
        );

    }

}
