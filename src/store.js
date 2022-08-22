import {createStore} from "redux";
import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE")

const getToDo = localStorage.getItem("toDo");

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

const reducer = createReducer([], {
    // state argument 를 mutate하거나 new state를 리턴해야 한다
    [addToDo]: (state, action) => {
        state.push({text: action.payload, id: Date.now()});
    },
    [deleteToDo]: (state, action) => 
        state.filter(toDo => toDo.id !== action.payload)
    
})

const store = configureStore({reducer});

export const actionCreators = {
    addToDo,
    deleteToDo
}

export default store;