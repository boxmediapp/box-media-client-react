import React, {Component} from 'react'
import {styles} from "./styles";
import {LoadingIcon} from "../components";
export default class DisplayVideoObject extends Component{
  constructor(props){
    super(props);
    this.onTimeUpdate=this.onTimeUpdate.bind(this);
    this.state={buffering:false};
  }
  onTimeUpdate(){
      var currentTime=this.videoObject.currentTime;

      if(this.state.buffering){
          this.setState({buffering:false});
      }
      this.props.onTimeUpdate(currentTime);
  }
  setCurrentTime(currentTime){
        if(this.videoObject.currentTime!==currentTime){
              this.videoObject.pause();
              this.videoObject.currentTime=currentTime;
              this.setState({buffering:true});
        }
  }
  getCurrentTime(){
    return this.videoObject.currentTime;
  }
  pause(){
    this.videoObject.pause();
  }

  componentDidMount(){
      this.videoObject.addEventListener("timeupdate", this.onTimeUpdate);
  }
  componentWillUnmount() {
      this.videoObject.removeEventListener("timeupdate", this.onTimeUpdate);
  }

  onFF(){
        this.videoObject.currentTime=this.videoObject.currentTime+1/60;
  }
  onRW(){
        this.videoObject.currentTime=this.videoObject.currentTime-1/60;
  }

  renderLoading(){
    if(this.state.buffering){
        return (<LoadingIcon loading={true}/>)
    }
  }
  render(){
    return (
      <div style={styles.videoPlayerContainer}>
                {this.renderLoading()}
                <video id="videoPlayer" ref={elem=>this.videoObject=elem} controls>
                    <source type="video/mp4" src={this.props.url}/>
                </video>
                <div style={styles.playerFooter}>
                    <div style={styles.buttonContainer}>
                          <a className="btn btn-primary btn-normal" onClick={this.onFF.bind(this)}>
                              <div style={styles.buttonLabel}>FF</div>
                          </a>
                    </div>
                    <div style={styles.buttonContainer}>
                          <a className="btn btn-primary btn-normal" onClick={this.onRW.bind(this)}>
                              <div style={styles.buttonLabel}>RW</div>
                          </a>
                   </div>
            </div>
      </div>
    );

  }

}
