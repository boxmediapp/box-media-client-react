import React, {Component} from 'react'
import {AppHeader,ModalDialog,ItemIconList,SelectionModalDialog,LoadingIcon} from "../../components";
import {LoadingScreen} from "../../loading-screen";
import {textValues, localImages} from "../../configs";
import {styles} from "./styles";
import {genericUtil} from "../../utils";
import {api} from "../../api";



export default class ChannelEditor extends Component{
  constructor(props){
        super(props);
        this.state={channel:this.buildChannel(this.props.channel)};
  }
  buildChannel(channel){
      var ret={
        title:""
      };
      if(channel){
          ret=Object.assign(ret,channel);
      }
      return ret;
  }
  onError(error){
      this.props.onError(error);
  }

  componentWillReceiveProps(nextProps){
      if(this.state.channel!=nextProps.channel){
          this.setState(Object.assign({}, this.state,{channel:this.buildChannel(nextProps.channel)}));
      }
  }
  setTitle(title){
      var channel=this.state.channel;
      channel=Object.assign(channel,{title});
       this.setState(Object.assign({}, this.state,{channel}));
  }

  updateChannel(){

  }

  cancelEdit(){

  }

render(){
  var title="Create New Channel";
  var buttonLabel="Create";

  if(this.props.menuItemToEdit){
    title="Edit Channel";
    buttonLabel="Update"
  }
  return (
                      <div style={styles.formContainer}>
                          <div style={styles.title}>{title}</div>

                          <div style={styles.formItem}>
                              <label htmlFor="title" style={styles.label}>Title:</label>
                              <input type="text" className="form-control" id="title" placeholder="Menu Title"
                              onChange={(evt) => {
                              this.setTitle(evt.target.value);
                            }} value={this.state.title}/>
                          </div>



                          <div style={styles.footer}>
                            <div style={styles.buttonContainer}>
                                   <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                                            this.updateChannel();
                                        }}>{buttonLabel}</button>
                            </div>
                            <div style={styles.buttonContainer}>

                                <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                                         this.cancelEdit();
                                     }}>Cancel</button>
                            </div>
                          </div>

                      </div>

  );
}


}
