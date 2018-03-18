import {combineReducers} from 'redux';
import {all_item_reducers} from './product_reducers/index';
import {all_user_reducers} from './report_reducrs/index'
import {Customer} from './customer_reducer/index'
import {send_email_reducers} from "./admin_reducers/sendEmail";
import {csv_file_reducers} from "./admin_reducers/csvFile";
import {add_inventoryUser_reducers} from './admin_reducers/inventoryUser'

export default combineReducers({
    all_users:all_user_reducers,
    all_items:all_item_reducers,
    Customer:Customer,
    InventoryUser:add_inventoryUser_reducers,
    csv:csv_file_reducers,
    email:send_email_reducers
});




export const addInventoryUser=(obj)=>{
    return((dispatch)=>{
        console.log("in action of inventoryUser...")
        return axios.post('http://localhost:4000/api/inventoryUsers/add',obj).then((sucess)=>{
            dispatch({type:"add_inventoryUser",payload:sucess.data})
        })
    })
}


export function add_inventoryUser_reducers(state=[],action) {
    switch (action.type){
        case "add_inventoryUser":
            console.log("In inventoryUser reducer ", action.payload);
            return Object.assign({}, state, {
                UserId:action.payload.result.insertId
            });
        default:
            return state;
    }
}



import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {addInventoryUser} from '../../action/admin_action/index'

class AddInventoryUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:'',
            contact: '',
            password: '',
            address:'',
            dob:'',
            email: ''
        }
    }
    componentWillReceiveProps(nextProps){
        console.log("In componentWillReceiveProps",nextProps.user)
        this.setState({data:nextProps.user})
    }
    handleInsert=()=> {
        console.log("submit clicked..")
        var formdata=new FormData();
        formdata.append('email',this.state.email)
        formdata.append('password',this.state.password)
        formdata.append('contact',this.state.contact)
        formdata.append('address',this.state.address);
        formdata.append('dob',this.state.dob)
        this.props.addInventoryUser(formdata)
    }
    handleClear=()=>{
        this.setState({email:''})
    }

    render() {
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 personal-info">
                            <h3>Register</h3>
                            <form onSubmit={(e)=>e.preventDefault()} className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Email<span style={{"color":"red"}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input className="form-control" required={true} type="email"  onChange={(e)=>{this.setState({email:e.target.value})}}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Password<span style={{"color":"red"}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input className="form-control" required={true} type="password"  onChange={(e)=>{this.setState({password:e.target.value})}}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Contact No<span style={{"color":"red"}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input className="form-control" required={true} type="text" onChange={(e)=>{this.setState({contactNo:e.target.value})}} pattern="^\d{10}$"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Address</label>
                                    <div className="col-lg-8">
                                        <textarea className="form-control"  type="text" onChange={(e)=>{this.setState({address:e.target.value})}}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">DOB</label>
                                    <div className="col-lg-8">
                                        <input className="form-control"  type="date"  onBlur={(e)=>{this.setState({dob:e.target.value});}}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label"></label>
                                    <div className="col-md-8">
                                        <input type="submit" className="btn btn-primary" value="Add Inventory User" onClick={this.handleInsert}/>
                                        <span></span>
                                        <input type="reset" className="btn btn-default" value="Cancel" onClick={this.handleClear}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.InventoryUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addInventoryUser},dispatch)
}
export default connect(mapStateToProps,mapexports.createInventoryUser=(req,res)=>{
    let query="insert into user(email,password,contactNo,address,dob,userType)values(?,?,?,?,?,?)"
    let bpass=bcrypt.hashSync(req.body.password,10)
    let dt=new Date(req.body.dob)
    let param=[req.body.email,bpass,req.body.contact,req.body.address,dt,'inventoryUser'];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {
            console.log('error',err)
            res.send({"Error" : true, "Message" : "Error in executing MySQL query"});
        }
        if(result)
        {
            console.log('response',result)
            res.send({result})
        }
    })
};DispatchToProps)(AddInventoryUser);





app.post('/api/inventoryUsers/add',user.createInventoryUser);
exports.createInventoryUser=(req,res)=>{
    let query="insert into user(email,password,contactNo,address,dob,userType)values(?,?,?,?,?,?)"
    let bpass=bcrypt.hashSync(req.body.password,10)
    let dt=new Date(req.body.dob)
    let param=[req.body.email,bpass,req.body.contact,req.body.address,dt,'inventoryUser'];
    query=mysql.format(query,param);
    con.query(query,(err,result)=>{
        if(err)
        {
            console.log('error',err)
            res.send({"Error" : true, "Message" : "Error in executing MySQL query"});
        }
        if(result)
        {
            console.log('response',result)
            res.send({result})
        }
    })
};



