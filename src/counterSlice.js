import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const asyncUpFetch = createAsyncThunk(
    'counterSlice/asyncUpFetch',// action type
    async () => {
        const resp = await fetch('https://api.countapi.xyz/hit/opesaljkdfslkjfsadf.com/visits')
        const data = await resp.json(); // 가져온 데이터를 json로 바꿔주고
        return data.value; // return 하면 return한 값을 가지고 store에 state를 바꿈꿈
    }
)
const counterSlice = createSlice({
    name:'counterSlice',
    initialState:{
      value:0,
      status:'Welcome'
    },
    reducers:{
      up:(state, action)=>{
        state.value = state.value + action.payload;
      }
    },
    // 비동기 작업은 extraReducers를 사용할 것
    // 왜냐, action create를 자동으로 만들어주지 않기 때문
    // pending fulfilled rejected 라는 세 가지 케이스를 가짐
     extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.pending, (state,action)=>{
      state.status = 'Loading';
    })
    builder.addCase(asyncUpFetch.fulfilled, (state,action)=>{
      state.value = action.payload;
      state.status = 'complete';
    })
    builder.addCase(asyncUpFetch.rejected, (state,action)=>{
      state.status = 'fail';
    })
  }
});

export default counterSlice;
export const {up, set} = counterSlice.actions;
export {asyncUpFetch}