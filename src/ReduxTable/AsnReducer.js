
const initialState = {
    fetching : false,
    fetched : false,
    asnList : [],
    error : null
}
const asn_reducer = function(state = initialState,action){

    switch(action.type){
        case "ASN_PENDING" : {
            return {...state,fetching : true};
            
        }
        case "ASN_FULFILLED" : {
            return {...state,asnList : action.payload.data, fetching : false,fetched : true};
        }
        case "ASN_REJECTED" : {
            return {...state,fetching : false , fetched : false};
        }
        default :
            return state;
    }
}

export default asn_reducer;