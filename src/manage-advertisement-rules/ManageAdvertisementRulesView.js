import React, {Component} from 'react'

import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";
import {styles} from "./styles";


import {AppHeader,ModalDialog,TextFieldWithToolTip,SelectWithToolTip} from "../components";

export default class ManageAdvertisementRulesView extends Component{
  constructor(props){
    super(props);
    this.state={rules:[], modalMessage:null};
    this.loadAdvertRules();
  }


  loadAdvertRules(){
    api.loadAdvertRules().then(rules =>{
           this.setRules(rules);
     });
  }
  setRules(rules){
    this.setState(Object.assign({}, this.state,{rules}));
  }
  updateAdvertRule(rule){
        var rules=this.state.rules.map(r=>{
            if(r.id==rule.id){
                  return rule;
            }
            else{
              return r;
            }
        });
      api.updateAdvertRule(rule).then(response=>{
          this.loadAdvertRules();
      });
  }
  addNewRule(rule){
    var rules=[...this.state.rules,rule];
    this.setState(Object.assign({}, this.state,{rules}));
    api.addAdvertRule(rule).then(response=>{
        this.loadAdvertRules();
    });
  }
  onDelete(rule){
      if(rule.id){
        var rules=this.state.rules.filter(r=>r.id!==rule.id);
        this.setState(Object.assign({}, this.state,{rules}));
        api.removeAdvertRule(rule).then(response=>{
            this.loadAdvertRules();
        });
      }
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
  render(){

      return (
        <div>
          <AppHeader selected="admin"/>
            <div style={AppHeader.styles.content}>
                <h1>Advertisement Settings</h1>
               <div style={styles.rulesContainer}>
                    {
                       this.state.rules.map(rule=><EditAdvertRule title={textValues.manageAdvertRules.edit.title} buttonText={textValues.manageAdvertRules.edit.buttonText} rule={rule} key={rule.id} onSubmit={this.updateAdvertRule.bind(this)} onDelete={this.onDelete.bind(this)}/>)
                    }

                <EditAdvertRule title={textValues.manageAdvertRules.add.title} buttonText={textValues.manageAdvertRules.add.buttonText} rule={textValues.manageAdvertRules.defaultValues} onSubmit={this.addNewRule.bind(this)}/>
                </div>
           </div>
             <ModalDialog message={this.state.modalMessage}/>
        </div>
      );

  }


}

class EditAdvertRule extends Component{
    constructor(props){
      super(props);
      var rule=this.props.rule;
      this.state=Object.assign({},rule);
    }
    setAdvertBreakType(advertBreakType){
        this.setState(Object.assign({}, this.state,{advertBreakType}));
    }
    setNumberOfAdsPerBreak(numberOfAdsPerBreak){
      this.setState(Object.assign({}, this.state,{numberOfAdsPerBreak}));
    }
    setAdvertLength(advertLength){
        this.setState(Object.assign({}, this.state,{advertLength}));
    }
    setContentType(contentType){
        this.setState(Object.assign({}, this.state,{contentType}));
    }
    setContentMinimumDuration(contentMinimumDuration){
        this.setState(Object.assign({}, this.state,{contentMinimumDuration}));
    }
    setContentMaximumDuration(contentMaximumDuration){
        this.setState(Object.assign({}, this.state,{contentMaximumDuration}));
    }

    render(){

        var {id,advertBreakType,numberOfAdsPerBreak,advertLength,contentType,
          contentMinimumDuration,contentMaximumDuration}=this.state;


        return(
              <div style={styles.advertRuleItem}>
                    <h4>{this.props.title}</h4>
                    <div className="content advertRuleContainer">
                        <div className="row">

                                    <SelectWithToolTip fieldId={'advertBreakType'+id}
                                        options={textValues.manageAdvertRules.advertBreakType.options}
                                        colSize={4}
                                        label={textValues.manageAdvertRules.advertBreakType.label}
                                        help={textValues.manageAdvertRules.advertBreakType.help}
                                        value={advertBreakType} onChange={this.setAdvertBreakType.bind(this)}/>

                                    <TextFieldWithToolTip fieldId={'numberOfAdsPerBreak'+id}
                                        colSize={3}
                                        label={textValues.manageAdvertRules.numberOfAdsPerBreak.label}
                                        help={textValues.manageAdvertRules.numberOfAdsPerBreak.help}
                                        value={numberOfAdsPerBreak} onChange={this.setNumberOfAdsPerBreak.bind(this)}/>


                        </div>

                        <div className="row formFieldWithLabel">
                                    <SelectWithToolTip fieldId={'advertLength'+id}
                                              options={textValues.manageAdvertRules.advertLength.options}
                                              colSize={6}
                                              label={textValues.manageAdvertRules.advertLength.label}
                                              help={textValues.manageAdvertRules.advertLength.help}
                                              value={advertLength} onChange={this.setAdvertLength.bind(this)}/>

                                            <SelectWithToolTip fieldId={'contentType'+id}
                                                        options={textValues.manageAdvertRules.contentType.options}
                                                        colSize={4}
                                                        label={textValues.manageAdvertRules.contentType.label}
                                                        help={textValues.manageAdvertRules.contentType.help}
                                                        value={contentType} onChange={this.setContentType.bind(this)}/>
                        </div>
                        <div className="row formFieldWithLabel">
                                      <TextFieldWithToolTip fieldId={'contentMinimumDuration'+id}
                                          colSize={6}
                                          label={textValues.manageAdvertRules.contentMinimumDuration.label}
                                          help={textValues.manageAdvertRules.contentMinimumDuration.help}
                                          value={contentMinimumDuration} onChange={this.setContentMinimumDuration.bind(this)}/>

                        </div>
                        <div className="row formFieldWithLabel">
                                <TextFieldWithToolTip fieldId={'contentMaximumDuration'+id}
                                    colSize={6}
                                    label={textValues.manageAdvertRules.contentMaximumDuration.label}
                                    help={textValues.manageAdvertRules.contentMaximumDuration.help}
                                    value={contentMaximumDuration} onChange={this.setContentMaximumDuration.bind(this)}/>
                        </div>
                        <div style={styles.buttonsContainer}>
                              <button type="button" className="btn btn-primary btn-normal advertRuleButton" onClick={(evt) => {
                                    this.props.onSubmit(this.state);
                                }}>{this.props.buttonText}</button>
                              <DeleteButton  rule={this.state} onDelete={this.props.onDelete}/>
                        </div>
                  </div>
              </div>
          );

  }



}

class DeleteButton extends Component{
    render(){
        if(this.props.rule.id){
          return (

              <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                  this.props.onDelete(this.props.rule);
              }}>Delete</button>
            );
        }
        else{
          return null;
        }

    }

}
