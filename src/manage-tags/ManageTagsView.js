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

export default class ManageTagsView extends Component{
  constructor(props){
    super(props);
    this.state={tags:[], modalMessage:null, newtag:""};
    this.loadTags();
  }

  loadTags(){
    api.loadTags().then(tags =>{
           this.setTags(tags);
     });
  }
  setTags(tags){
    this.setState(Object.assign({}, this.state,{tags}));
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
  setNewTag(newtag){
    this.setState(Object.assign({}, this.state,{newtag}));
  }
  addNewTag(){
    if(this.state.newtag){
      api.addNewTag(this.state.newtag).then(response =>{
             this.loadTags();
      });
    }


  }
  onDelete(tag){
    if(tag){
      var tags=this.state.tags.filter(t=>t!==tag);
      this.setState(Object.assign({}, this.state,{tags}));
      api.removeTag(tag).then(response =>{
             this.loadTags();
      });
    }
  }
  render(){

      return (
        <div>
          <AppHeader selected="admin"/>
            <div style={AppHeader.styles.content}>
                <h1>Available tags</h1>
               <div style={styles.tagsContainer}>
                    <ListTags tags={this.state.tags} onDelete={this.onDelete.bind(this)}/>
                </div>
                <div className="row appconfigEditRow">
                      <TextFieldWithToolTip fieldId="addNewTag" className="addNewTagContainer"
                                colSize={4}
                                label={textValues.manageTags.addNewTag.label}
                                help={textValues.manageTags.addNewTag.help}
                                value={this.state.newtag}
                                onChange={this.setNewTag.bind(this)}/>
                              <div className="col-sm-6">
                                <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                                    this.addNewTag();
                                  }}>Add</button>
                              </div>
                </div>
           </div>

             <ModalDialog message={this.state.modalMessage}/>

        </div>
      );

  }
}

class ListTags extends Component{
     renderTags(tag){
       var {onDelete}=this.props;
       return(

               <div key={tag} style={styles.tagRow}>

                      <div style={styles.tagContaineer}>{tag}


                            <button style={styles.deleteAction} onClick={evt=>{
                                  onDelete(tag);
                              }}>delete</button>


                      </div>

               </div>


       );

     }
     render(){
        if(this.props.tags||this.props.tags.length>0){
          return this.props.tags.map(this.renderTags.bind(this));
        }
        else{
          return null;
        }
     }
}
