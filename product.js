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


import React,{Component} from 'react';
import Header from '../header';
import{connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {addProduct,getCategory} from '../../action/product_action/index'
let emailExistMsg='',conPassMsg='',dobMsg='',contactMsg='';
class ProductRegister extends Component{
    constructor(){
        super();
        this.state={
           productName:'',
           categoryId:'',
           manufacturer:'',
           userId:1,
           stock:'',
           price:'',
           discount:'',
           description:'',
           category_list:[],
           photo:'',
        }
    }
    componentWillMount(){
        this.props.getCategory()
    }
    componentWillReceiveProps(nextProps) {
    this.setState({category_list:nextProps.listCategory})
    }
    // checkContact=(e)=>{
    //     contactMsg=''
    //     let rephone = /^((?!(0))[0-9]{6,13})$/;
    //     if (!rephone.test(e.target.value)) {
    //         contactMsg='Enter Contact Number between 6 to 13 digit'
    //     }
    // }
    // checkConfirmPassword=(e)=>{
    //     conPassMsg=''
    //     let conPass=e.target.value
    //     let pass=this.state.password
    //     if(pass!==conPass)
    //     {
    //         //alert('Password and Confirm Password should be matched')
    //         conPassMsg='Password and Confirm Password should be matched'
    //     }
    // }
    // checkDOB=(e)=>{
    //     dobMsg='';
    //     let dob=e.target.value;
    //     var curDate=new Date();
    //     var dt=new Date(dob);
    //     var monthdiff=(curDate.getFullYear()-dt.getFullYear())*12;
    //     var age=monthdiff/12;
    //     if(age<=15)
    //         dobMsg='User age must greater than 15';
    // }
    sendData=(e)=>{
        e.preventDefault();
        let formData=new FormData()
        formData.append('productName',this.state.productName)
        formData.append('categoryId',this.state.categoryId)
        formData.append('manufacturer',this.state.manufacturer)
        formData.append('userId',this.state.userId)
        formData.append('stock',this.state.stock)
        formData.append('price',this.state.price)
        formData.append('discount',this.state.discount)
        formData.append('photo',this.state.photo)
        formData.append('description',this.state.description)
        this.props.addProduct(formData);
    }
    render(){
        return(
            <div>
                <Header/>
                <div className="container">
                    <div class="panel panel-default">
                        <div class="panel-heading"><center><h2 style={{"color":"#4CAF50"}}>Product Register</h2></center></div>
                        <div class="panel-body">

                            <div className="row">
                                <div className="col-md-9 personal-info">
                                    <form onSubmit={this.sendData} className="form-horizontal" role="form">
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Product name<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <input className="form-control" required={true} type="text"  onChange={(e)=>{this.setState({productName:e.target.value})}}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Category Type</label>
                                            <div className="col-lg-8">
                                                <select className="form-control" onChange={this.handleCategory}>
                                                    {
                                                        this.state.category_list.map((v, i) => {
                                                            return (<option key={v.categoryId} value={v.categoryId}>{v.categoryName}</option>)
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Manufacturer</label>
                                            <div className="col-lg-8">
                                                <input className="form-control"  type="text"  onChange={(e)=>{this.setState({manufacturer:e.target.value})}}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Stock<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <input className="form-control" required={true} type="number"  onChange={(e)=>{this.setState({stock:e.target.value})}}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Price<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <input className="form-control" required={true} type="number"  onChange={(e)=>{this.setState({price:e.target.value})}}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Photo<span style={{"color":"red"}}>*</span></label>
                                            <div className="col-lg-8">
                                                <input className="form-control" required={true} type="file"  onChange={(e)=>{this.setState({photo:e.target.files[0]})}}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Discount</label>
                                            <div className="col-lg-8">
                                                <input className="form-control" type="number"  onChange={(e)=>{this.setState({stock:e.target.value})}}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-3 control-label">Description</label>
                                            <div className="col-lg-8">
                                                <textarea className="form-control"  type="text" onChange={(e)=>{this.setState({description:e.target.value})}}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-5 control-label"></label>
                                            <div className="col-md-7">
                                                <div className="col-md-3">
                                                    <input type="submit" className="btn btn-success" value="Add Product"/>
                                                </div>
                                                <div className="col-md-4">
                                                    <input type="reset" className="btn btn-default" value="Cancel"/>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
       addProduct:state.product,
       listCategory:state.category,
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({addProduct,getCategory},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(ProductRegister);




