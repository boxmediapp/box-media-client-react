import React, {Component} from 'react'
import {AppHeader,ModalDialog,LoadingIcon} from "../../components";
import {textValues} from "../../configs";
import {api} from "../../api";
import {genericUtil} from "../../utils";
import {styles} from "./styles";
import ChannelEditor from "./ChannelEditor";
import ListChannels from "./ListChannels";

var ACTIONS={

    LIST_CHANNELS:0,
    CREATE_CHANNEL:1,
    EDIT_CHANNEL:2
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
      this.processQueryParameters(this.props);
}

componentWillReceiveProps(nextprops){
    this.processQueryParameters(nextprops);
}
processQueryParameters(props){
    console.log("process Query parameters");
    var loading=false;
    var channelId=null;
    var createNew=null;
    if(props && props.location && props.location.search){
        channelId=genericUtil.getQueryParam(props.location.search, "channelId");
        createNew=genericUtil.getQueryParam(props.location.search, "createNew");
    }
    if(channelId){
        api.getABoxChannel(channelId).then(channelToEdit=>{
            this.setState(Object.assign({}, this.state,{loading,channelToEdit, action:ACTIONS.EDIT_CHANNEL}));
        }).catch(error=>{
            this.onError(error);
        });
        return;
    }
    else{
      api.getAllBoxChannels().then(channels=>{
              if(createNew){
                  this.setState(Object.assign({}, this.state,{loading,channels,action:ACTIONS.CREATE_CHANNEL}));
              }
              else{
                  this.setState(Object.assign({}, this.state,{loading,channels,action:ACTIONS.LIST_CHANNELS}));
              }

        }).catch(error=>{
            this.setErrorMessage(""+error);
        });

    }





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
onDeleteChannel(channel){
  var modalMessage={
         title:textValues.cms.channelService.confirmDelete.title,
         content:textValues.cms.channelService.confirmDelete.content+channel.channelName,
         onConfirm:()=>{
            this.deleteChannel(channel)
              },
         onCancel:this.onClearMessage.bind(this),
         cancelButton:textValues.cms.channelService.confirmDelete.cancelButton,
         confirmButton:textValues.cms.channelService.confirmDelete.confirmButton,
  }
  this.setState(Object.assign({}, this.state,{modalMessage,loading:false}));
}
deleteChannel(channel){
      if(channel && channel.channelId){
          this.setState(Object.assign({}, this.state,{loading:true}));
          api.deleteBoxChannel(channel).then(response=>{
              this.setState(Object.assign({}, this.state,{loading:false}));
              genericUtil.redirect(textValues.cms.channelService.link);
          }).catch(error=>{
              this.onError(error);
          });

      }
      else{
        console.error("cannot delete empty channel");
      }

}
  onUpdateChannel(channel){
    if(!channel.channelId){
      this.setErrorMessage(textValues.cms.channelsService.error.channelId);
    }
    else if(!channel.channelName){
      this.setErrorMessage(textValues.cms.channelsService.error.channelName);
    }
    else{
      this.setState(Object.assign({}, this.state,{loading:true, action:ACTIONS.LIST_CHANNELS}));
      api.updateBoxChannel(channel).then(response=>{
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
        onError={this.onError.bind(this)}/>);
  }
  renderEditChannel(){
       return (<ChannelEditor
                  onUpdateChannel={this.onUpdateChannel.bind(this)}
                  channel={this.state.channelToEdit}
                 onError={this.onError.bind(this)}
                 onDeleteChannel={this.onDeleteChannel.bind(this)}/>);
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
        else if(this.state.action===ACTIONS.EDIT_CHANNEL){
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
