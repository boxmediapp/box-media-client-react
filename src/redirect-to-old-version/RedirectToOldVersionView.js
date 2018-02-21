import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import {textValues} from  "../configs";
import {genericUtil} from "../utils";

export default class RedirectToOldVersionView extends Component {


    render(){
              genericUtil.redirect(textValues.episodeList.redirect+"?"+this.props.location.search);
              return(
                <div>Loading...</div>
              )
    }

}
