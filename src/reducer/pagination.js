export default function (state=[],action) {
    switch (action.type){
        case 'PAGINATION' :
            return action.payload;
            break;
    }
    return state;
}