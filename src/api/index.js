
import "whatwg-fetch";
import {config} from "../configs";
import {appdata} from "../store";
import {genericUtil} from "../utils";



class ServiceAPI {
     constructor(config,appdata){
        this.config=config;
        this.appdata=appdata;
     }
     checkHttpError(response,path, methodName){
          var errorObject=null;
          if(!response){
            console.error("empty response received with "+methodName+" request from:"+path);
            throw Error("Empty Response received from the server");
          }
          else if(!response.status){
            console.error("response with status zero is received with "+methodName+" request from:"+path);
            throw new Error("Response with zero code received from the server");
          }
          else if(response.status>=300 || response.status<200){
                  console.error("response with status "+response.status+" is received with "+methodName+" request from:"+path);
                  errorObject= new Error("Response "+response.status+" is received from the server");
                  errorObject.errorHttpResponse=response;
                  throw errorObject;
          }
          else{
              console.log(" Successfull response "+response.status+" with "+methodName+" from :"+path);
          }
     }
     processAPIError(error, errorCallback){
          if(error && error.errorHttpResponse){
                try{
                      error.errorHttpResponse.text().then(errorBody=>{
                            if(errorBody){
                                  try{
                                      var errorMessage=JSON.parse(errorBody);
                                      if(errorMessage && errorMessage.error){
                                          errorCallback(errorMessage.error,error.errorHttpResponse.status);
                                      }
                                      else{
                                          errorCallback(errorBody,error.errorHttpResponse.status);
                                      }

                                  }
                                  catch(e3){
                                      console.log(e3);
                                      errorCallback(errorBody,error.errorHttpResponse.status);
                                  }

                            }
                            else{
                              errorCallback(error,error.errorHttpResponse.status);
                            }

                      }).catch(e2=>{
                            console.error(e2);
                            errorCallback(error,error.errorHttpResponse.status);
                      });
                }
                catch(e1){
                      console.error(e1);
                      errorCallback(error,error.errorHttpResponse.status);
                }
          }
          else{
              errorCallback(error);
          }
     }
     executeHTTPGetRequestWithHeaders(path, headers){
             if(!headers){
               headers={};
             }
            return fetch(this.config.api.getUrl(path),{headers})
            .then(response=> {
                  this.checkHttpError(response,path, "GET");
                  return response.text();
            }).then(body => {
                return JSON.parse(body);
            });
    }
   executeHTTPPostRequestWithHeaders(path, headers, body){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers, method:"POST", body})
    .then(response=> {
        this.checkHttpError(response,path, "POST");
        return response.text();
    }).then(body => {
        return JSON.parse(body);
    });
   }

   executeHTTPPutRequestWithHeaders(path, headers, body){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers, method:"PUT", body})
    .then(response => {
      this.checkHttpError(response,path, "PUT");
      return response.text();
    }).then(body => {
        return JSON.parse(body);
    });
  }
  executeHTTPPatchRequestWithHeaders(path, headers, body){
    if(!headers){
      headers={};
    }
   return fetch(this.config.api.getUrl(path),{headers, method:"PATCH", body})
   .then(response => {
       this.checkHttpError(response,path, "PATCH");
       return response.text();
   }).then(body => {
       return JSON.parse(body);
   });
  }


   executeHTTPDeleteRequestWithHeaders(path, headers){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers,method:"DELETE"})
    .then(response => {
          this.checkHttpError(response,path, "DELETE");
          return response.text();
    }).then(body => {
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
  doPatchRequest(path,body){
    var headers=this.buildHttpHeader();
    return this.executeHTTPPatchRequestWithHeaders(path,headers,body);
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
           return data;
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
    getTasks(importScheduleType){
        return this.doGetRequest("tasks?importScheduleType="+importScheduleType);
     }
     createTask(task){
       return this.doPostRequest("tasks", JSON.stringify(task));
     }
     removeTask(task){
       return this.doDeleteRequest("tasks/"+task.id);
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
         loadEpisodeDetails(episodid){
           return this.doGetRequest("episodes/"+episodid);
         }
         loadProgrammeDetails(programmeid){
            return this.doGetRequest("series/"+programmeid);
         }
         loadCollectionDetails(collectionid){
           return this.doGetRequest("seriesgroup/"+collectionid);
         }
         patchEpisode(episodeid, episode){
              return this.doPatchRequest("episodes/"+episodeid,JSON.stringify(episode));
         }
         patchProgramme(programmeid, programme){
              return this.doPatchRequest("series/"+programmeid,JSON.stringify(programme));
         }
         patchProgrammeCollection(collectionid,programmeCollection){
               return this.doPatchRequest("seriesgroup/"+collectionid,JSON.stringify(programmeCollection));
         }
         loadCuePoints(episodid){
                return this.doGetRequest("cue/"+episodid);
         }
         updateCuePoint(episode,cue){
              return this.doPutRequest("cue/"+episode.id+"/"+cue.id,JSON.stringify(cue));
         }
         createCuePoint(episode,cue){
              return this.doPostRequest("cue/"+episode.id,JSON.stringify(cue));

         }
         removeCuePoint(episode,cueid){
             return this.doDeleteRequest("cue/"+episode.id+"/"+cueid);

         }
         getEpisodeImages(episode){
           return this.doGetRequest("images-s3?episodeid="+episode.id);
         }
         getProgrammeImages(programme){
           return this.doGetRequest("images-s3?programmeid="+programme.id);
         }
         getCollectionImages(collection){
            return this.doGetRequest("images-s3?collectionid="+collection.id);
         }
         deleteCollectionLevelMasterImage(collectionid,imagefile){
           return this.doDeleteRequest("box-images/master/seriesgroup/"+collectionid+"/"+imagefile);
         }
	       deleteProgrammeLevelImage(programmeid,imagefile){
           return this.doDeleteRequest("box-images/master/series/"+programmeid+"/"+imagefile);
	       }
	       deleteEpisodeLevelImage(episodeid,imagefile){
           return this.doDeleteRequest("box-images/master/episode/"+episodeid+"/"+imagefile);
	       }
         updateCMSMenu(cmsmenu){
            if(cmsmenu.id){
                return this.doPutRequest("cms/manage/menu/"+cmsmenu.id, JSON.stringify(cmsmenu));
            }
            else{
                return this.doPostRequest("cms/manage/menu", JSON.stringify(cmsmenu));
            }

         }
         loadBCPlaylists(){
            return this.doGetRequest("bc/playlists");
         }
         loadExplictPlaylists(){
           return this.doGetRequest("bc/playlist?search=type:EXPLICIT");
         }
         patchBCPlaylist(playlist){
           return this.doPatchRequest("bc/playlist/"+playlist.id,JSON.stringify(playlist));
         }
         loadAllCMSMenu(){
            return this.doGetRequest("cms/manage/menu");
         }
         loadACMSMenu(menuId){
            return this.doGetRequest("cms/manage/menu/"+menuId);
         }
         deleteCMSMenu(cmsMenu){
           return this.doDeleteRequest("cms/manage/menu/"+cmsMenu.id);
         }

         getAllBoxChannels(){
             return this.doGetRequest("box-channels");
         }
         getABoxChannel(channelId){
             return this.doGetRequest("box-channels/"+channelId);
        }


         updateBoxChannel(channel){
            return this.doPostRequest("box-channels", JSON.stringify(channel));
         }

        deleteBoxChannel(channel){
             return this.doDeleteRequest("box-channels/"+channel.channelId);
        }

}


const api=new ServiceAPI(config,appdata);

export {api,ServiceAPI};
