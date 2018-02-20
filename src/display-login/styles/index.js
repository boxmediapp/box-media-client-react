export const styles={
    subscription:{
          display:"flex",

          width:"50%",
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center"

    },
    mql:window.matchMedia(`(min-width: 700px)`),
    header: function(){
      var ret= {
          position:"fixed",
          width:"100%",
          height:80,
          display:"flex",
          flexDirection: "row",
          backgroundColor: "#F5047A",
          zIndex:100
      };
      if(!styles.mql.matches){
        ret.width="100vw";
      }
      return ret;
    },
    titleContainer:function(){
      var ret={
        display:"flex",
        flexDirection: "row",
        marginLeft:40
      };
      if(styles.mql.matches){
          ret.marginLeft=1;
      }
      return ret;
    },
    logo:{
      maxWidth:80,
      marginLeft:10,
      marginBottom:4
    },
    appTitle:{
      fontFamily: "GiorgioSans-Regular",
      fontSize: 25,
      fontWeight:400,
      color: "#FFFFFF",
      whiteSpace: "nowrap",
      boxSizing: "inherit"
    },
      contentContainer:{
          display:"flex",
          flexDirection:"row",
          justifyContent:"center"
      },
      content:{
        position:"absolute",
        marginTop:90,
        width:"100%",
        padding:20


      },
};
