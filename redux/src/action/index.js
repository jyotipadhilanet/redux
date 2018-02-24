import axios from 'axios'
export const AllData=()=>{
    return function (dispatch) {
        return axios.get('http://localhost:5000/fetchdata').then((res)=>{
            console.log(res);
            dispatch({type:"Fetch_User", res:res.data});
        })
    }
}

export const stateData=()=>{
    return function (dispatch) {
        return axios.get('http://localhost:5000/statefetch').then((res)=>{
                console.log("In action",res);
                dispatch({type:"State_fetch",res:res.data})
            }
        )
    }
}

export const cityData=(state)=>{
    return function (dispatch) {
        return axios.post('http://localhost:5000/cityfetch/'+state).then((res)=>{
                console.log("In action",res);
                dispatch({type:"City_fetch",res:res.data})
            }
        )
    }
}

export const deldata=(deleteId)=>{
    return function (dispatch) {
        return   axios.post('http://localhost:5000/del',{id:deleteId}).then((sucess)=>{
            console.log("In delete",sucess);
            dispatch({type:"Delete_Data",res:sucess.data})
        })
    }
}

export const insertData=(name,age,contact,password,gender,email,hobyArr,state,city,photo1)=>{
    return function (dispatch) {
        debugger;
        return axios.post( 'http://localhost:5000/insert',{
            sname:name,
            age:age,
            contact:contact,
            password:password,
            gender:gender,
            email:email,
            hobbies:hobyArr,
            state:state,
            city:city,
            photo:photo1,
            flag:1
        }).then((res)=>{
            console.log(res)
            dispatch({type:"Insert_Data",res:res.data})
        })
    }
}
export const upadteData=(id,name,age,contact,password,gender,email,hobbies,state,city,photo1)=> {
    return function (dispatch) {
        return axios.post('http://localhost:5000/upd',{
            id:id,
            age:age,
            password:password,
            gender:gender,
            sname:name,
            state:state,
            city:city,
            email:email,
            photo:photo1,
            contact:contact,
            hobbies:hobbies
        }).then((sucess)=>{
            console.log('after back from update=',sucess.data)
            dispatch({type:"Update_data",res:sucess.data})
        })
    }
}

export const setFields=(obj)=>{
    return ((dispatch,getState) =>{
        let user = getState().obj
        dispatch({type:'SET_FIELDS',payload:{...user,obj}})
    })
}
    
export const pagination=(p,l)=>{
    return function (dispatch) {
       return dispatch({type:'PAGINATE',payload:{'pagenum':p,'limit':l}})  
    }
}
// export const sort=(e)=>{
//     return function (dispatch) {
//         axios.post('http://localhost:5000/fetlimit',{page:p,record:r}).then((res)=>{
//                 dispatch({type:'Set_Field',res:res.data})
//             }
//         )
//     }
// }
// export const dsort=(e)=>{
//     return function (dispatch) {
//         axios.post('http://localhost:5000/fetlimit',{page:p,record:r}).then((res)=>{
//                 dispatch({type:'Set_Field',res:res.data})
//             }
//         )
//     }
// }
// export const search=(val)=>{
//     return function (dispatch) {
//         // var arr = []
//         // var data = e.target.value
//         // if (e.target.value.length > 0) {
//         //     this.setState({isSearch: true})
//         //     this.props.user.map((val, i) => {
//         //         if (val.sname.includes(data) || val.age.includes(data) || val.contact.includes(data) || val.gender.includes(data) ||
//         //             val.email.includes(data) || val.state.includes(data) || val.city.includes(data) || val.hobbies.includes(data))
//         //             arr.push(val)
//         //     })
//         //     this.setState({searchData: arr})
//         // }
//         // else {
//         //     this.setState({isSearch: false})
//         // }
//         axios.post('http://localhost:5000/fetlimit',{page:p,record:r}).then((res)=>{
//                 dispatch({type:'Set_Field',res:res.data})
//             }
//         )
//     }
// }




