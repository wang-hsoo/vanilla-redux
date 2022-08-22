import {createStore} from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
    return{
        type: ADD,
        text
    };
};

const deleteToDo = (id) => {
    return{
        type: DELETE,
        id : parseInt(id)
    };
};

const getToDo = localStorage.getItem("toDo");

const reducer = (state = JSON.parse(getToDo) || [], action) => {
    switch(action.type){
        case ADD:
            const toDo = [{text: action.text, id: Date.now()}, ...state]
            localStorage.setItem("toDo", JSON.stringify(toDo));
            return toDo;
        case DELETE:
            const todo = state.filter(toDo => toDo.id !== action.id);
            localStorage.setItem("toDo", JSON.stringify(todo));
            return todo;
        default:
            return state;
    }
}

const store = createStore(reducer);

export const actionCreators = {
    addToDo,
    deleteToDo
}

export default store;