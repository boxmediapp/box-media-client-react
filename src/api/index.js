
import "whatwg-fetch";
import {config} from "../configs";
import {appdata} from "../store";
import {genericUtil} from "../utils";



class ServiceAPI {
     constructor(config,appdata){
        this.config=config;
        this.appdata=appdata;
     }

     executeHTTPGetRequestWithHeaders(path, headers){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers})
    .then(function(response) {
      if((!response) || response.status>=400){
          console.error("failure response on get request:"+path);
          throw Error("HTTP get request response error on:"+path);
      }
          return response.text();
    }).then(function(body) {
        return JSON.parse(body);
    });
  };


   executeHTTPPostRequestWithHeaders(path, headers, body){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers, method:"POST", body})
    .then(function(response) {
      if((!response) || response.status>=400){
          console.error("failure response on post request:"+path);
          throw Error("HTTP post request response error on:"+path);
      }
          return response.text();
    }).then(function(body) {
        return JSON.parse(body);
    });
   }

   executeHTTPPutRequestWithHeaders(path, headers, body){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers, method:"PUT", body})
    .then(function(response) {
      if((!response) || response.status>=400){
          console.error("failure response on put request:"+path);
          throw Error("HTTP put request response error on:"+path);
      }
          return response.text();
    }).then(function(body) {
        return JSON.parse(body);
    });
  }


   executeHTTPDeleteRequestWithHeaders(path, headers){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers,method:"DELETE"})
    .then(function(response) {
          if((!response) || response.status>=400){
              console.error("failure response on delete request:"+path);
              throw Error("HTTP response error on:"+path);
          }

          return response.text();
    }).then(function(body) {
        return JSON.parse(body);
    });
  }

  buildHttpHeader(checkExpiration){
        var userinfo=this.appdata.getUserInfo();
        return this.buildHttpHeaderWithUserInfo(userinfo);

  }
  buildHttpHeaderWithUserInfo(userinfo, checkExpiration){
        if(!userinfo){
            return null;
        }
        var clientId=userinfo.clientId;
        var clientSecret=userinfo.clientSecret;
        if(!clientId || !clientSecret){
            return null;
        }
        if(checkExpiration){
            var expiresAt=userinfo.expiresAt;
            var now=new Date();
            if(now.getTime()>=expiresAt){
                return null;
            }
        }
        return {Authorization: "Basic " + btoa(clientId+":"+clientSecret)}

  }

  doPutRequest(path,body){
    var headers=this.buildHttpHeader();
    return this.executeHTTPPutRequestWithHeaders(path,headers,body);
  }
  doPostRequest(path,body){
    var headers=this.buildHttpHeader();
    return this.executeHTTPPostRequestWithHeaders(path,headers,body);
  }
  doDeleteRequest(path){
    var headers=this.buildHttpHeader();
    return this.executeHTTPDeleteRequestWithHeaders(path,headers);
  }
   doGetRequest=function(path){
    var headers=this.buildHttpHeader();
    return this.executeHTTPGetRequestWithHeaders(path,headers);
  }

  login(username,password){
        var headers= {Authorization: "Basic " + btoa(username+":"+password)};
        return this.executeHTTPPostRequestWithHeaders("accounts/login",headers, JSON.stringify({username:username}));
   }
   refreshLogin(userInfo){
      return this.doPostRequest("accounts/refresh-login", JSON.stringify({userInfo}));
  }
  logout(userinfo){
          var oauthHeader=this.buildHttpHeaderWithUserInfo(userinfo, true);
          if(!oauthHeader){
            return;
          }
          return this.executeHTTPPostRequestWithHeaders("accounts/user-logout",oauthHeader, JSON.stringify(userinfo));
    }

    createAccount(user){
       return this.doPostRequest("accounts/create-account", JSON.stringify(user));
    }
    updateUserAccount(userAccount){
        return this.doPostRequest("accounts/user-account", JSON.stringify(userAccount));
    }
    getUserAccount(){
        return this.doGetRequest("accounts/user-account");
    }

    loadConfig(){
         return this.doGetRequest("app/info").then(function(data){
           return data.appconfig;
         });
     }

    updateConfig(appconfig){
           return this.doPutRequest("app/info",JSON.stringify({appconfig}));
    }
    requestS3UploadURL(request){
      return this.doPostRequest("presigned", JSON.stringify(request));
    }
    sendCommand(command){
            return this.doPostRequest("commands", JSON.stringify(command));
    }
    getTasks(){
        return this.doGetRequest("tasks?importScheduleType=IMPORT_BOX_EPISODE");
     }
     createTask(task){
       return this.doPostRequest("tasks", JSON.stringify(task));
     }
     removeTask(task){
       return this.doDeleteRequest("tasks/"+task.id);
     }
     getAllBoxChannels(){
         return this.doGetRequest("box-channels");
       }
       getUsers(){
         return this.doGetRequest("users");
       }
       loadUserRoles(){
         return this.doGetRequest("user-roles");
       }
       deleteUser(username){
          return this.doDeleteRequest("users/"+username);
        }
        updateUser(user){
          return this.doPutRequest("users/"+user.username,JSON.stringify(user));
        }

         getAppReports(){
           return this.doGetRequest("reports");
         }
         loadTags(){
           return this.doGetRequest("tags");
         }
         addNewTag(tag){
           return this.doPostRequest("tags", JSON.stringify({name:tag}));
         }
         removeTag(tag){
           return this.doDeleteRequest("tags/"+encodeURIComponent(tag));
         }
         loadDevices(){
           return this.doGetRequest("devices");
         }
         addNewDevice(device){
           return this.doPostRequest("devices", JSON.stringify(device));
         }
         removeDevice(device){
           return this.doDeleteRequest("devices/"+device.name);
         }
         loadAdvertRules(){
              return this.doGetRequest("advertisement/settings/rule");
         }
         removeAdvertRule(rule){
              return this.doDeleteRequest("advertisement/settings/rule/"+rule.id);
         }
         addAdvertRule(rule){
              return this.doPostRequest("advertisement/settings/rule", JSON.stringify(rule));
         }
         updateAdvertRule(rule){
              return this.doPutRequest("advertisement/settings/rule/"+rule.id,JSON.stringify(rule));
         }
         findS3BoxVideo(request, start=0){
               var queryurl="dbbox-video?start="+start;
               if(request.search){
                 queryurl+="&search="+request.search;
               }
               if(request.sortBy){
                 queryurl+="&sortBy="+request.sortBy;
               }
               if(request.sortOrder){
                 queryurl+="&sortOrder="+request.sortOrder;
               }
               return this.doGetRequest(queryurl);
         }
         presigned(url){
           return this.doGetRequest("presigned?url="+url);
         }

}


const api=new ServiceAPI(config,appdata);

export {api,ServiceAPI};
