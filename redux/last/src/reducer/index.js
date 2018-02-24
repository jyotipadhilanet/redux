import {combineReducers} from 'redux'
import list from './List'
import state from './state'
import city from './city'
import stud from './stud'
const AllReducer= combineReducers({
    state:state,
    city:city,
    stud:stud
})
export default AllReducer;