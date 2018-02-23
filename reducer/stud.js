export default function (state=[],action) {
    switch (action.type){
        case "Insert_Data":
            console.log(action.res)

            // this.state.alldata.unshift(res.data)
            // this.setState({alldata:this.state.alldata})
            // console.log(this.state.data1)
            //return state.push(action.res)
             break
        case "Update_data":
            console.log(action.res)

            //var index= this.state.alldata.findIndex(x=>x._id===this.state.editId)
            //         console.log(index)
            //
            //         var mydata=this.state.alldata.filter((d)=>d._id!==this.state.editId);
            //         console.log('after filter',mydata)
            //
            //         mydata.splice(index,0,sucess.data);
            //         console.log('correct data',mydata)
            //         this.setState({alldata:mydata},()=>{
           // return state.push(action.res)
            break
        case "Edit_Info":
            console.log(action.res)
           // return state.push(action.res)
            break
        case "Delete_Data":
            console.log(action.res)
            // var mydata=this.state.alldata.filter((d)=>d._id!==sucess.data._id);
            // this.setState({alldata:mydata})
            // console.log('after filter',mydata)
          //  return state.fill(state._id)
            break
        default :
            return state
    }
}
