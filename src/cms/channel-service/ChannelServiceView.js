import React, {Component} from 'react'
import {AppHeader,ModalDialog,LoadingIcon} from "../../components";
import {textValues} from "../../configs";
import {api} from "../../api";
import {styles} from "./styles";
import ChannelEditor from "./ChannelEditor";
import ListChannels from "./ListChannels";

var ACTIONS={

    LIST_CHANNELS:0,
    CREATE_CHANNEL:1,
    EDIT_MENU:2
}

export default class ChannelServiceView extends Component{
  constructor(props){
        super(props);
        this.state={modalMessage:null,loading:true, channels:[],action:ACTIONS.LIST_CHANNELS, channelItemToEdit:null};
  }
  setErrorMessage(message){
    var modalMessage={
           title:textValues.cms.channelService.error.title,
           content:message,
           onConfirm:this.onClearMessage.bind(this),
           confirmButton:"Ok",
    }
    this.setState(Object.assign({}, this.state,{modalMessage,loading:false}));
  }
  onError(error){
    console.error(error);
    this.setErrorMessage(""+error);
  }

  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }

componentWillMount(){
      this.loadChannels();
}
loadChannels(){
      var loading=false;
      api.getAllBoxChannels().then(channels=>{
            this.setState(Object.assign({}, this.state,{channels,loading}));
      }).catch(error=>{
          this.setErrorMessage(""+error);
      });
}
onCancel(){
    this.setState(Object.assign({}, this.state,{action:ACTIONS.LIST_CHANNELS}));
}

  onUpdateChannels(channel){
    if(!channel.title){
      this.setErrorMessage(textValues.cms.channelsService.error.missingTitle);
    }
    else{
      this.setState(Object.assign({}, this.state,{loading:true, action:ACTIONS.LIST_CHANNELS}));
      api.updateChannel(channel).then(response=>{
            this.loadChannels();
           }).catch(error=>{
                this.onError(error);
           });
    }

  }

  onDisplayCreateChannelForm(){
    this.setState(Object.assign({}, this.state,{action:ACTIONS.CREATE_CHANNEL}));
  }
  renderCreateChannel(){
      return (<ChannelEditor
        onUpdateChannel={this.onUpdateChannel.bind(this)}
        onCancel={this.onCancel.bind(this)}
        onError={this.onError.bind(this)}/>);
  }
  renderEditChannel(){
       return (<ChannelEditor
                onUpdateChannel={this.onUpdateChannel.bind(this)}
                 channel={this.state.channelToEdit}
                 onCancel={this.onCancel.bind(this)}
                 onError={this.onError.bind(this)}/>);
  }
  editChannel(channelToEdit){
    this.setState(Object.assign({}, this.state,{channelToEdit, action:ACTIONS.EDIT_CHANNEL}));
  }
  renderListChannels(){
      return (<ListChannels channels={this.state.channels}
        onDisplayCreateChannelForm={this.onDisplayCreateChannelForm.bind(this)}
        editChannel={this.editChannel.bind(this)}
        />);
  }
   renderActions(){
        if(this.state.action===ACTIONS.LIST_CHANNELS){
              return this.renderListChannels();

        }
        else if(this.state.action===ACTIONS.CREATE_CHANNEL){
              return this.renderCreateChannel();

        }
        else if(this.state.action===ACTIONS.EDIT_MENU){
            return this.renderEditChannel();

        }
        else{
          return null;
        }
   }

    render(){
      return (
        <div>
            <AppHeader selected="home"/>

            <div style={AppHeader.styles.content}>
                         <LoadingIcon loading={this.state.loading}/>
                         {this.renderActions()}

           </div>
            <ModalDialog message={this.state.modalMessage}/>
        </div>
      );
    }



}
