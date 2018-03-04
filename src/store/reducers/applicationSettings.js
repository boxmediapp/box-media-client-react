const ActionNames ={
  SET_APP_CONFIG: "SET_APP_CONFIG",
  SET_BC_SETTINGS:"SET_BC_SETTINGS"

}

const initialState={
     appconfig:""
}

export const applicationSettings={
      reducer:function (state=initialState, action){
              switch(action.type){
              case ActionNames.SET_APP_CONFIG:
                            return Object.assign({},state,{appconfig:action.appconfig});
              case ActionNames.SET_BC_SETTINGS:
                            return Object.assign({},state,{bcSettings:action.bcSettings});
            }
            return state;
        },
       actions:{
                appconfig:function(appconfig){
                    return {
                        type: ActionNames.SET_APP_CONFIG,
                        appconfig
                      };
                },
                bcSettings:function(bcSettings){
                    return {
                      type: ActionNames.SET_BC_SETTINGS,
                      bcSettings
                    };
                }
      }
   };
