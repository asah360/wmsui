import { createSlice,createEntityAdapter,createAsyncThunk,createSelector } from "@reduxjs/toolkit";
import {normalize,schema} from 'normalizr';
import axios from 'axios';

export const asnIdEntity = new schema.Entity('asnId');
export const asnCodeEntity = new schema.Entity('asnCode');

export const asnEntity = new schema.Entity('asn',{
  id : asnIdEntity,
  name : asnCodeEntity
})

const asnAdapter = createEntityAdapter();

export const fetchAsn = createAsyncThunk('asn/fetchAsn', async() =>
  {
    const response = await axios.get("http://localhost:8080/cbo/asn")
    const normalized = normalize(response.data,asnEntity);

    console.log("Data from reducer : ",response.data);
    return normalized.entities;
  })

let nextIdVal = 0;

export function nextID() {
  nextIdVal += 1;
  return nextIdVal;
}

export const asnSlice = createSlice({
  name: "asn",
  initialState: asnAdapter.getInitialState({loading:false}),
  reducers: {
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
      state.list = state.list.map((person) => {
        if (person.id === action.payload.id) {
          return action.payload;
        }
        return person;
      });
    },
  },
  extraReducers: {
    [fetchAsn.fulfilled]: (state,action) => {
      state.loading = false;
      asnAdapter.upsertMany(state,action.payload.asn)
    }
  },
});

export const { add, remove, update } = asnSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    //dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectasn = (state) => state.asn.list;
export const selectLoading = (state) => state.asn.loading;
export const {
  selectById: selectAsnById,
  selectIds: selectAsnIds,
  selectEntities: selectAsnEntities,
  selectAll: selectAllAsn,
  selectTotal: selectTotalAsn,
} = asnAdapter.getSelectors((state) => state.asn)

export default asnSlice.reducer;
