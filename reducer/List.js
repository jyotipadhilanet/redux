export default function (state=[],action) {
    switch (action.type){
        case 'Fetch_User' :
            console.log("in reducer",action.res);
            return action.res;
            break;
    }
    return state;
}