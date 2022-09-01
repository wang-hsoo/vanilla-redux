import {createStore} from "redux";
import { createAction, createReducer, configureStore, createSlice } from "@reduxjs/toolkit";


const getToDo = JSON.parse(localStorage.getItem("toDo"));

/*const reducer = (state = JSON.parse(getToDo) || [], action) => {
    switch(action.type){
        case addToDo.type:
            const toDo = [{text: action.payload, id: Date.now()}, ...state]
            localStorage.setItem("toDo", JSON.stringify(toDo));
            return toDo;
        case deleteToDo.type:
            const todo = state.filter(toDo => toDo.id !== action.payload);
            localStorage.setItem("toDo", JSON.stringify(todo));
            return todo;
        default:
            return state;
    }
}*/

/* const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE")

const reducer = createReducer([], {
    // state argument 를 mutate하거나 new state를 리턴해야 한다
    [addToDo]: (state, action) => {
        state.push({text: action.payload, id: Date.now()});
    },
    [deleteToDo]: (state, action) => 
        state.filter(toDo => toDo.id !== action.payload)
    
}) */

//createSlice reducer 함수와 action creator를 포함한 객체
const toDos =createSlice({
    name: 'toDosReducer',
    initialState: getToDo || [],
    reducers: {
        add:(state, action) => {
            const toDo = {text: action.payload, id: Date.now()};
            state.push(toDo);
            const toDos = [...getToDo, toDo];
            localStorage.setItem("toDo", JSON.stringify(toDos));
        },
        remove: (state, action) => {
            const toDo = state.filter(toDo => toDo.id !== action.payload);
            localStorage.setItem("toDo", JSON.stringify(toDo));
            return toDo;
        }
    }
})

const store = configureStore({reducer: toDos.reducer});
//configureStore reducer에서 반환된 새로운 state를 store라는 객체로 정리해 관리하는 곳


export const {add, remove} = toDos.actions;

export default store;