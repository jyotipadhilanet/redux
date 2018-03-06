import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {insertData,updateData,deleteData,cityData} from '../action/index'
class List extends Component{
   constructor(props){
       super(props)
       this.state={
           name:'',
           age:'',
           password:'',
           state:'',
           city:'',
           email:'',
           contact:'',
           hobby:[],
           gender:'',
           photo:'',
           dob:'',

           deleteId:'',
           editId:'',
           isEditing:false
       }
   }

    componentWillReceiveProps(nextProps){
     console.log(nextProps.list)
     console.log(nextProps.state)
     console.log(nextProps.city)
    }


    handleHobby=(e)=>{
        if(this.state.hobby.indexOf(e.target.value)==-1)
        this.state.hobby.push(e.target.value)
        else
            this.state.hobby.pop(e.target.value)
        console.log(this.state.hobby)
    }
    handleState=(e)=>{
        this.setState({city:''})
        this.setState({state:e.target.selectedOptions[0].value},
            ()=>{this.props.cityData(this.state.state)})
    }

    handleEdit=(e)=>{
        console.log(e.target.id)
        this.props.list.map((v,i)=>{
            if(v._id===e.target.id){
              this.setState({
                  isEditing: true,
                  editId: v._id,
                  name: v.name,
                  age: v.age,
                  password: v.password,
                  state: v.state,
                  city: v.city,
                  email: v.email,
                  contact: v.contact,
                  hobby: v.hobby,
                  gender: v.gender,
                  photo: v.photo,
                  dob: v.dob
              },()=>{this.state.dob})
            }
        })
    }

    clearData=()=>{
        console.log("clearData")
        this.setState({
            isEditing: false,
            editId:'',
            name:'',
            age:'',
            password:'',
            state:'',
            city:'',
            email:'',
            contact:'',
            hobby:[],
            gender:'',
            photo:'',
            dob:''})
   }


    handleInsert=()=>{
      console.log(this.state)
        var formdata=new FormData()
        formdata.append('name',this.state.name)
        formdata.append('password',this.state.password)
        formdata.append('age',this.state.age)
        formdata.append('state',this.state.state)
        formdata.append('city',this.state.city)
        formdata.append('contact',this.state.contact)
        formdata.append('email',this.state.email)
        formdata.append('hobby',this.state.hobby)
        formdata.append('photo',this.state.photo)
        formdata.append('gender',this.state.gender)
        formdata.append('dob',this.state.dob)
        this.props.insertData(formdata)
    }

    handleUpdate=()=>{
        var formdata=new FormData()
        formdata.append('name',this.state.name)
        formdata.append('password',this.state.password)
        formdata.append('age',this.state.age)
        formdata.append('state',this.state.state)
        formdata.append('city',this.state.city)
        formdata.append('contact',this.state.contact)
        formdata.append('email',this.state.email)
        formdata.append('hobby',this.state.hobby)
        formdata.append('photo',this.state.photo)
        formdata.append('gender',this.state.gender)
        formdata.append('dob',this.state.dob)
        formdata.append('id',this.state.editId)
        this.props.updateData(formdata)
        this.clearData()
    }

    handleDelete(){
        console.log(this.state.deleteId)
      //  this.props.deleteData(this.state.deleteId)
    }


     componentWillMount(){
         if(localStorage.getItem('user')!=="success"){
             this.props.history.push('/')
         }
     }
    render(){
        console.log(this.state.dob)
        var dt=this.state.dob.split("T")
        console.log(dt[0])
        return(
            <div>

                <button onClick={this.clearData} type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    Open modal
                </button>

                <div class="modal fade" id="myModal">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h4 class="modal-title">Modal Heading</h4>
                                <button type="button" onClick={this.clearData} class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body">
   <form onSubmit={(e)=>e.preventDefault()}>
       Name:<input type="text"  value={this.state.name}
                   onChange={(e)=>{this.setState({name:e.target.value})}} /> <br/>
       Age:<input type="number" value={this.state.age}
                  onChange={(e)=>{this.setState({age:e.target.value})}} /> <br/>
       Password:<input
             type="password" onChange={(e)=>{this.setState({password:e.target.value})}} /> <br/>
       Email:<input value={this.state.email}
       type="text" onChange={(e)=>{this.setState({email:e.target.value})}} /> <br/>
       Contact:<input value={this.state.contact}
       type="number" onChange={(e)=>{this.setState({contact:e.target.value})}} /> <br/>
       Photo:
       {(this.state.isEditing && this.state.photo)?
           <img src={'http://localhost:5000/upload/'+this.state.photo} width="100px" height="100px" />:''}
       <input type="file" onChange={(e)=>{this.setState({photo:e.target.files[0]})}} /> <br/>
       Date of Birth:<input type="date"
                            value={dt[0]}
                            onChange={(e)=>{this.setState({dob:e.target.value})}} /> <br/>
       gender:<input type="radio" onChange={(e)=>{this.setState({gender:e.target.value})}}
                value="Male"
                     checked={(this.state.gender=="Male")?'checked':''}
                     name="gender" />  Male
       <input type="radio" onChange={(e)=>{this.setState({gender:e.target.value})}}
              checked={(this.state.gender=="Female")?'checked':''}
              value="Female"  name="gender" /> Female<br/>
       Hobby:
       <input type="checkbox" onChange={this.handleHobby}
            // checked={(this.state.hobby[0].contains("Sing"))?'checked':''}
              value="Dance"/>  Dance
       <input type="checkbox" onChange={this.handleHobby}
             //checked={(this.state.hobby[0].contains("Sing"))?'checked':''}
              value="Sing"/>  Sing
       <input type="checkbox" onChange={this.handleHobby}
              //checked={(this.state.hobby[0].contains("Study"))?'checked':''}
              value="Study"/>  Study <br/>
       State:
       <select value={this.state.state} onChange={this.handleState}>
         <option>select state</option>
       {
           this.props.state.map((v,i)=>{
               return(
                   <option key={v._id} value={v.name}>{v.name}</option>
               )
           })
       }
       </select><br/>

       city:
       <select value={this.state.city} onChange={(e)=>{this.setState({city:e.target.selectedOptions[0].value})}}>
           <option>{this.state.city?this.state.city:'select city'}</option>
           {
               this.props.city.map((v,i)=>{
                   return(
                   (this.state.city==v.name)?'':<option key={v._id} value={v.name}>{v.name}</option>
                   )
               })
           }
       </select>
       <br/>
   </form>
    </div>

                            <div class="modal-footer">
                                {this.state.isEditing?<button type="button" onClick={this.handleUpdate}  class="btn btn-primary" data-dismiss="modal">Update</button>  :
                                    <button type="button" onClick={this.handleInsert}  class="btn btn-primary" data-dismiss="modal">Insert</button> }

                                <button type="button" onClick={this.clearData} class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>






                <div class="modal fade" id="mydel">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h4 class="modal-title">Modal Heading</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body">
                               R U sure you want to delete ???
                                {console.log(this.state.deleteId)}
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" onClick={this.handleDelete} data-dismiss="modal">Yes</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>
                            </div>

                        </div>
                    </div>
                </div>






               <table border='1' className="table table-striped" >
                   <tbody>
                   <tr>
                       <td>Name</td>
                       <td>Age</td>
                       <td>state</td>
                       <td>city</td>
                       <td>email</td>
                       <td>contact</td>
                       <td>hobby</td>
                       <td>gender</td>
                       <td>Date of Birth</td>
                       <td>photo</td>
                       <td>Action</td>
                   </tr>
                   {
                       this.props.list.map((v,i)=>{
                           return(
                               <tr>
                                   <td>{v.name}</td>
                                   <td>{v.age}</td>
                                   <td>{v.state}</td>
                                   <td>{v.city}</td>
                                   <td>{v.email}</td>
                                   <td>{v.contact}</td>
                                   <td>{v.hobby}</td>
                                   <td>{v.gender}</td>
                                   <td>{new Date(v.dob).toLocaleDateString()}</td>
                                   <td><img src={'http://localhost:5000/upload/'+v.photo} height="100px" width="100px" /></td>
                                   <td><button type="button" id={v._id} onClick={this.handleEdit} className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                      Edit
                                   </button>
                                       <button type="button" id={v._id} onClick={(e)=>{this.setState({deleteId:e.target.id})}} className="btn btn-danger" data-toggle="modal" data-target="#mydel" >
                                           Delete
                                       </button>
                                   </td>

                               </tr>
                           )
                       })
                   }
                   </tbody>
               </table>
            </div>)
    }


}
function mapStateToProps(state) {
    return{
        state:state.state,
        city:state.city,
        list:state.stud
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({insertData,cityData,updateData,deleteData},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(List)
