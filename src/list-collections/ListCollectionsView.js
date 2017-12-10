import React, {Component} from 'react'
import {api} from "../api";
import {
  Link
} from 'react-router-dom'

import {textValues,config} from "../configs";
import {AppHeader,BigButton} from "../components";
import {styles} from "./styles";


export  default class ListCollectionsView extends Component {
    constructor(props){
      super(props);
      if(textValues.collectionList.redirect)
        window.location.pathname=textValues.collectionList.redirect;
    }


    render(){

        return (
            <div>
              <AppHeader selected="collectionList"/>

                <div style={AppHeader.styles.content}>
                    <div className="dataContainer">
                            {textValues.redirect.message}
                    </div>
               </div>
            </div>
        );

    }

}
