import {combineReducers} from 'redux'
import state from './state'
import city from './city'
import stud from './stud'
import login from './login'
const AllReducer= combineReducers({
    state:state,
    city:city,
    stud:stud,
    login:login
})
export default AllReducer;