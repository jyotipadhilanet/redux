export default function (state=[],action) {
    switch (action.type){
        case 'City_fetch' :
            console.log("in cityData",action.res);
            return action.res;
            break;
    }
    return state;
}