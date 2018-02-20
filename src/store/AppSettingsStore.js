import {userSettings} from "./reducers/userSettings";
import {applicationSettings} from "./reducers/applicationSettings"
export default class AppSettingsStore{
  constructor(store){
    this.store=store;
  }
  setUserInfo(userinfo){
    this.store.dispatch(userSettings.actions.setUserinfo(userinfo));
  }
  getUserInfo(){
    return this.store.getState().userSettings.userinfo;
  }
  getUserRole(){
    var userinfo=this.getUserInfo();
    if(!userinfo){
      return null;
    }
    if((!userinfo.roles)|| (!userinfo.roles.length)){
      return null;
    }
    return userinfo.roles[0];
  }
  userHasWriteAccess(){
    var userrole=this.getUserRole();
    if(!userrole){
      return false;
    }
    return (userrole.operationAccess==="admin" || userrole.operationAccess==="full-access");
  }
  userCanAccessApp(){
    var userrole=this.getUserRole();
    if(!userrole){
      return false;
    }
    return (userrole.applicationId==="MEDIA_APP" || userrole.applicationId==="BEBOX");
  }
  isImageClient(){
    var userrole=this.getUserRole();
    if(!userrole){
      return false;
    }
    return userrole.applicationId==="IMAGE_CLIENT_APP";
  }
  isBeboxClient(){
    var userrole=this.getUserRole();
    if(!userrole){
      return false;
    }
    return userrole.applicationId==="BEBOX";
  }


  setAppConfig(appconfig){
    this.store.dispatch(applicationSettings.actions.appconfig(appconfig));
  }
  getAppConfig(){
    return this.store.getState().applicationSettings.appconfig;
  }
}
