import React, {Component} from 'react'
import {api} from "../api";

import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import {Table, Column, Cell} from "fixed-data-table-2";

import {textValues,config} from "../configs";
import {AppHeader,ModalDialog,TextFieldWithToolTip,SelectWithToolTip} from "../components";

import {styles} from "./styles";
import  "./styles/index.css";
import {appdata} from "../store";

import {genericUtil} from "../utils";


export  default class ManageAppConfigView extends Component {
    constructor(props){
      super(props);
      var appconfig=appdata.getAppConfig();
      this.state=Object.assign({},this.buildAppConfigStateData(appconfig), {modalMessage:null});
    }
    buildAppConfigStateData(appconfig){
      var {recordLimit,visibilityCategory,autoYearsAvailability,autoSetGeoAllowedCountries,autoSetContentType,
        autoSetTxChannel,autoSetPublishedStatus,autoCreatePlaceHolder,brightcoveStatus,publishProgrammeInfo,
        autoTranscode,imagetemplateurl,convertImage,sendUpdateToSoundMouse,s3videoURL,awsRegion,videoBucket,
        imageBucket,imageMasterFolder,imagePublicFolder,s3imagesURL,imageUrlAliases,requiredFields,transcodeSourceBucket,transcodeDestBucket,transcodeDestFileNamePrefix}=appconfig;
      if(typeof recordLimit ==='undefined'){
        recordLimit="";
      }
      if(typeof visibilityCategory ==='undefined'){
        visibilityCategory="";
      }
      if(typeof autoYearsAvailability ==='undefined'){
        autoYearsAvailability="";
      }
      if(typeof autoSetGeoAllowedCountries ==='undefined'){
        autoSetGeoAllowedCountries="";
      }
      if(typeof autoSetContentType ==='undefined'){
        autoSetContentType="";
      }
      if(typeof autoSetTxChannel ==='undefined'){
        autoSetTxChannel="";
      }
      if(typeof autoSetPublishedStatus ==='undefined'){
        autoSetPublishedStatus="";
      }

      if(!autoCreatePlaceHolder){
          autoCreatePlaceHolder="false";
      }
      else{
          autoCreatePlaceHolder="true";
      }

      if(!brightcoveStatus){
          brightcoveStatus="false";
      }
      else{
          brightcoveStatus="true";
      }

      if(!publishProgrammeInfo){
          publishProgrammeInfo="false";
      }
      else{
          publishProgrammeInfo="true";
      }
      if(!autoTranscode){
          autoTranscode="false";
      }
      else{
          autoTranscode="true";
      }

      if(typeof imagetemplateurl ==='undefined'){
        imagetemplateurl="";
      }
      if(!convertImage){
          convertImage="false";
      }
      else{
          convertImage="true";
      }
      if(!sendUpdateToSoundMouse){
          sendUpdateToSoundMouse="false";
      }
      else{
          sendUpdateToSoundMouse="true";
      }
      if(typeof s3videoURL ==='undefined'){
        s3videoURL="";
      }
      if(typeof awsRegion ==='undefined'){
        awsRegion="";
      }
      if(typeof videoBucket ==='undefined'){
        videoBucket="";
      }
      if(typeof imageBucket ==='undefined'){
        imageBucket="";
      }
      if(typeof imageMasterFolder ==='undefined'){
        imageMasterFolder="";
      }
      if(typeof imagePublicFolder ==='undefined'){
        imagePublicFolder="";
      }
      if(typeof s3imagesURL ==='undefined'){
        s3imagesURL="";
      }
      if(typeof imageUrlAliases ==='undefined'){
        imageUrlAliases="";
      }
      if(typeof requiredFields ==='undefined'){
        requiredFields="";
      }
      if(typeof transcodeSourceBucket ==='undefined'){
        transcodeSourceBucket="";
      }
      if(typeof transcodeDestBucket ==='undefined'){
        transcodeDestBucket="";
      }
      if(typeof transcodeDestFileNamePrefix ==='undefined'){
        transcodeDestFileNamePrefix="";
      }

      return {recordLimit,visibilityCategory,autoYearsAvailability,autoSetGeoAllowedCountries,autoSetContentType,autoSetTxChannel,
        autoSetPublishedStatus,autoCreatePlaceHolder,brightcoveStatus,publishProgrammeInfo,autoTranscode,imagetemplateurl,convertImage,sendUpdateToSoundMouse,s3videoURL,awsRegion,videoBucket,imageBucket,imageMasterFolder,imagePublicFolder,
        s3imagesURL,imageUrlAliases,requiredFields,transcodeSourceBucket,transcodeDestBucket,transcodeDestFileNamePrefix};
    }
    updateAppConfig(){
      var {recordLimit,visibilityCategory,autoYearsAvailability,autoSetGeoAllowedCountries,autoSetContentType,autoSetTxChannel,
        autoSetPublishedStatus,autoCreatePlaceHolder,brightcoveStatus,publishProgrammeInfo,autoTranscode,imagetemplateurl,convertImage,sendUpdateToSoundMouse,s3videoURL,awsRegion,videoBucket,imageBucket,imageMasterFolder,imagePublicFolder,
        s3imagesURL,imageUrlAliases,requiredFields,transcodeSourceBucket,transcodeDestBucket,transcodeDestFileNamePrefix}=this.state;
      if(!recordLimit){
        recordLimit=200;
      }
      else{
          recordLimit=parseInt(recordLimit);
      }
      if(!visibilityCategory){
        visibilityCategory=null;
      }

      if(autoYearsAvailability===""){
        autoYearsAvailability=null;
      }
      else{
          autoYearsAvailability=parseInt(autoYearsAvailability);
      }
      if(!autoSetGeoAllowedCountries){
        autoSetGeoAllowedCountries=null;
      }
      if(!autoSetContentType){
        autoSetContentType=null;
      }
      if(!autoSetTxChannel){
        autoSetTxChannel=null;
      }
      if(!autoSetPublishedStatus){
        autoSetPublishedStatus=null;
      }
      if((!autoCreatePlaceHolder) || autoCreatePlaceHolder==='false'){
        autoCreatePlaceHolder=false;
      }
      else if(autoCreatePlaceHolder==='true'){
        autoCreatePlaceHolder=true;
      }

      if((!brightcoveStatus) || brightcoveStatus==='false'){
        brightcoveStatus=false;
      }
      else if(brightcoveStatus==='true'){
        brightcoveStatus=true;
      }
      if((!publishProgrammeInfo) || publishProgrammeInfo==='false'){
        publishProgrammeInfo=false;
      }
      else if(publishProgrammeInfo==='true'){
        publishProgrammeInfo=true;
      }

      if((!autoTranscode) || autoTranscode==='false'){
        autoTranscode=false;
      }
      else if(autoTranscode==='true'){
        autoTranscode=true;
      }
      if(!imagetemplateurl){
        imagetemplateurl=null;
      }
      if((!convertImage) || convertImage==='false'){
        convertImage=false;
      }
      else if(convertImage==='true'){
        convertImage=true;
      }

      if((!sendUpdateToSoundMouse) || sendUpdateToSoundMouse==='false'){
        sendUpdateToSoundMouse=false;
      }
      else if(sendUpdateToSoundMouse==='true'){
        sendUpdateToSoundMouse=true;
      }
      if(!s3videoURL){
        s3videoURL=null;
      }
      if(!awsRegion){
        awsRegion=null;
      }
      if(!videoBucket){
        videoBucket=null;
      }

      if(!imageBucket){
        imageBucket=null;
      }
      if(!imageMasterFolder){
        imageMasterFolder=null;
      }
      if(!imagePublicFolder){
        imagePublicFolder=null;
      }
      if(!s3imagesURL){
        s3imagesURL=null;
      }
      if(!imageUrlAliases){
        imageUrlAliases=null;
      }
      if(!requiredFields){
        requiredFields=null;
      }
      if(!transcodeSourceBucket){
        transcodeSourceBucket=null;
      }
      if(!transcodeDestBucket){
        transcodeDestBucket=null;
      }
      if(!transcodeDestFileNamePrefix){
        transcodeDestFileNamePrefix=null;
      }

      var appconfig=appdata.getAppConfig();
      appconfig=Object.assign(appconfig,{recordLimit,visibilityCategory,autoYearsAvailability,autoYearsAvailability,
        autoSetGeoAllowedCountries,autoSetContentType,autoSetTxChannel,autoCreatePlaceHolder,brightcoveStatus,
        publishProgrammeInfo,autoTranscode,imagetemplateurl,convertImage,sendUpdateToSoundMouse,s3videoURL,awsRegion,videoBucket,imageBucket,
        imageMasterFolder,imagePublicFolder,s3imagesURL,imageUrlAliases,requiredFields,transcodeSourceBucket,transcodeDestBucket,transcodeDestFileNamePrefix});
      api.updateConfig(appconfig).then(response=>{
          this.loadAppConfig();
      });

    }
    componentWillMount(){
        this.loadAppConfig();
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
    loadAppConfig(){
      api.loadConfig().then(appconfig=>{
          appdata.setAppConfig(appconfig);
          this.setState(Object.assign({},this.state,this.buildAppConfigStateData(appconfig)));
      }).catch((err)=>{
           this.setErrorMessage("failed to load the appinfo:"+err.stack);
      })
    }
    setRecordLimit(recordLimit){
        this.setState(Object.assign({},this.state,{recordLimit}));
    }
    setVisibilityCategory(visibilityCategory){
      this.setState(Object.assign({},this.state,{visibilityCategory}));
    }

    setAutoYearsAvailability(autoYearsAvailability){
      this.setState(Object.assign({},this.state,{autoYearsAvailability}));
    }
    setAutoSetGeoAllowedCountries(autoSetGeoAllowedCountries){
      this.setState(Object.assign({},this.state,{autoSetGeoAllowedCountries}));
    }
    setAutoSetContentType(autoSetContentType){
      this.setState(Object.assign({},this.state,{autoSetContentType}));
    }
    setAutoSetTxChannel(autoSetTxChannel){
      this.setState(Object.assign({},this.state,{autoSetTxChannel}));
    }
    setAutoSetPublishedStatus(autoSetPublishedStatus){
      this.setState(Object.assign({},this.state,{autoSetPublishedStatus}));
    }
    setAutoCreatePlaceHolder(autoCreatePlaceHolder){
      this.setState(Object.assign({},this.state,{autoCreatePlaceHolder}));
    }
    setBrightcoveStatus(brightcoveStatus){
      this.setState(Object.assign({},this.state,{brightcoveStatus}));
    }
    setPublishProgrammeInfo(publishProgrammeInfo){
      this.setState(Object.assign({},this.state,{publishProgrammeInfo}));
    }
    setAutoTranscode(autoTranscode){
      this.setState(Object.assign({},this.state,{autoTranscode}));
    }
    setImagetemplateurl(imagetemplateurl){
      this.setState(Object.assign({},this.state,{imagetemplateurl}));
    }
    setConvertImage(convertImage){
      this.setState(Object.assign({},this.state,{convertImage}));
    }

    setSendUpdateToSoundMouse(sendUpdateToSoundMouse){
      this.setState(Object.assign({},this.state,{sendUpdateToSoundMouse}));
    }
    setS3videoURL(s3videoURL){
      this.setState(Object.assign({},this.state,{s3videoURL}));

    }
    setAwsRegion(awsRegion){
        this.setState(Object.assign({},this.state,{awsRegion}));
    }
    setVideoBucket(videoBucket){
      this.setState(Object.assign({},this.state,{videoBucket}));
    }
    setImageBucket(imageBucket){
      this.setState(Object.assign({},this.state,{imageBucket}));
    }
    setImageMasterFolder(imageMasterFolder){
      this.setState(Object.assign({},this.state,{imageMasterFolder}));
    }
    setImagePublicFolder(imagePublicFolder){
        this.setState(Object.assign({},this.state,{imagePublicFolder}));
    }
    setS3imagesURL(s3imagesURL){
        this.setState(Object.assign({},this.state,{s3imagesURL}));
    }
    setImageUrlAliases(imageUrlAliases){
      this.setState(Object.assign({},this.state,{imageUrlAliases}));
    }
    setRequiredFields(requiredFields){
      this.setState(Object.assign({},this.state,{requiredFields}));
    }
    setTranscodeSourceBucket(transcodeSourceBucket){
      this.setState(Object.assign({},this.state,{transcodeSourceBucket}));
    }
    setTranscodeDestBucket(transcodeDestBucket){
      this.setState(Object.assign({},this.state,{transcodeDestBucket}));
    }
    setTranscodeDestFileNamePrefix(transcodeDestFileNamePrefix){
      this.setState(Object.assign({},this.state,{transcodeDestFileNamePrefix}));
    }

    render(){
      var {recordLimit,visibilityCategory,autoYearsAvailability,autoSetGeoAllowedCountries,autoSetContentType,
        autoSetTxChannel,autoSetPublishedStatus,autoCreatePlaceHolder,brightcoveStatus,
        publishProgrammeInfo,autoTranscode,imagetemplateurl,convertImage,sendUpdateToSoundMouse,
        s3videoURL,awsRegion,videoBucket,imageBucket,imageMasterFolder,imagePublicFolder,s3imagesURL,
        imageUrlAliases,requiredFields,transcodeSourceBucket,transcodeDestBucket,transcodeDestFileNamePrefix}=this.state;


        return (
          <div>
            <AppHeader selected="admin"/>

              <div style={AppHeader.styles.content}>
                      <div className="row appconfigEditRow">

                                        <TextFieldWithToolTip fieldId="recordLimit"
                                              colSize={4}
                                              label={textValues.appConfig.recordLimit.label}
                                              help={textValues.appConfig.recordLimit.help}
                                              value={recordLimit} onChange={this.setRecordLimit.bind(this)}/>

                                        <TextFieldWithToolTip fieldId="visibilityCategory"
                                                    colSize={4}
                                                    label={textValues.appConfig.visibilityCategory.label}
                                                    help={textValues.appConfig.visibilityCategory.help}
                                                    value={visibilityCategory}
                                                    onChange={this.setVisibilityCategory.bind(this)}/>

                                        <TextFieldWithToolTip fieldId="autoYearsAvailability"
                                                    colSize={4}
                                                    label={textValues.appConfig.autoYearsAvailability.label}
                                                    help={textValues.appConfig.autoYearsAvailability.help}
                                                    value={autoYearsAvailability}
                                                    onChange={this.setAutoYearsAvailability.bind(this)}/>

                        </div>
                        <div className="row appconfigEditRow">
                            <TextFieldWithToolTip fieldId="autoSetGeoAllowedCountries"
                              colSize={4}
                              label={textValues.appConfig.autoSetGeoAllowedCountries.label}
                              help={textValues.appConfig.autoSetGeoAllowedCountries.help}
                              value={autoSetGeoAllowedCountries} onChange={this.setAutoSetGeoAllowedCountries.bind(this)}/>

                              <TextFieldWithToolTip fieldId="autoSetContentType"
                                colSize={4}
                                label={textValues.appConfig.autoSetContentType.label}
                                help={textValues.appConfig.autoSetContentType.help}
                                value={autoSetContentType} onChange={this.setAutoSetContentType.bind(this)}/>

                                <TextFieldWithToolTip fieldId="autoSetTxChannel"
                                  colSize={4}
                                  label={textValues.appConfig.autoSetTxChannel.label}
                                  help={textValues.appConfig.autoSetTxChannel.help}
                                  value={autoSetTxChannel} onChange={this.setAutoSetTxChannel.bind(this)}/>


                        </div>
                        <div className="row appconfigEditRow">
                                <TextFieldWithToolTip fieldId="autoSetPublishedStatus"
                                  colSize={4}
                                  label={textValues.appConfig.autoSetPublishedStatus.label}
                                  help={textValues.appConfig.autoSetPublishedStatus.help}
                                  value={autoSetPublishedStatus} onChange={this.setAutoSetPublishedStatus.bind(this)}/>

                                  <SelectWithToolTip fieldId="autoCreatePlaceHolder"
                                    options={textValues.appConfig.autoCreatePlaceHolder.options}
                                    colSize={4}
                                    label={textValues.appConfig.autoCreatePlaceHolder.label}
                                    help={textValues.appConfig.autoCreatePlaceHolder.help}
                                    value={autoCreatePlaceHolder} onChange={this.setAutoCreatePlaceHolder.bind(this)}/>

                                    <SelectWithToolTip fieldId="brightcoveStatus"
                                      options={textValues.appConfig.brightcoveStatus.options}
                                      colSize={4}
                                      label={textValues.appConfig.brightcoveStatus.label}
                                      help={textValues.appConfig.brightcoveStatus.help}
                                      value={brightcoveStatus} onChange={this.setBrightcoveStatus.bind(this)}/>

                        </div>
                          <div className="row appconfigEditRow">
                                <SelectWithToolTip fieldId="publishProgrammeInfo"
                                  options={textValues.appConfig.publishProgrammeInfo.options}
                                  colSize={4}
                                  label={textValues.appConfig.publishProgrammeInfo.label}
                                  help={textValues.appConfig.publishProgrammeInfo.help}
                                  value={publishProgrammeInfo} onChange={this.setPublishProgrammeInfo.bind(this)}/>

                                  <SelectWithToolTip fieldId="autoTranscode"
                                    options={textValues.appConfig.autoTranscode.options}
                                    colSize={4}
                                    label={textValues.appConfig.autoTranscode.label}
                                    help={textValues.appConfig.autoTranscode.help}
                                    value={autoTranscode} onChange={this.setAutoTranscode.bind(this)}/>
                          </div>
                          <div className="row appconfigEditRow">
                                <TextFieldWithToolTip fieldId="imagetemplateurl"
                                  colSize={12}
                                  label={textValues.appConfig.imagetemplateurl.label}
                                  help={textValues.appConfig.imagetemplateurl.help}
                                  value={imagetemplateurl} onChange={this.setImagetemplateurl.bind(this)}/>
                          </div>
                          <div className="row appconfigEditRow">
                                  <SelectWithToolTip fieldId="convertImage"
                                    options={textValues.appConfig.convertImage.options}
                                    colSize={4}
                                    label={textValues.appConfig.convertImage.label}
                                    help={textValues.appConfig.convertImage.help}
                                    value={convertImage} onChange={this.setConvertImage.bind(this)}/>

                                  <SelectWithToolTip fieldId="sendUpdateToSoundMouse"
                                      options={textValues.appConfig.sendUpdateToSoundMouse.options}
                                      colSize={4}
                                      label={textValues.appConfig.sendUpdateToSoundMouse.label}
                                      help={textValues.appConfig.sendUpdateToSoundMouse.help}
                                      value={sendUpdateToSoundMouse} onChange={this.setSendUpdateToSoundMouse.bind(this)}/>

                          </div>
                          <div className="row appconfigEditRow">
                                  <TextFieldWithToolTip fieldId="s3videoURL"
                                    colSize={12}
                                    label={textValues.appConfig.s3videoURL.label}
                                    help={textValues.appConfig.s3videoURL.help}
                                    value={s3videoURL} onChange={this.setS3videoURL.bind(this)}/>
                          </div>
                          <div className="row appconfigEditRow">
                            <TextFieldWithToolTip fieldId="awsRegion"
                              colSize={4}
                              label={textValues.appConfig.awsRegion.label}
                              help={textValues.appConfig.awsRegion.help}
                              value={awsRegion} onChange={this.setAwsRegion.bind(this)}/>

                              <TextFieldWithToolTip fieldId="videoBucket"
                                colSize={4}
                                label={textValues.appConfig.videoBucket.label}
                                help={textValues.appConfig.videoBucket.help}
                                value={videoBucket} onChange={this.setVideoBucket.bind(this)}/>



                          </div>
                          <div className="row appconfigEditRow">
                            <TextFieldWithToolTip fieldId="imageBucket"
                              colSize={4}
                              label={textValues.appConfig.imageBucket.label}
                              help={textValues.appConfig.imageBucket.help}
                              value={imageBucket} onChange={this.setImageBucket.bind(this)}/>
                              <TextFieldWithToolTip fieldId="imageMasterFolder"
                                colSize={4}
                                label={textValues.appConfig.imageMasterFolder.label}
                                help={textValues.appConfig.imageMasterFolder.help}
                                value={imageMasterFolder} onChange={this.setImageMasterFolder.bind(this)}/>
                                <TextFieldWithToolTip fieldId="imagePublicFolder"
                                  colSize={4}
                                  label={textValues.appConfig.imagePublicFolder.label}
                                  help={textValues.appConfig.imagePublicFolder.help}
                                  value={imagePublicFolder} onChange={this.setImagePublicFolder.bind(this)}/>

                          </div>
                          <div className="row appconfigEditRow">
                              <TextFieldWithToolTip fieldId="s3imagesURL"
                                colSize={12}
                                label={textValues.appConfig.s3imagesURL.label}
                                help={textValues.appConfig.s3imagesURL.help}
                                value={s3imagesURL} onChange={this.setS3imagesURL.bind(this)}/>
                            </div>
                      <div className="row appconfigEditRow">
                                <TextFieldWithToolTip fieldId="imageUrlAliases"
                                  colSize={12}
                                  label={textValues.appConfig.imageUrlAliases.label}
                                  help={textValues.appConfig.imageUrlAliases.help}
                                  value={imageUrlAliases} onChange={this.setImageUrlAliases.bind(this)}/>
                      </div>
                      <div className="row appconfigEditRow">
                                <TextFieldWithToolTip fieldId="requiredFields"
                                  colSize={12}
                                  label={textValues.appConfig.requiredFields.label}
                                  help={textValues.appConfig.requiredFields.help}
                                  value={requiredFields} onChange={this.setRequiredFields.bind(this)}/>
                      </div>
                      <div className="row appconfigEditRow">
                                <TextFieldWithToolTip fieldId="transcodeSourceBucket"
                                  colSize={4}
                                  label={textValues.appConfig.transcodeSourceBucket.label}
                                  help={textValues.appConfig.transcodeSourceBucket.help}
                                  value={transcodeSourceBucket} onChange={this.setTranscodeSourceBucket.bind(this)}/>

                              <TextFieldWithToolTip fieldId="transcodeDestBucket"
                                    colSize={4}
                                    label={textValues.appConfig.transcodeDestBucket.label}
                                    help={textValues.appConfig.transcodeDestBucket.help}
                                    value={transcodeDestBucket} onChange={this.setTranscodeDestBucket.bind(this)}/>

                            <TextFieldWithToolTip fieldId="transcodeDestFileNamePrefix"
                                          colSize={4}
                                          label={textValues.appConfig.transcodeDestFileNamePrefix.label}
                                          help={textValues.appConfig.transcodeDestFileNamePrefix.help}
                                          value={transcodeDestFileNamePrefix} onChange={this.setTranscodeDestFileNamePrefix.bind(this)}/>


                      </div>







                        <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                            this.updateAppConfig();
                          }}>Update</button>

             </div>

  <ModalDialog message={this.state.modalMessage}/>


          </div>
        );

    }


}
