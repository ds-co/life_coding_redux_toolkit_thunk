import React from "react";
import {Provider,useSelector,useDispatch} from 'react-redux';
import store from './store';
import {up} from './counterSlice';
import {asyncUpFetch} from './counterSlice';

//npm install redux@4.1.2 react-redux 

function Counter(){
  const dispatch = useDispatch();
  const count = useSelector(state=>{
    return state.counter.value;
  });
  const status = useSelector(state=>{
    return state.counter.status;
  });
  return <div>
    <button onClick={()=>{
      dispatch(up(2));
    }}>+</button>  
    
    <button onClick={()=>{
      dispatch(asyncUpFetch());
    }}>+ async fetch</button><br/>
    
    <div>{count} | {status}</div>
  </div>
}

function App() {
  return (
    <Provider store={store}>
      <div>
        <Counter></Counter>
      </div>
    </Provider>
  );
}

export default App;
