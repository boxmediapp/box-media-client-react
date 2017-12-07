import React, {Component} from 'react'
import {api} from "../api";
import {
  Link
} from 'react-router-dom'

import {textValues,config} from "../configs";
import {ListEpisodesView} from "../list-episodes"
export  default class HomeView extends Component {
  constructor(props){
      super(props);
      if(window.location.search==='resource=singout'){
          window.location.search="";
      }
  }
  render(){
        return (
            <ListEpisodesView/>
        );
  }

}
