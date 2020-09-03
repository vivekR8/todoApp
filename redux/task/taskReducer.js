const { setStatusBarStyle } = require("expo-status-bar");
const { exp } = require("react-native-reanimated");

const INITIAL_STATE={
    task:[],
}
const taskPerformed = (state=INITIAL_STATE,action)=>{
    console.log('action.payload',action.payload)
    switch(action.type){
        case 'CREATE_TASK':
            return{
                ...state,
                task:action.payload
            }
            default:
                return state;
    }
}

export default taskPerformed;