
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
//import logger from "redux-logger";
import {persistStore,autoRehydrate} from "redux-persist"


import {userSettings} from "./reducers/userSettings";
import {applicationSettings} from "./reducers/applicationSettings";
import {episodeList} from "./reducers/episodeList"
import {combineReducers} from "redux";

//const appliedMiddleWare=applyMiddleware(thunk,logger);
const appliedMiddleWare=applyMiddleware(thunk);
var reducers=combineReducers({
    userSettings:userSettings.reducer,
    applicationSettings:applicationSettings.reducer,
    episodeList:episodeList.reducer
});


// const enhancer=compose(appliedMiddleWare,autoRehydrate());
// export default function configStore(onCompletion){
//     const store=createStore(reducers,enhancer);
//     persistStore(store, {storage:AsyncStorage},onCompletion);
//     return store;
// }


export default function configStore(){
    const store=createStore(reducers,appliedMiddleWare);
    return store;
}
