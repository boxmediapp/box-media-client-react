import React, {Component} from 'react'
import {api} from "../api";

import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import {Table, Column, Cell} from "fixed-data-table-2";

import {textValues,config} from "../configs";
import {AppHeader,ModalDialog} from "../components";

import {styles} from "./styles";
import  "./styles/index.css";
import {appdata} from "../store";

import {genericUtil} from "../utils";


export  default class AppReportsView extends Component {
    constructor(props){
      super(props);
      var appconfig=appdata.getAppConfig();
      this.state={numberOfEpisodes:"",numberOfHoursTotal:"",numberOfHoursActive:"",modalMessage:null};
    }


    componentWillMount(){
        this.loadAppReports();
    }

    onClearMessage(){
      this.setState(Object.assign({}, this.state,{modalMessage:null}));
    }
    setErrorMessage(content){
       var modalMessage={
              title:"Error",
              content,
              onConfirm:this.onClearMessage.bind(this),
              confirmButton:"OK"
       }
       this.setState(Object.assign({}, this.state,{modalMessage}));
    }
    loadAppReports(){
      api.getAppReports().then(appReports=>{
          this.setState(Object.assign({},this.state,appReports));
      }).catch((err)=>{
           this.setErrorMessage("failed to load the appinfo:"+err.stack);
      })
    }

    render(){
      var {numberOfEpisodes,numberOfHoursTotal,numberOfHoursActive}=this.state;


        return (
          <div>
            <AppHeader selected="admin"/>

              <div style={AppHeader.styles.content}>
                      <div className="row appconfigEditRow">
                               <div className="col-sm-6">
                                    {textValues.appReports.numberOfEpisodes.label}:{numberOfEpisodes}
                               </div>
                               <div className="col-sm-6">
                                    {textValues.appReports.numberOfHoursTotal.label}:{numberOfHoursTotal}
                               </div>

                        </div>
                        <div className="row appconfigEditRow">
                            <div className="col-sm-12">
                                 {textValues.appReports.numberOfHoursActive.label}:{numberOfHoursActive}
                            </div>
                        </div>
                        <ModalDialog message={this.state.modalMessage}/>
              </div>

          </div>
        );

    }


}
