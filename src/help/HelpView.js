import React, {Component} from 'react'
import {api} from "../api";
import {
  Link
} from 'react-router-dom'

import {textValues,config} from "../configs";
import {AppHeader,BigButton} from "../components";
import {styles} from "./styles";


export  default class HelpView extends Component {
    constructor(props){
      super(props);
      if(textValues.help.redirect)
        window.location.pathname=textValues.help.redirect;
    }


    render(){

        return (
            <div>
              <AppHeader selected="help"/>

                <div style={AppHeader.styles.content}>
                    <div className="dataContainer">
                          Help
                    </div>
               </div>
            </div>
        );

    }

}
