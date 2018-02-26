import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {LoginCheck} from '../action/index'
class Login extends Component {
    constructor() {
        super()
        this.state = {
            sname: '',
            password: ''
        }
    }
    componentWillReceiveProps(nextProps){
        (localStorage.getItem('user')===nextProps.list)? this.props.history.push('/crud'):this.props.history.push('/')
    }
    clearData=()=>{
        this.setState({sname:'',password:''})
    }
    handleSubmit=()=> {
        console.log("In login submit")
        console.log(this.state.sname,this.state.password)
        var obj={
            username:this.state.sname,
            password:this.state.password
        }
       this.props.LoginCheck(obj)
    }


    render() {

        return (
            <form onSubmit={(event) => {event.preventDefault();}}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        Student Name :-<input type="text" ref="name" id="name" placeholder="Name"
                                              className="form-control is-valid"
                                              value={this.state.sname} onChange={(e) => {
                        this.setState({sname: e.target.value})
                    }}/>

                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        Password :- <input type="password" ref="password" id="password"
                                           placeholder="password" className="form-control is-valid"
                                           onChange={(e) => {this.setState({password: e.target.value})}}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                            onClick={this.handleSubmit}>Login</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal"
                            onClick={this.clearData}>Close
                    </button>
                </div>
            </form>
        )
    }
}
function  mapStateToProps(state) {
    return{
        list:state.login
    }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({LoginCheck},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
