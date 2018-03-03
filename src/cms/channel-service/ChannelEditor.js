import React, {Component} from 'react'
import {AppHeader,ModalDialog,ItemIconList,SelectionModalDialog,LoadingIcon} from "../../components";
import {LoadingScreen} from "../../loading-screen";
import {textValues, localImages} from "../../configs";
import {styles} from "./styles";
import {genericUtil} from "../../utils";
import {api} from "../../api";
import {
  Link

} from 'react-router-dom'


export default class ChannelEditor extends Component{
  constructor(props){
        super(props);
        this.state={channel:this.buildChannel(this.props.channel)};
  }
  buildChannel(channel){
      var ret={
        channelId:"",
        channelName:"",
        title:"",

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
  setChannelValues(values){
    var channel=this.state.channel;
    channel=Object.assign(channel,values);
    this.setState(Object.assign({}, this.state,{channel}));
  }
  updateChannel(){
      this.props.onUpdateChannel(this.state.channel);
  }
  deleteChannel(){
      this.props.onDeleteChannel(this.state.channel);      
  }
  renderDeleteDutton(){
    if(this.props.channel){
      return(
          <div style={styles.deleteButtonContainer}>
                 <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                          this.deleteChannel();
                      }}>DELETE</button>
          </div>
      );
    }
    else{
          return null;
    }

  }


render(){
  var title="Create New Channel";
  var buttonLabel="CREATE";

  if(this.props.channel){
    title="Edit Channel";
    buttonLabel="UPDATE"
  }
  return (
                      <div style={styles.formContainer}>
                          <div style={styles.title}>{title}</div>

                            <div style={styles.formItem}>
                                <label htmlFor="channelId" style={styles.label}>Channel Id:</label>
                                <input type="text" className="form-control" id="channelId" placeholder="Channel ID"
                                onChange={(evt) => {
                                this.setChannelValues({channelId:evt.target.value});
                              }} value={this.state.channel.channelId}/>
                            </div>

                          <div style={styles.formItem}>
                              <label htmlFor="channelName" style={styles.label}>Channel Name:</label>
                              <input type="text" className="form-control" id="channelName" placeholder="Channel Name"
                              onChange={(evt) => {
                              this.setChannelValues({channelName:evt.target.value});
                            }} value={this.state.channel.channelName}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="channelTitle" style={styles.label}>Channel Title:</label>
                              <input type="text" className="form-control" id="channelTitle" placeholder="Channel Title"
                              onChange={(evt) => {
                              this.setChannelValues({title:evt.target.value});
                            }} value={this.state.channel.title}/>
                          </div>


                          <div style={styles.footer}>
                            <div style={styles.buttonContainer}>
                                   <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                                            this.updateChannel();
                                        }}>{buttonLabel}</button>
                            </div>



                            <div style={styles.buttonContainer}>
                                   <Link to={textValues.cms.channelService.link} className="btn btn-primary btn-normal">
                                        CANCEL
                                  </Link>
                            </div>

                            {this.renderDeleteDutton()}





                          </div>

                      </div>

  );
}


}
