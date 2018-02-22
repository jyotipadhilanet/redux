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