var config={
    appid:"boxmediaapp",
    apikey:"k7jc3QcMPKEXGW5UC",
    securityGroup:"1CNbWCFpsbmRQuKdd",
    version:"4.2.0",
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
