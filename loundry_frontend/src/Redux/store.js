import {
    combineReducers,
    createStore
} from "redux";
const axios = require("axios");

let loginState={}
const loginReducer=(state=loginState,action)=>{
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'value':
            
            return stateCopy;
    
        default:
            return stateCopy;
    }
}

const rootReducer = combineReducers({
    loginReducer
})
const store = createStore(rootReducer);
export default store;