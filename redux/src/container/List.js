import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {cityData,deldata,insertData,upadteData,pagination,setFields} from '../action/index'
let hobbyArr=[];
let hobbies='';
let isEditing=false;
class List extends Component {

    // sort = (e) => {
    //     var key = e.target.id
    //     var mydata = [].concat(this.state.disData).sort((a, b) => a[key] > b[key])
    //     this.setState({disData: mydata})
    // }
    //
    // dsort = (e) => {
    //     var key = e.target.id
    //     var mydata = [].concat(this.state.disData).sort((a, b) => a[key] < b[key])
    //     this.setState({disData: mydata})
    // }
    //
    // search = (e) => {
    //     var arr = []
    //     var data = e.target.value
    //     if (e.target.value.length > 0) {
    //         this.setState({isSearch: true})
    //         this.props.user.map((val, i) => {
    //             if (val.sname.includes(data) || val.age.includes(data) || val.contact.includes(data) || val.gender.includes(data) ||
    //                 val.email.includes(data) || val.state.includes(data) || val.city.includes(data) || val.hobbies.includes(data))
    //                 arr.push(val)
    //         })
    //         this.setState({searchData: arr})
    //     }
    //     else {
    //         this.setState({isSearch: false})
    //     }
    // }
    //
    // setFile = (e) => {
    //     e.preventDefault();
    //     let file = e.target.files[0];
    //     let reader = new FileReader();
    //     reader.onloadend = () => {
    //         this.setState({
    //             photo: file,
    //             photo1: reader.result
    //         });
    //     };
    //     reader.readAsDataURL(file);
    //     console.log(`File Upload : ${this.state.photo}`);
    // }
    // handleDelete=()=>{
    //     this.props.deldata(this.state.deleteId)
    // }
    // handleEdit=(e)=>{
    //     this.setState({isEditing:true})
    //     this.setState({editId:e})
    //     console.log("Id come in for editing",e)
    //     this.props.user.map((val,ind)=>{
    //         if(val._id==e){
    //             this.setState({sname:val.sname,age:val.age,gender:val.gender,email:val.email,hobbies:val.hobbies,city:val.city,state:val.state,photo:val.photo,contact:val.contact},
    //                 ()=>console.log("After Edit the info is",this.state))
    //         }
    //     })
    // }
    clearData = () => {
        var obj1={
            sname: '', age: '', contact: '', gender: '', email: '', hobbies: '', state: '', city: '', password: '', photo: '', photo1: ''
        };
        this.props.setFields(obj1);
    }
    handleInsert=()=> {
        var obj={
            "sname":this.props.obj.sname,
            "age":this.props.obj.age,
            "contact":this.props.obj.contact,
            "password":this.props.obj.password,
            "email":this.props.obj.email,
            "gender":this.props.obj.gender,
            "hobbies":this.props.obj.hobbies,
            "state":this.props.obj.state,
            "city":this.props.obj.city,
            "photo": this.props.obj.photo,
            "flag":1
        }
           this.props.insertData(obj);
          this.clearData()
        }
    handleUpdate=()=> {
        var obj={
            "_id":this.props.obj.editId,
            "sname":this.props.obj.sname,
            "age":this.props.obj.age,
            "contact":this.props.obj.contact,
            "password":this.props.obj.password,
            "email":this.props.obj.email,
            "gender":this.props.obj.gender,
            "hobbies":this.props.obj.hobbies.split(","),
            "state":this.props.obj.state,
            "city":this.props.obj.city,
            "photo": this.props.obj.photo
        }
        this.props.upadteData(obj);
        this.clearData()
    }
    handlesnameChange=(e)=>{
        var obj={
            "sname":e.target.event,
            "age":this.props.obj.age,
            "contact":this.props.obj.contact,
            "password":this.props.obj.password,
            "email":this.props.obj.email,
            "gender":this.props.obj.gender,
            "hobbies":this.props.obj.hobbies,
            "state":this.props.obj.state,
            "city":this.props.obj.city,
            "photo": this.props.obj.photo
        }
        this.props.setFields(obj)
    }
    handleageChange=(e)=>{
        var obj={
            "sname":this.props.obj.sname,
            "age":e.target.event,
            "contact":this.props.obj.contact,
            "password":this.props.obj.password,
            "email":this.props.obj.email,
            "gender":this.props.obj.gender,
            "hobbies":this.props.obj.hobbies,
            "state":this.props.obj.state,
            "city":this.props.obj.city,
            "photo": this.props.obj.photo
        }
        this.props.setFields(obj)
    }
    handlePasswordChange=(e)=>{
        var obj={
            "sname":this.props.obj.sname,
            "age":this.props.obj.age,
            "contact":this.props.obj.contact,
            "password":e.target.event,
            "email":this.props.obj.email,
            "gender":this.props.obj.gender,
            "hobbies":this.props.obj.hobbies,
            "state":this.props.obj.state,
            "city":this.props.obj.city,
            "photo": this.props.obj.photo
        }
        this.props.setFields(obj)
    }
    handlecontactChange=(e)=>{
        var obj={
            "sname":this.props.obj.sname,
            "age":this.props.obj.age,
            "contact":e.target.event,
            "password":this.props.obj.password,
            "email":this.props.obj.email,
            "gender":this.props.obj.gender,
            "hobbies":this.props.obj.hobbies,
            "state":this.props.obj.state,
            "city":this.props.obj.city,
            "photo": this.props.obj.photo
        }
        this.props.setFields(obj)
    }
    handleEmailChange=(e)=>{
        var obj={
            "sname":this.props.obj.sname,
            "age":this.props.obj.age,
            "contact":this.props.obj.contact,
            "password":this.props.obj.password,
            "email":e.target.event,
            "gender":this.props.obj.gender,
            "hobbies":this.props.obj.hobbies,
            "state":this.props.obj.state,
            "city":this.props.obj.city,
            "photo": this.props.obj.photo
        }
        this.props.setFields(obj)
    }
    handleGenderChange=(e)=>{
        var obj={
            "sname":this.props.obj.sname,
            "age":this.props.obj.age,
            "contact":this.props.obj.contact,
            "password":this.props.obj.password,
            "email":this.props.obj.email,
            "gender":e.target.value,
            "hobbies":this.props.obj.hobbies,
            "state":this.props.obj.state,
            "city":this.props.obj.city,
            "photo": this.props.obj.photo
        }
        this.props.setFields(obj)
    }
    handleStateChange = (e) => {
        this.props.cityData(e.target.options[e.target.selectedIndex].value)
        var obj={
            "sname":this.props.obj.sname,
            "age":this.props.obj.age,
            "contact":this.props.obj.contact,
            "password":this.props.obj.password,
            "email":this.props.obj.email,
            "gender":this.props.obj.gender,
            "hobbies":this.props.obj.hobbies,
            "state":e.target.options[e.target.selectedIndex].value,
            "city":this.props.obj.city,
            "photo":this.props.obj.photo
        }
        this.props.setFields(obj)
    }
    handleCityChange = (e) => {
        this.props.cityData(e.target.options[e.target.selectedIndex].value)
        var obj={
            "sname":this.props.obj.sname,
            "age":this.props.obj.age,
            "contact":this.props.obj.contact,
            "password":this.props.obj.password,
            "email":this.props.obj.email,
            "gender":this.props.obj.gender,
            "hobbies":this.props.obj.hobbies,
            "state":this.props.obj.state,
            "city":e.target.options[e.target.selectedIndex].value,
            "photo": this.props.obj.photo
        }
        this.props.setFields(obj)
    }
    handleSetFile = (e) => {
                e.preventDefault();
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                     let   photo=file
                     let   photo1=reader.result
                    var obj={
                        "sname":this.props.obj.sname,
                        "age":this.props.obj.age,
                        "contact":this.props.obj.contact,
                        "password":this.props.obj.password,
                        "email":this.props.obj.email,
                        "gender":this.props.obj.gender,
                        "hobbies":this.props.obj.hobbies,
                        "state":this.props.obj.state,
                        "city":this.props.obj.city,
                        "photo":photo1
                    }
                    reader.readAsDataURL(file);
                    this.props.setFields(obj)
                };
    }
    handleHobbies=(e)=>{
      hobbyArr.push(e.target.value)
      hobbies=hobbyArr.join(",")

        var obj={
            "sname":this.props.obj.sname,
            "age":this.props.obj.age,
            "contact":this.props.obj.contact,
            "password":this.props.obj.password,
            "email":this.props.obj.email,
            "gender":this.props.obj.gender,
            "hobbies":hobbies,
            "state":this.props.obj.state,
            "city":this.props.obj.city,
            "photo":this.props.obj.photo
        }
        this.props.setFields(obj)
    }

    render() {
        var last=this.props.page.pagenum*this.props.page.limit;
        var start=last-this.props.page.limit;
        var pageArr=[];
        var totalPages=Math.ceil(this.props.user.length/this.props.page.limit);
        for(var i=1;i<=totalPages;i++){
            pageArr.push(i);
        }
       var disData=this.props.user.slice(start,last)
        console.log(disData)
        return ( <div>
                <div className="modal fade" id="myModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Student Information</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={(event) => {event.preventDefault();}} encType="multipart/form-data">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            Student Name :-<input type="text" ref="name" id="name" placeholder="Name"
                                                                  className="form-control is-valid"
                                                                  value={this.props.obj.sname} onChange={this.handlesnameChange}/>

                                        </div>
                                        <div className="form-group col-md-6">
                                            Password :- <input type="password" ref="password" id="password"
                                                               placeholder="password" className="form-control is-valid"
                                                               onChange={this.handlePasswordChange}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
           Age :- <input type="text" ref="age" id="age" placeholder="age" className="form-control is-valid" value={this.props.obj.age} onChange={this.handleageChange}/>
                                        </div>
                                    </div>

                                    <div class="form-check form-check-inline">
                                        <div className="form-group col-md-12">
                                            Hobbies :- <input type="checkbox" name="hby" onChange={this.handleHobbies}
                                                              class="form-check-input" value="Dance"
                                                              checked={isEditing?(this.props.obj.hobbies.includes("dance") || this.state.hobbies.includes("Dance") ) ? "checked" : "":""}
                                            />dance
                                            <input type="checkbox" name="hby" onChange={this.handleHobbies}
                                                   class="form-check-input" value="Sing"
                                                   checked={isEditing?(this.props.obj.hobbies.include("Sing")) ? "checked" : "":""}
                                                />Sing
                                            <input type="checkbox" name="hby" onChange={this.handleHobbies}
                                                   class="form-check-input" value="Study"
                                                   checked={isEditing?(this.props.obj.hobbies.include("Study")) ? "checked" : "":""}
                                            />Study
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            Image :-
                                            {(isEditing) ? <img src={this.props.obj.photo} height="100px" width="200px"/> : ""}
                                            <input type="file" ref="img" id="img" placeholder="image"
                                                   className="form-control is-valid" onChange={this.handleSetFile}/>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            gender :-
                                            <label class="radio-inline">
                                                <input type="radio" ref="gender" id="gender" name="gender"
                                                       onChange={this.handleGenderChange}
                                                       value="male"
                                                       checked={(this.props.obj.gender == "male") ? "checked" : ""}/>male
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" ref="gender" id="gender" name="gender"
                                                       onChange={this.handleGenderChange}
                                                       value="Female"
                                                       checked={(this.props.obj.gender == "Female") ? "checked" : ""}/>Female
                                            </label>

                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            State
     <select id="state" className="form-control is-valid" onChange={this.handleStateChange} value={this.props.obj.state}>
                                                <option>Select State</option>
                                                {
                                                    this.props.state.map((v, i) => {
                                                        return (<option key={v._id} value={v.name}>{v.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            City
                                            <select id="city" className="form-control is-valid" onChange={this.handleCityChange}>
                                                <option>{(this.props.obj.city) ? this.props.obj.city : 'select city'}</option>
                                                {
                                                    this.props.city.map((v, i) => {
                                                        return ((v.name === this.props.obj.city) ? '' :
                                                            <option key={v._id} value={v.name}>{v.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            Email <input type="email" ref="email" id="email" placeholder="Email"
                                                         className="form-control is-valid" value={this.props.obj.email}
                                                         onChange={this.handleEmailChange}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            Contact no. <input type="text" ref="cont" id="cont" placeholder="contact"
                                                               className="form-control is-valid"
                                                               value={this.props.obj.contact} onChange={this.handlecontactChange}/>
                                        </div>
                                    </div>
                                </form>
                            </div>


                            <div className="modal-footer">
                                {(isEditing) ?
                                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                                            onClick={this.handleUpdate}>Update</button> :
                                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                                            onClick={this.handleInsert}>Submit</button>}
                                <button type="button" className="btn btn-danger" data-dismiss="modal"
                                        onClick={this.clearData}>Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="mydel">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Student Information</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                Sure U want to delete??
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={this.handleDelete} className="btn btn-info"
                                        data-dismiss="modal">Yes
                                </button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="form-row">
                    <div className="form-group col-md-2">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"
                                onClick={this.clearData}>
                            + Add Student
                        </button>
                    </div>
                    <div className="form-group col-md-3">
                        <input type="text" className="form-control is-valid" onChange={this.search}
                               placeholder="search All"/>
                    </div>

                    <div className="form-group col-md-2">
                        <select className="form-control is-valid" id="numrecord" >
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        {
                            pageArr.map((v, i) => {
                                return <button className="btn btn-primary" type="button" value={v} onClick={() => {
                                    this.props.pageAction(v,this.props.page.limit)
                                }}>{v}</button>
                            })
                        }
                    </div>
                </div>



                <table className="table table-striped">
                    <tbody>
                    <tr>
                        <th>Name <a id="sname" onClick={this.sort}>&#9650;</a>
                            <a id="sname" onClick={this.dsort}>&#9660;</a></th>
                        <th>Age<a id="age" onClick={this.sort}>&#9650;</a>
                            <a id="age" onClick={this.dsort}>&#9660;</a></th>
                        <th>Contact<a id="contact" onClick={this.sort}>&#9650;</a>
                            <a id="contact" onClick={this.dsort}>&#9660;</a></th>
                        <th>Gender<a id="gender" onClick={this.sort}>&#9650;</a>
                            <a id="gender" onClick={this.dsort}>&#9660;</a></th>
                        <th>Email <a id="email" onClick={this.sort}>&#9650;</a>
                            <a id="email" onClick={this.dsort}>&#9660;</a></th>
                        <th>State <a id="state" onClick={this.sort}>&#9650;</a>
                            <a id="state" onClick={this.dsort}>&#9660;</a></th>
                        <th>City <a id="city" onClick={this.sort}>&#9650;</a>
                            <a id="city" onClick={this.dsort}>&#9660;</a></th>
                        <th>Hobbies <a id="hobbies" onClick={this.sort}>&#9650;</a>
                            <a id="hobbies" onClick={this.dsort}>&#9660;</a></th>
                        <th>photo</th>
                        <th>Action</th>
                    </tr>
                    {
                        // (this.state.isSearch) ?
                        //     this.state.searchData.map((val, i) => {
                        //         return (
                        //             <tr>
                        //                 <td>{val.sname}</td>
                        //                 <td>{val.age}</td>
                        //                 <td>{val.contact}</td>
                        //                 <td>{val.gender}</td>
                        //                 <td>{val.email}</td>
                        //                 <td>{val.state}</td>
                        //                 <td>{val.city}</td>
                        //                 <td>{val.hobbies}</td>
                        //                 <td><img src={val.photo} height="70px" width="100px"/></td>
                        //                 <td>
                        //                     <button id="myModal" onClick={() => this.handleEdit(val._id)
                        //                     } data-toggle="modal" data-target="#myModal" className="btn btn-info"><i
                        //                         className="fa fa-pencil"></i></button>
                        //                     <button id="mydel" className="btn btn-danger"
                        //                             onClick={() => this.setState({deleteId: val._id})}
                        //                             data-toggle="modal" data-target="#mydel"><i
                        //                         className="fa fa-trash"></i></button>
                        //                 </td>
                        //             </tr>
                        //         )
                        //     })
                        //     :
                    disData.map((val, i) => {
                                return (
                                    <tr>
                                        <td>{val.sname}</td>
                                        <td>{val.age}</td>
                                        <td>{val.contact}</td>
                                        <td>{val.gender}</td>
                                        <td>{val.email}</td>
                                        <td>{val.state}</td>
                                        <td>{val.city}</td>
                                        <td>{val.hobbies}</td>
                                        <td><img src={val.photo} height="70px" width="100px"/></td>
                                        <td>
                                            <button id="myModal" onClick={() => {this.handleEdit(val._id)}
                                            } data-toggle="modal" data-target="#myModal" className="btn btn-info"><i
                                                className="fa fa-pencil"></i></button>
                                            <button id="mydel" className="btn btn-danger" onClick={() => {
                                                this.setState({deleteId: val._id})
                                            }} data-toggle="modal" data-target="#mydel"><i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.stud,
        state:state.state,
        city:state.city,
        obj:state.field,
        page:state.page
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({cityData:cityData,deldata:deldata,insertData:insertData,upadteData:upadteData,pagination:pagination,setField:setFields },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(List);