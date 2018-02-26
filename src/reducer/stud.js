export default function (state=[],action) {
    switch (action.type){
        case 'Fetch_User' :
            console.log("in reducer",action.res);
            return action.res;
            break;
        case "Insert_Data":
            console.log("state",state)
            debugger;
            return [...state,action.res];
            break

        case "Update_data":
                    console.log("In reducer Update",action.res)
                    var index= [...state].findIndex(x=>x._id===action.res._id)
                    console.log(index)
                    var mydata=[...state].filter((d)=>d._id!==action.res._id);
                    console.log('after filter',mydata)
                    mydata.splice(index,0,action.res);
                    console.log('correct data',mydata)
            return mydata;
            break
        case "Delete_Data":
            console.log("In reducer Delete",action.res._id)
            console.log('state data',state);
            var mydata=[...state];//.filter((d)=>d._id!=action.res._id);
            console.log("In reducer after Delete Data is=",mydata)
            return mydata
            break;
        default :
            return state
    }
}