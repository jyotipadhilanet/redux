import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
class List extends Component {
constructor(props){
    super(props);
    this.state={
        sname:'',
        age:'',
        visible:true,
        id:'',
        email:''
    }
}

    handleDetail=(e)=>{
        console.log(e.target.id);
        this.props.user.map((v,i)=>{
            if(v._id===e.target.id){
                this.setState({
                    sname:v.sname,
                    age:v.age,
                    id:v._id,
                    email:v.email,
                    visible:false
                })
            }
        })
    }

        render(){
    console.log('visible state',this.state.visible);

            return(
                <div className="form-inline">
                    <table>
                        <tbody>
                        <tr>
                            <th>Name</th>
                        </tr>
                        {
                            this.props.user.map((v,i)=>{
                                return(
                                    <tr>
                                    <a  onClick={this.handleDetail} id={v._id}>&#9660;{v.sname}</a>
                                        {this.state.id === v._id &&
                                            <div id={v._id}><tr>{this.state.age}</tr>
                                                <tr>{this.state.email}</tr>
                                            </div>
                                        }
                                    </tr>
                               )
                            })
                        }

                        </tbody>

                    </table>
                    <div className="container">
                        <div className="float-center">
                            <table className='table table-bordered ' align='center'>
                                <tbody>
                            {this.props.user.map((v,i)=> {
                                return (
                                    this.state.id === v._id &&
                                    <div id={v._id}>
                                        <div>{v.sname}</div>
                                        <div>{v.age}</div>
                                        <div>{v.contact}</div>
                                        <div>{v.gender}</div>
                                        <div>{v.state}</div>
                                        <div>{v.city}</div>
                                        <div>{v.gender}</div>
                                    </div>
                                )
                            })
                            }</tbody></table></div></div>
                </div>
            );
        }
}
function mapStateToProps(state) {
    return {
        user: state.stud
    }
}


export default connect(mapStateToProps)(List);
