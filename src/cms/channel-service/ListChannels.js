import React, {Component} from 'react'
import {AppHeader,ModalDialog,LoadingIcon} from "../../components";
import {textValues} from "../../configs";
import {api} from "../../api";
import {styles} from "./styles";



export default class ListChannels extends Component{
   createChannel(){
     this.props.onDisplayCreateChannelForm();
   }
   editChannel(channel){
      this.props.editChannel(channel);
   }
   renderChannel(channel,index){
     return(
       <div key={index} style={styles.channelRecord}>
        <a onClick={evt=>{
            this.editChannel(channel);
        }} style={styles.channellink}>{channel.channelName}</a>
       </div>
     )

   }
    render(){
      if(this.props.channels!=null && this.props.channels.length>0){
        return (
          <div style={styles.channelsContainer}>
                 <div style={styles.title}>Channels</div>
                 <div style={styles.channelList}>
                      {this.props.channels.map(this.renderChannel.bind(this))}
                 </div>
                 <div style={styles.footer}>
                    <div style={styles.buttonContainer}>
                         <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                                this.createChannel();
                          }}>Create</button>
                    </div>
                  </div>

          </div>
        );
      }
      else{
        return null;
      }

    }

}
