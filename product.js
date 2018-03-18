  app.post('/api/category/add',category.createCategory)
    app.get('/api/category/list',category.getCategory)
    app.delete('/api/category/delete',category.deleteCategory)
    
      app.post('/api/inventoryUsers/add',user.createInventoryUser);
    app.get('/api/inventoryUsers/get',user.getInventoryUser);

exports.getCategory=(req,res)=>{
    let query="select * from category where isDelete=false"
    con.query(query,(err,result)=>{
        if(err)
        {
            console.log('error',err)
            res.json({"Error" : true, "Message" : "Error in executing MySQL query"});
        }
        if(result)
        {
            console.log('response',result)
            res.send(result)
        }
    })
};


exports.getInventoryUser=(req,res)=>{
    let query="select * from user where userType='inventoryUser' and isDelete=false"
    con.query(query,(err,result)=>{
        if(err)
        {
            console.log('error',err)
            res.json({"Error" : true, "Message" : "Error in executing MySQL query"});
        }
        if(result)
        {
            console.log('response',result)
            res.send(result)
        }
    })
};



export const addProduct=(obj)=> {
    return ((dispatch)=>{
        console.log("Add product Info..")
        return axios.post('http://localost:4000/api/product/add',obj).then((sucess)=>{
            dispatch({type:"Add_product",payload:sucess.data})
        }).catch((err)=>{
            console.log("Could Not Fetch :",err);
        })
    })
}
export const getCategory=()=> {
    return ((dispatch)=>{
        console.log("get category Info..")
        return axios.get('http://localost:4000/api/category/list').then((sucess)=>{
            dispatch({type:"get_category",payload:sucess.data})
        }).catch((err)=>{
            console.log("Could Not Fetch :",err);
        })
    })
}


export function add_product_reducers(state=[],action) {
    switch (action.type){
        case "Add_product":
            console.log("In product reducer ", action.payload);
            return action.payload;
        default:
            return state;
    }
}
export function get_category_reducers(state=[],action) {
    switch (action.type){
        case "get_category":
            console.log("In category reducer ", action.payload);
            return action.payload;
        default:
            return state;
    }
}



var axios = require('axios');
export const get_inventory_user=()=>{
    return((dispatch)=>{
            return axios.get('http://localhost:4000/api/inventoryUsers/get').then((users)=>{
                console.log("action ",users);
                dispatch({ type:"get_all_inventoryUser",payload:users.data.result});
            }).catch((err)=>{
                console.log("Could Not Fetch :",err);
            })
        }
    )
}


export function inventory_user_reducers(state=[],action) {
    switch (action.type){
        case "get_all_inventoryUser":
            console.log("In reducer ", action.payload);
            return action.payload;
        default:
            return state;
    }
}

import {combineReducers} from 'redux';
import {all_item_reducers} from './product_reducers/index';
import {all_user_reducers} from './report_reducrs/index'
import {Customer} from './customer_reducer/index'
import {send_email_reducers} from "./admin_reducers/sendEmail";
import {csv_file_reducers} from "./admin_reducers/csvFile";
import {add_inventoryUser_reducers} from './admin_reducers/inventoryUser'
import {add_product_reducers,get_category_reducers} from './product_reducers/index'
import {inventory_user_reducers} from './inventoryUser_reducers/index'

export default combineReducers({
    all_users:all_user_reducers,
    all_items:all_item_reducers,
    Customer:Customer,
    InventoryUser:add_inventoryUser_reducers,
    csv:csv_file_reducers,
    email:send_email_reducers,
    product:add_product_reducers,
    category:get_category_reducers,
    getInventoryUser:inventory_user_reducers
});





