import {combineReducers} from 'redux';
import taskPerformed from './task/taskReducer'

export default combineReducers({
    todoList:taskPerformed
});