
import "whatwg-fetch";
import {config} from "../configs";
import {appdata} from "../store";


var appconfig=appdata.getAppConfig();


const pHTTPGetRequest=function(path, headers){
  return fetch(config.api.getUrl(path),{headers})
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
const pHTTPPostRequest=function(path, headers, body){
  return fetch(config.api.getUrl(path),{headers, method:"POST", body})
  .then(function(response) {
    if((!response) || response.status>=400){
        console.error("failure response on post request:"+path);
        throw Error("HTTP post request response error on:"+path);
    }
        return response.text();
  }).then(function(body) {
      return JSON.parse(body);
  });
};

const pHTTPPutRequest=function(path, headers, body){
  return fetch(config.api.getUrl(path),{headers, method:"PUT", body})
  .then(function(response) {
    if((!response) || response.status>=400){
        console.error("failure response on put request:"+path);
        throw Error("HTTP put request response error on:"+path);
    }
        return response.text();
  }).then(function(body) {
      return JSON.parse(body);
  });
};
const pHTTPDeleteRequest=function(path, headers){
  return fetch(config.api.getUrl(path),{headers,method:"DELETE"})
  .then(function(response) {
        if((!response) || response.status>=400){
            console.error("failure response on delete request:"+path +":"+response.status+":"+response);
            throw Error("HTTP response error on:"+path);
        }

        return response.text();
  }).then(function(body) {
      return JSON.parse(body);
  });
};

const pBuildHttpHeader=function(){
       return {Authorization: appdata.getAuthorization()};
};

const pBuildHttpHeaderWithUsernameAndPassword=function(username,password){
      return {Authorization: appdata.buildAuthorization(username,password)};
};

const httpGetRequest=function(path){
  var headers=pBuildHttpHeader();
  return pHTTPGetRequest(path,headers);
}
const httpDeleteRequest=function(path){
  var headers=pBuildHttpHeader();
  return pHTTPDeleteRequest(path,headers);
}
const httpPostRequest=function(path,body){
  var headers=pBuildHttpHeader();
  return pHTTPPostRequest(path,headers,body);
}

const httpPutRequest=function(path,body){
  var headers=pBuildHttpHeader();
  return pHTTPPutRequest(path,headers,body);
}

class ServiceAPI {

  login(username,password){
          var headers=pBuildHttpHeaderWithUsernameAndPassword(username,password);
          return pHTTPPostRequest("login",headers, JSON.stringify({username:username}));
   }

         loadConfig(){
           return httpGetRequest("app/info").then(function(data){
             return data.appconfig;
           });
         }
         updateConfig(appconfig){
           return httpPutRequest("app/info",JSON.stringify({appconfig}));
         }
         requestS3UploadURL(request){
           return httpPostRequest("presigned", JSON.stringify(request));
         }
         findNewEpisodes(request, start=0){

               var queryurl="image-service/box-episodes?numberOfImageSets=0&start="+start;
               if(request.search){
                 queryurl+="&search="+request.search;
               }
               if(request.sortBy){
                 queryurl+="&sortBy="+request.sortBy;
               }
               if(request.sortOrder){
                 queryurl+="&sortOrder="+request.sortOrder;
               }
               if(request.fromDate){
                 queryurl+="&from="+request.fromDate;
               }
               if(request.toDate){
                 queryurl+="&to="+request.toDate;
               }

               return httpGetRequest(queryurl);
         }
         findAssignedEpisodes(search, start=0){
               var queryurl="image-service/box-episodes?minNumberOfImageSets=1&start="+start;
               if(search){
                 queryurl+="&search="+search;
               }
               return httpGetRequest(queryurl);
         }
         findAssignedEpisodesByProgrammeNumber(programmeNumber, start=0){
               var queryurl="image-service/box-episodes?minNumberOfImageSets=1&start="+start;
               if(programmeNumber){
                 queryurl+="&programmeNumber="+programmeNumber;
               }
               return httpGetRequest(queryurl);
         }

         getEpisodeById(id){
            return httpGetRequest("image-service/box-episodes/"+id);
         }
         createImageSet(imageset){
            return httpPostRequest("image-service/image-sets", JSON.stringify(imageset));
         }
         createImage(image){
           return httpPostRequest("image-service/images", JSON.stringify(image));
         }
         findImageSets(search){
           if(search){
                  return httpGetRequest("image-service/image-sets?search="+search);
           }
           else{
             return httpGetRequest("image-service/image-sets");
           }
         }
         findImageSetsByContractAndEpisode(contractNumber,episodeNumber){
              return this.findImageSetsByProgrammeNumber(contractNumber+"-"+episodeNumber);
         }
         findImageSetsByProgrammeNumber(programmeNumber){
              return httpGetRequest("image-service/image-sets?programmeNumber="+programmeNumber);
         }
         updateImageSet(imageSet){
            return httpPutRequest("image-service/image-sets/"+imageSet.id, JSON.stringify(imageSet));
         }
         updateImage(image){
            return httpPutRequest("image-service/images/"+image.id, JSON.stringify(image));
         }
         deleteImage(image){
           return httpDeleteRequest("image-service/images/"+image.id);
         }
         deleteImageSet(imageSet){
           return httpDeleteRequest("image-service/image-sets/"+imageSet.id);
         }
         getSummaries(){
               return httpGetRequest("image-service/summaries");
         }
         getClientImages(programmeNumber){
             if(programmeNumber){
               return httpGetRequest("image-service/clients/images?programmeNumber="+programmeNumber);
             }
             else{
               return httpGetRequest("image-service/clients/images");
             }

         }
         sendCommand(command){
            return httpPostRequest("commands", JSON.stringify(command));
         }
         getTasks(){
            return httpGetRequest("tasks?channel=1865244993");
         }
         createTask(task){
           return httpPostRequest("tasks", JSON.stringify(task));
         }
         removeTask(task){
           return httpDeleteRequest("tasks/"+task.id);
         }
         getAllBoxChannels(){
           return httpGetRequest("box-channels");
         }
         getUsers(){
           return httpGetRequest("users");
         }
         createNewUser(user){
           return httpPostRequest("users", JSON.stringify(user));
         }
         deleteUser(username){
           return httpDeleteRequest("users/"+username);
         }
         updateUser(username,user){
           return httpPutRequest("users/"+username,JSON.stringify(user));
         }
         getAppReports(){
           return httpGetRequest("reports");
         }
         loadTags(){
           return httpGetRequest("tags");
         }
         addNewTag(tag){
           return httpPostRequest("tags", JSON.stringify({name:tag}));
         }
         removeTag(tag){
           return httpDeleteRequest("tags/"+encodeURIComponent(tag));
         }
         loadDevices(){
           return httpGetRequest("devices");
         }
         addNewDevice(device){
           return httpPostRequest("devices", JSON.stringify(device));
         }
         removeDevice(device){
           return httpDeleteRequest("devices/"+device.name);
         }
         loadAdvertRules(){
              return httpGetRequest("advertisement/settings/rule");
         }
         removeAdvertRule(rule){
              return httpDeleteRequest("advertisement/settings/rule/"+rule.id);
         }
         addAdvertRule(rule){
              return httpPostRequest("advertisement/settings/rule", JSON.stringify(rule));
         }
         updateAdvertRule(rule){
              return httpPutRequest("advertisement/settings/rule/"+rule.id,JSON.stringify(rule));
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
               return httpGetRequest(queryurl);
         }
         presigned(url){
           return httpGetRequest("presigned?url="+url);
         }

}


const api=new ServiceAPI();

export {api};
