export default function (state=[],action) {
    switch (action.type){
        case "login_check" :
            console.log("In Login reducer ",action.res);
            localStorage.setItem('user',action.res)
            return action.res;
            break;
    }
    return state;
}