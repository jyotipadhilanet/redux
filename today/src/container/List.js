// http://idea.ibdyr.com
//  http://idea.iteblog.com/key.php
//   http://www.aku.vn/idea
//  http://www.imsxm.com/jetbrains-license-server.html




import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {cityData,deldata,insertData,edtInfo,upadteData,Alldeldata} from '../action/index'

var error=""


class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disData: [],
            searchData: [],
            hobyArr: [],
            chkdel:[],
            isSearch: false,
            isEditing: false,
            isphotoChange:false,
            isCorrect:true,
            deleteId: '',
            editId: '',
            numrec: 3,

            sname: '',
            age: '',
            contact: '',
            dob:'',
            gender: '',
            email: '',
            hobbies: '',
            dels:'',
            state: '',
            city: '',
            password: '',
            photo: '',
            photo1:'',
            flag:true,





            error:'',
            errName:'',
            errAge:'',
            errGen:'',
            errState:'',
            errCity:'',
            errContat:'' ,
            errPass:''
        }
    }
    componentWillReceiveProps(nextProps){
        console.log("In componentWillReceiveProps",nextProps.user)
        this.setState({ allData:nextProps.user },()=>{this.fetlimit(1)})
    }
    componentWillMount(){
        if(localStorage.getItem('user').length<=0){
             this.props.history.push('/')
        }
        console.log("In componentWillMount")
        this.fetlimit(1)
    }
    handle = (e) => {
        this.state.city=''
        this.props.cityData(e.target.options[e.target.selectedIndex].value)
        this.setState({state: e.target.options[e.target.selectedIndex].value})
    }
    logout=()=>{
        localStorage.setItem('user','')
        this.props.history.push('/')
    }
    clearData = () => {
        this.setState({isEditing: false,isphotoChange:false,sname: '', age: '', contact: '', gender: '', email: '', hobbies: '', state: '', city: '', password: '', photo: '', photo1: ''})
        document.getElementById('password').value = ''
    }
    fetlimit = (e) => {
        var last = e * this.state.numrec;
        var start = last - this.state.numrec;
        this.state.disData = this.props.user.slice(start, last)
        this.setState({disdata: this.props.user.slice(start, last)});
    }

    changeNum = (e) => {
        this.setState({numrec: e.target.options[e.target.selectedIndex].value}, () => {
            this.fetlimit(1);
        })
    }

    AllDelete=()=>{
        this.props.Alldeldata(this.state.dels)
    }



    hobyArr = (e) => {
        if(this.state.hobyArr.indexOf(e.target.value)==-1)
              this.state.hobyArr.push(e.target.value)
        else
            this.state.hobyArr.pop(e.target.value)
        this.setState({hobbies: this.state.hobyArr.join(",")},()=> console.log(this.state.hobbies))
    }

    sort = (e) => {
        var key = e.target.id
        var mydata = [].concat(this.state.disData).sort((a, b) => a[key] > b[key])
        this.setState({disData: mydata})
    }
    dsort = (e) => {
        var key = e.target.id
        var mydata = [].concat(this.state.disData).sort((a, b) => a[key] < b[key])
        this.setState({disData: mydata})
    }
    search = (e) => {
        var arr = []
        var data = e.target.value
        if (e.target.value.length > 0) {
            this.setState({isSearch: true})
            this.props.user.map((val, i) => {
                if (val.sname.includes(data) || val.age.includes(data) || val.contact.includes(data) || val.gender.includes(data) ||
                    val.email.includes(data) || val.state.includes(data) || val.city.includes(data) || val.hobbies.includes(data))
                    arr.push(val)
            })
            this.setState({searchData: arr})
        }
        else {
            this.setState({isSearch: false})
        }
    }

    setFile = (e) => {
        // e.preventDefault();
        // let file = e.target.files[0];
        // let reader = new FileReader();
        // reader.onloadend = () => {
        //     this.setState({
        //         photo: file,
        //         photo1: reader.result
        //     });
        // };
        // reader.readAsDataURL(file);
        // console.log(`File Upload : ${this.state.photo}`);
        this.setState({photo:e.target.files[0]})

    }
    handleDelete=()=>{
        this.props.deldata(this.state.deleteId)
    }
    handleInsert=()=> {

        // if(/^[a-zA-z]{3,50}$/.test(this.state.name)){
        //     error+="Name must be Alpha 3 to 50"+<br/>
        // }
        // if(/^.{5,50}$/.test(this.state.password)) {
        //     error += "Password must be 5 to 50"
        // }
        //
        // if(error.length===0) {
            var formdata = new FormData();
            formdata.append('sname', this.state.sname);
            formdata.append('age', this.state.age)
            formdata.append('contact', this.state.contact)
            formdata.append('password', this.state.password)
            formdata.append('gender', this.state.gender);
            formdata.append('email', this.state.email)
            formdata.append('hobbies', this.state.hobbies)
            formdata.append('state', this.state.state)
            formdata.append('city', this.state.city)
            formdata.append('photo', this.state.photo)
            formdata.append('dob', this.state.dob)

            this.props.insertData(formdata)
       // }
        // this.props.insertData(this.state.sname, this.state.age, this.state.contact, this.state.password,
        //     this.state.gender, this.state.email, this.state.hobbies, this.state.state, this.state.city, this.state.photo)
    }

    handleUpdate=()=> {
        var formdata=new FormData();
        formdata.append('sname',this.state.sname);
        formdata.append('age',this.state.age)
        formdata.append('contact',this.state.contact)
        formdata.append('password',this.state.password)
        formdata.append('gender',this.state.gender);
        formdata.append('email',this.state.email)
        formdata.append('hobbies',this.state.hobbies)
        formdata.append('state',this.state.state)
        formdata.append('city',this.state.city)
        formdata.append('photo',this.state.photo)
        formdata.append('id',this.state.editId)
        formdata.append('dob',this.state.dob)
        //console.log('photo',this.state.photo);
        this.props.upadteData(formdata)
        // this.props.upadteData(this.state.editId,this.state.sname, this.state.age,this.state.contact, this.state.password, this.state.gender,this.state.email,this.state.hobbies,
        //     this.state.state,this.state.city,  this.state.photo1)
    }


    handleEdit=(e)=>{
        this.setState({isEditing:true})
        this.setState({editId:e})
        console.log("Id come in for editing",e)
        this.props.user.map((val,ind)=>{
            if(val._id==e){
                this.setState({sname:val.sname,age:val.age,gender:val.gender,email:val.email,hobbies:val.hobbies,city:val.city,state:val.state,photo:val.photo,contact:val.contact},
                    ()=>console.log("After Edit the info is",this.state))
            }
        })
    }


    chkDelete=(e)=>{
        if(this.state.chkdel.indexOf(e.target.id)==-1)
            this.state.chkdel.push(e.target.id)
        else
            this.state.chkdel.pop(e.target.id)
        this.setState({dels: this.state.chkdel.join(",")},()=> console.log(this.state.dels))
    }


    chkvalidation=(e)=>{
        console.log("In check validation")
        switch (e.target.id){
            case "name":
                if(!(/^[A-Za-z]{3,50}$/).test(e.target.value)){
                    error+="Name must be character between 3 to 50"+"     "
                    console.log(e.target.value)
                    console.log(error)
                }
                break
            case "password":
                if(!(/^.{5,50}$/).test(e.target.value)){
                    error+="Password must be character between 5 to 50"+"     "
                    console.log(e.target.value)
                    console.log(error)
                }
                break
            // case "img":
            //     if((e.target.files[0])){
            //         console.log("true")
            //     }
            //     else {
            //         this.setState({isCorrect:false})
            //         console.log(this.state.isCorrect)
            //     }
            //     break
        }
    }












    render() {
        var len = this.props.user.length;
        var paginate = Math.ceil(this.props.user.length / this.state.numrec)
        var pageArr = []
        for (let i = 1; i <= paginate; i++) {
            pageArr.push(i);
        }
        console.log(len, paginate, pageArr)
        console.log("In DisData...............",this.state.disData)

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
                                                                  className={this.state.flag?"form-control is-valid":"form-control is-invalid" }
                                                                  value={this.state.sname}
                                                                 onBlur={this.chkvalidation}
                                                                  onChange={(e) => {this.setState({sname: e.target.value})

                                        }}/>

                                        </div>
                                        <div className="form-group col-md-6">
                                            Password :- <input type="password" ref="password" id="password"
                                                               placeholder="password" className="form-control is-valid"
                                                               onBlur={this.chkvalidation}
                                                               onChange={(e) => {
                                                                   this.setState({password: e.target.value})
                                                               }}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            Age :- <input type="number" ref="age" id="age" placeholder="age" className="form-control is-valid"
                                                         // onBlur={this.chkvalidation}
                                                          value={this.state.age} onChange={(e) => {this.setState({age: e.target.value})}}
                                        />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            Date of birth :- <input type="date" ref="dob" id="dob" placeholder="Date of birth"
                                                                    className="form-control is-valid"// onBlur={this.chkvalidation}
                                                                    onChange={(e) => {this.setState({dob: new Date(e.target.value)})}}
                                        />
                                        </div>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <div className="form-group col-md-12">
                                            Hobbies :- <input type="checkbox" name="hby" onChange={this.hobyArr}
                                                              class="form-check-input" value="Dance"
                                                              checked={(this.state.hobbies.includes("dance") || this.state.hobbies.includes("Dance") ) ? "checked" : ""}/>dance
                                            <input type="checkbox" name="hby" onChange={this.hobyArr}
                                                   class="form-check-input" value="Sing"
                                                   checked={(this.state.hobbies.includes("Sing")) ? "checked" : ""}/>Sing
                                            <input type="checkbox" name="hby" onChange={this.hobyArr}
                                                   class="form-check-input" value="Study"
                                                   checked={(this.state.hobbies.includes("Study")) ? "checked" : ""}/>Study
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            Image :-
                                            {(this.state.photo)?<img src={'http://localhost:5000/upload/'+this.state.photo} height="100px" width="200px"/> :'' }
                                            <input type="file" ref="img" id="img" placeholder="image" onBlur={this.chkvalidation}
                                                   className="form-control is-valid" onChange={this.setFile}/>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            gender :-
                                            <label class="radio-inline">
                                                <input type="radio" ref="gender" id="gender" name="gender"
                                                       onChange={(e) => this.setState({gender: e.target.value})}
                                                       value="male"
                                                       checked={(this.state.gender == "male") ? "checked" : ""}/>male
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" ref="gender" id="gender" name="gender"
                                                       onChange={(e) => this.setState({gender: e.target.value})}
                                                       value="Female"
                                                       checked={(this.state.gender == "Female") ? "checked" : ""}/>Female
                                            </label>

                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            State
                                            <select id="state" className="form-control is-valid" onChange={this.handle}
                                                    value={this.state.state}>
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
                                            <select id="city" className="form-control is-valid" onChange={(e) => this.setState({city: e.target.options[e.target.selectedIndex].value})}
                                            >
                                                <option>{(this.state.city) ? this.state.city : 'select city'}</option>
                                                {
                                                    this.props.city.map((v, i) => {
                                                        return ((v.name === this.state.city) ? '' :
                                                            <option key={v._id} value={v.name}>{v.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>


                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            Email <input type="email" ref="email" id="email" placeholder="Email"
                                                         className="form-control is-valid" value={this.state.email}
                                                         onChange={(e) => {
                                                             this.setState({email: e.target.value})
                                                         }}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            Contact no. <input type="text" ref="cont" id="cont" placeholder="contact"
                                                               className="form-control is-valid"
                                                               value={this.state.contact} onChange={(e) => {
                                            this.setState({contact: e.target.value})
                                        }}/>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                {(this.state.isEditing) ?
                                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                                            onClick={this.handleUpdate}>Update</button> :
                                    <button  type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleInsert}>Submit</button>
                                }
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
                    <div className="form-group col-md-2">
                        <input type="text" className="form-control is-valid" onChange={this.search}
                               placeholder="search All"/>
                    </div>

                    <div className="form-group col-md-2">
                        <select className="form-control is-valid" id="numrecord" onChange={this.changeNum}>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        {
                            pageArr.map((v, i) => {
                                return <button className="btn btn-primary" type="button" value={v} onClick={() => {
                                    this.fetlimit(v)
                                }}>{v}</button>
                            })
                        }
                    </div>
                    <div className="form-group col-md-1"  >
                        <button class="btn btn-danger" onClick={this.AllDelete}>All delete</button>
                    </div>
                    <div className="form-group col-md-1"  >
                       <button class="btn btn-info" onClick={this.logout}>Logout</button>
                    </div>

                </div>


                <table className="table table-striped">
                    <tbody>
                    <tr>
                        <th>Name<a id="sname" onClick={this.sort}>&#9650;</a>
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
                        (this.state.isSearch) ?
                            this.state.searchData.map((val, i) => {
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
                                        <td><img src={'http://localhost:5000/upload/'+val.photo} height="70px" width="100px"/></td>
                                        <td>
                                            <button id="myModal" onClick={() => this.handleEdit(val._id)
                                            } data-toggle="modal" data-target="#myModal" className="btn btn-info"><i
                                                className="fa fa-pencil"></i></button>
                                            <button id="mydel" className="btn btn-danger"
                                                    onClick={() => this.setState({deleteId: val._id})}
                                                    data-toggle="modal" data-target="#mydel"><i
                                                className="fa fa-trash"></i></button>
                                            <input type="checkbox" id={val._id} key={val._id}
                                                   checked={this.state.dels.includes(val._id)?'checked':''} onChange={this.chkDelete}  />

                                        </td>
                                    </tr>
                                )
                            })
                            : this.state.disData.map((val, i) => {
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
                                        <td><img src={'http://localhost:5000/upload/'+val.photo} height="70px" width="100px"/></td>
                                        <td>
                                            <button id="myModal" onClick={() => {this.handleEdit(val._id)}
                                            } data-toggle="modal" data-target="#myModal" className="btn btn-info"><i
                                                className="fa fa-pencil"></i></button>
                                            <button id="mydel" className="btn btn-danger" onClick={() => {
                                                this.setState({deleteId: val._id})
                                            }} data-toggle="modal" data-target="#mydel"><i className="fa fa-trash"></i>
                                            </button>
                                            <input type="checkbox" id={val._id} key={val._id}
                                                   checked={this.state.dels.includes(val._id)?'checked':''}
                                                   onChange={this.chkDelete}  />
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
        city:state.city
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({cityData,deldata,insertData,edtInfo,upadteData,Alldeldata},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(List);
