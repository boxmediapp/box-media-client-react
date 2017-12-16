import React, {Component} from 'react'
import {api} from "../api";

import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import {Table, Column, Cell} from "fixed-data-table-2";

import {textValues,config} from "../configs";
import {AppHeader,ModalDialog,TextFieldWithToolTip} from "../components";
import {styles} from "./styles";



import {genericUtil} from "../utils";
import  "./styles/index.css";

export default class ManageDevicesView extends Component{
  constructor(props){
    super(props);
    this.state={devices:[], modalMessage:null, newdevice:""};
    this.loadDevices();
  }

  loadDevices(){
    api.loadDevices().then(devices =>{
           this.setDevices(devices);
     });
  }
  setDevices(devices){
    this.setState(Object.assign({}, this.state,{devices}));
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
  setNewDevice(newdevice){
    this.setState(Object.assign({}, this.state,{newdevice}));
  }
  addNewDevice(){
    if(this.state.newdevice){

      api.addNewDevice({name:this.state.newdevice}).then(response =>{
             this.loadDevices();
      });
    }


  }
  onDelete(device){
    if(device){
      var devices=this.state.devices.filter(t=>t.id!==device.id);
      this.setState(Object.assign({}, this.state,{devices}));
      api.removeDevice(device).then(response =>{
             this.loadDevices();
      });
    }
  }
  render(){

      return (
        <div>
          <AppHeader selected="admin"/>
            <div style={AppHeader.styles.content}>
                <h1>Available Devices</h1>
               <div style={styles.devicesContainer}>
                    <ListDevices devices={this.state.devices} onDelete={this.onDelete.bind(this)}/>
                </div>
                <div className="row appconfigEditRow">
                      <TextFieldWithToolTip fieldId="addNewDevice" className="addNewDeviceContainer"
                                colSize={4}
                                label={textValues.manageDevices.addNewDevice.label}
                                help={textValues.manageDevices.addNewDevice.help}
                                value={this.state.newdevice}
                                onChange={this.setNewDevice.bind(this)}/>
                              <div className="col-sm-6">
                                <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                                    this.addNewDevice();
                                  }}>Add</button>
                              </div>
                </div>
           </div>

             <ModalDialog message={this.state.modalMessage}/>

        </div>
      );

  }
}

class ListDevices extends Component{
     renderDevice(device){
       var {onDelete}=this.props;
       return(

               <div key={device.id} style={styles.deviceRow}>

                      <div style={styles.deviceContaineer}>{device.name}


                            <button style={styles.deleteAction} onClick={evt=>{
                                  onDelete(device);
                              }}>delete</button>


                      </div>

               </div>


       );

     }
     render(){
        if(this.props.devices && this.props.devices.length>0){
          return this.props.devices.map(this.renderDevice.bind(this));
        }
        else{
          return null;
        }
     }
}
