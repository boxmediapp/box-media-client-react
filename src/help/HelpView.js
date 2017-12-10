import React, {Component} from 'react'
import {api} from "../api";
import {
  Link
} from 'react-router-dom'

import {textValues,config} from "../configs";
import {AppHeader,BigButton} from "../components";
import {styles} from "./styles";
import {genericUtil} from "../utils";

export  default class HelpView extends Component {
    constructor(props){
      super(props);
      genericUtil.redirectToMediaApp(textValues.help.redirect);

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
