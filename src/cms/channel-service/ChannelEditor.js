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

                          <div style={styles.formItem}>
                              <label htmlFor="channel_path" style={styles.label}>Channel Path:</label>
                              <input type="text" className="form-control" id="stream" placeholder="Channel Path"
                              onChange={(evt) => {
                              this.setChannelValues({channel_path:evt.target.value});
                            }} value={this.state.channel.channel_path}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="stream" style={styles.label}>Stream URL:</label>
                              <input type="text" className="form-control" id="stream" placeholder="Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({stream:evt.target.value});
                            }} value={this.state.channel.stream}/>
                          </div>


                          <div style={styles.formItem}>
                              <label htmlFor="mobile_stream" style={styles.label}>Mobile Stream URL:</label>
                              <input type="text" className="form-control" id="mobile_stream" placeholder="Mobile Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({mobile_stream:evt.target.value});
                            }} value={this.state.channel.mobile_stream}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="tv_stream" style={styles.label}>TV Stream URL:</label>
                              <input type="text" className="form-control" id="tv_stream" placeholder="TV Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({tv_stream:evt.target.value});
                            }} value={this.state.channel.tv_stream}/>
                          </div>


                          <div style={styles.formItem}>
                              <label htmlFor="web_stream" style={styles.label}>Web Stream URL:</label>
                              <input type="text" className="form-control" id="web_stream" placeholder="Web Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({web_stream:evt.target.value});
                            }} value={this.state.channel.web_stream}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="ios_stream" style={styles.label}>iOS Stream URL:</label>
                              <input type="text" className="form-control" id="ios_stream" placeholder="iOS Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({ios_stream:evt.target.value});
                            }} value={this.state.channel.ios_stream}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="android_stream" style={styles.label}>Android Stream URL:</label>
                              <input type="text" className="form-control" id="android_stream" placeholder="Android Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({android_stream:evt.target.value});
                            }} value={this.state.channel.android_stream}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="roku_stream" style={styles.label}>Roku Stream URL:</label>
                              <input type="text" className="form-control" id="roku_stream" placeholder="Roku Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({roku_stream:evt.target.value});
                            }} value={this.state.channel.roku_stream}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="nowtv_stream" style={styles.label}>Now TV Stream URL:</label>
                              <input type="text" className="form-control" id="nowtv_stream" placeholder="Now TV Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({nowtv_stream:evt.target.value});
                            }} value={this.state.channel.nowtv_stream}/>
                          </div>


                          <div style={styles.formItem}>
                              <label htmlFor="eetv_stream" style={styles.label}>EE Stream URL:</label>
                              <input type="text" className="form-control" id="eetv_stream" placeholder="EE Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({eetv_stream:evt.target.value});
                            }} value={this.state.channel.eetv_stream}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="firetv_stream" style={styles.label}>Fire TV Stream URL:</label>
                              <input type="text" className="form-control" id="firetv_stream" placeholder="Fire TV Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({firetv_stream:evt.target.value});
                            }} value={this.state.channel.firetv_stream}/>
                          </div>


                          <div style={styles.formItem}>
                              <label htmlFor="xbox_stream" style={styles.label}>Xbox Stream URL:</label>
                              <input type="text" className="form-control" id="xbox_stream" placeholder="Xbox Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({xbox_stream:evt.target.value});
                            }} value={this.state.channel.xbox_stream}/>
                          </div>


                          <div style={styles.formItem}>
                              <label htmlFor="playstation_stream" style={styles.label}>PlayStation Stream URL:</label>
                              <input type="text" className="form-control" id="playstation_stream" placeholder="PlayStation Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({playstation_stream:evt.target.value});
                            }} value={this.state.channel.playstation_stream}/>
                          </div>


                          <div style={styles.formItem}>
                              <label htmlFor="lgtv_stream" style={styles.label}>LG TV Stream URL:</label>
                              <input type="text" className="form-control" id="lgtv_stream" placeholder="LG TV Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({lgtv_stream:evt.target.value});
                            }} value={this.state.channel.lgtv_stream}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="samsung_stream" style={styles.label}>Samsung Stream URL:</label>
                              <input type="text" className="form-control" id="samsung_stream" placeholder="Samsung Stream URL"
                              onChange={(evt) => {
                              this.setChannelValues({samsung_stream:evt.target.value});
                            }} value={this.state.channel.samsung_stream}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="carousel" style={styles.label}>Carousel Image URL:</label>
                              <input type="text" className="form-control" id="carousel" placeholder="Carousel Image URL"
                              onChange={(evt) => {
                              this.setChannelValues({carousel:evt.target.value});
                            }} value={this.state.channel.carousel}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="player_focus" style={styles.label}>Player Focus Image URL:</label>
                              <input type="text" className="form-control" id="player_focus" placeholder="Player Focus Image URL"
                              onChange={(evt) => {
                              this.setChannelValues({player_focus:evt.target.value});
                            }} value={this.state.channel.player_focus}/>
                          </div>


                          <div style={styles.formItem}>
                              <label htmlFor="player_blur" style={styles.label}>Player Blur Image URL:</label>
                              <input type="text" className="form-control" id="player_blur" placeholder="Player Blur Image URL"
                              onChange={(evt) => {
                              this.setChannelValues({player_blur:evt.target.value});
                            }} value={this.state.channel.player_blur}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="schedule_focus" style={styles.label}>Schedule Focus Image URL:</label>
                              <input type="text" className="form-control" id="schedule_focus" placeholder="Schedule Focus Image URL"
                              onChange={(evt) => {
                              this.setChannelValues({schedule_focus:evt.target.value});
                            }} value={this.state.channel.schedule_focus}/>
                          </div>

                          <div style={styles.formItem}>
                              <label htmlFor="schedule_blur" style={styles.label}>Schedule Blur Image URL:</label>
                              <input type="text" className="form-control" id="schedule_blur" placeholder="Schedule Blur Image URL"
                              onChange={(evt) => {
                              this.setChannelValues({schedule_blur:evt.target.value});
                            }} value={this.state.channel.schedule_blur}/>
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
