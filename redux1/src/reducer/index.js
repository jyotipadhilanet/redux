import {combineReducers} from 'redux'
import state from './state'
import city from './city'
import stud from './stud'
import  setfield from './editfield'
import pagination from './pagination'
const AllReducer= combineReducers({
    state:state,
    city:city,
    stud:stud,
    field:setfield,
    page:pagination
})
export default AllReducer;