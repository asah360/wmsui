
import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

function getAsnCols(data){
  console.log("Complete ASN data : ",data);
}
export const getAsnList = async () => {
  const { data } = await instance.get("cbo/asn");
  console.log("Asn Data is : ",data);
  getAsnCols(data);
  return data;
};

let nextIdVal = 0;

export function nextID() {
  nextIdVal += 1;
  return nextIdVal;
}

export const ASN_FETCH = createAsyncThunk('asn/fetchAsn', async() =>
  {
    const response = await axios.get("http://localhost:8080/cbo/asn")
    console.log("Data from reducer : ",response.data);
    return response.data
  })
export const asnSlice = createSlice({
  name: "asn",
  initialState: {
    list: [{ name: "Joe", img: "/img/driver.png", id: nextID() },
    { name: "Mary", img: "/img/driver2.png", id: nextID() },
  ],
    loading: "idle"
  },
  extraReducers : {
    [ASN_FETCH.fulfilled] : (state ,action) => {
      state.list.push(action.payload);
    }
  },
  reducers: {
    /*
    ASN_PENDING: (state, action) =>{
      console.log("ASN is loading:",action.payload);
      state.loading = true;
    },
    ASN_FULFILLED: (state, action) =>{
      console.log("ASN is Fulfilled:",action.payload);
      state.list(action.payload.data);
      state.loading = false;
    },
    ASN_REJECTED: (state, action) =>{
      console.log("ASN is Rejected:");
      state.loading = "idle";
    },
    */
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.list.push(action.payload);
    },
    remove: (state, action) => {
      const removedIds = action.payload;
      state.list = state.list.filter((person) => {
        return !removedIds.includes(person.id);
      });
    },
    update: (state, action) => {
      state.list = state.list.map((asn) => {
        if (asn.id === action.payload.id) {
          return action.payload;
        }
        return asn;
      });
    },
  },
});

export const {add, remove, update } = asnSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*
export const ASN_FETCH = () => async (dispatch) => {
  dispatch({type : "ASN_PENDING"})
  axios.get("http://localhost:8080/cbo/asn")
    .then((response) =>
    {
      dispatch({type:"ASN_FULFILLED",payload:response.data})
    })
    .catch((err) => {
      dispatch({type:"ASN_REJECTED",payload: err})
    })
};
*/
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAsn= (state) => state.asn.list;
export const selectLoading = (state) => state.asn.loading;

export default asnSlice.reducer;
