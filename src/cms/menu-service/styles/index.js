
export const styles={
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

    formContainer:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        justify:"flex-start",
        alignItems:"flex-start",
        width:"100%",
    },
    formItem:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-start",
      marginTop:10,
      marginBottom:10
    },
    title:{
      fontSize: 42,
      marginBottom: 32,
      color: "#414242",
      textAlign: "center",
      fontWeight: "lighter"
    },
    label:{
      marginRight:10
    },
    iconContainer:{
           display:"flex",
           flexDirection:"row",
           flexWrap: "wrap"
    },
    cmsMenuList:{
      display:"flex",
      flexDirection:"column",
      justifyContent:"flex-start",
      alignItems:"flex-start",
      marginLeft:30,
      marginBottom:10
    },
    footer:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-start",
      width:"100%",
      marginLeft:30
    },
    buttonContainer:{
        marginLeft:10
    },
    cmsMenuRecord:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        marginBottom:10

    },
    cmslink:{
      color:"blue",
      cursor: "pointer"
    },
    deleteButtonContainer:{
      flex:1,
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-end",
      marginRight:30
    },
    footer:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-start",
      width:"100%",
      marginLeft:30
    }




};
