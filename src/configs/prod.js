var config={
    url:"@@@global_input_url@@@",
    appid:"boxmediaapp",
    apikey:"@@@global_input_apikey@@@",
    securityGroup:"@@@global_input_apikey_securityGroup@@@",
    version:"4.2.3",
    api:{
      base:"https://mediaapp.boxplus.com/mule/boxtv/",
      getUrl(path){
        return this.base+path;
      }
    },
    importScheduleType:'ONDEMAND',
    normalImageWidth:533,
    normalImageHeight:300,
}
export default config;
