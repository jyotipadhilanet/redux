import {combineReducers} from 'redux'
import list from './List'
import state from './state'
import city from './city'
const AllReducer= combineReducers({
    user:list,
    state:state,
    city:city
})
export default AllReducer;