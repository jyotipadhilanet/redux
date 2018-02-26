export default function (state=[],action) {
    switch (action.type){
        case 'State_fetch' :
            console.log("in stateData",action.res);
            return action.res;
            break;
    }
    return state;
}