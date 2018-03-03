import React, {Component} from 'react'
import {AppHeader,ModalDialog,LoadingIcon,BigButton} from "../../components";
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
     var link=textValues.cms.channelService.link+"?channelId="+channel.channelId;
     var label=channel.channelName;
     var imageurl=textValues.cms.channelService.icon2;
     if(channel.carousel && channel.carousel.length>10){
       imageurl=channel.carousel;
     }
     return(
       <BigButton key={index} label={label}
                  content={label}
                  link={link}
                  icon={imageurl}/>
     )

   }
    render(){
      if(this.props.channels!=null && this.props.channels.length>0){
        return (
          <div style={styles.channelsContainer}>
                 <div style={styles.title}>Channels</div>
                 <div style={styles.iconContainer}>
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
