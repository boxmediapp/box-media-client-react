import {imageUtil}   from "../../utils";
export const styles={
  mql:window.matchMedia(`(min-width: 700px)`),
  dropzone:function(width, height){
    var fitResolution=imageUtil.calculateFitImageWidth({width,height});
    return {
      width: fitResolution.width,
      height: fitResolution.height,
      borderWidth: 2,
      borderColor: 'rgb(102, 102, 0)',
      borderStyle: 'dashed',
      borderRadius: 15,
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      animationName:"borderAnimation",
      animationDuration:"4s",
      animationIterationCount: "infinite",
      animationDirection: "alternate"
    };
  },
  imagezone:function(width, height,originalSize){
    var fitResolution={width,height};


    if(!originalSize){
        fitResolution=imageUtil.calculateFitImageWidth({width,height});
        return {
          width: fitResolution.width,
          height: fitResolution.height,
          borderWidth: 2,
          display:"flex",
          flexDirection:"column",
          justifyContent:"center"
        };
    }
    else{
      return {
        borderWidth: 2,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
      };
    }


  },

  uploadButtonContainer:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight:10,
    marginTop:10
  },
  tagContainer:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  uploadImageContainer: {
    display:"flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 50,
    marginTop: 50,

  },
  imageFooter:{
    display:"flex",
    flexDirection: "row",
  },
  previewText: {
      textAlign: "center"
  },
  dimensionContainer:{
    marginRight: 40,
    border:"1px soid blue"
  },
  title:{
    fontFamily: "'Roboto', sans-serif",
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: 20,
    paddingLeft:10
  },
  uploadContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start"

  },
  s3imageContainer:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    marginTop:20

  },
  masterImageContainer:{
    padding:20,
    margin:20,
    display:"flex",
    flexDirection:"column",
  },
  imageContainer:{
    padding:20,
    margin:20,
    backgroundColor: '#fff',
    borderRadius: 15,
    display:"flex",
    flexDirection:"column",
    boxShadow: "10px 10px 5px #888888"
  },
  publicImageContainer:{
    padding:20,
    margin:20,
  },

  imagesHeader:{
    display:"flex",
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between",
  },
  header:{
    display:"flex",
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between",
  },
  imagetype:{
    fontFamily: "'Roboto', sans-serif",
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: 20,
    paddingLeft:10,
    flex:1
  },
  rightContainer:{
      flex:1,
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-end"

  },
  dimension:{

    fontFamily: "'Roboto', sans-serif",
    fontWeight: 500,
    fontSize: 20,
    marginLeft:100,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",

  }




};
