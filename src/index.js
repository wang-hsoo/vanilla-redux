import { createStore } from "redux"; //store data를 넣는 곳


// const add = document.getElementById("add");
// const minus = document.getElementById("minus");
// const number = document.querySelector("span");

// const ADD = "Add";
// const MINUS = "Minus";

// const countModifier = (count = 0, action) => {
//     switch(action.type){
//         case ADD:
//             return count + 1;
            
//         case MINUS:
//             return count -1;

//         default:
//             return count;
//     }
// }

// const countStore = createStore(countModifier);

// const onChange = () => {
//     number.innerText = countStore.getState();
// }

// countStore.subscribe(onChange);// 변화를 감지

// const handleAdd = () => {
//     countStore.dispatch({type: ADD});// countmodifier에 메세지를 보내는 역할
// }

// const handleMinus = () => {
//     countStore.dispatch({type: MINUS});
// }

// add.addEventListener("click", handleAdd);
// minus.addEventListener("click", handleMinus);

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const add = (text) => {
    return{
        type: ADD_TODO, text
    }
}

const del = (id) => {
    return{
        type: DELETE_TODO, id
    }
}

const reducer = (state = [], action) => {
    switch(action.type){
        case ADD_TODO:
            const newToDoObj =  {text: action.text, id: Date.now() };
            return [newToDoObj, ...state]; //mutate state X
        
        case DELETE_TODO:
            return state.filter(toDo => toDo.id !== action.id);

        default: 
            return state;
    }
};

const store = createStore(reducer);

const deleteToDo = (e) => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(del(id));
}

const paintToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "DEL";
        btn.addEventListener("click", deleteToDo);
        li.id = toDo.id;
        li.innerText = toDo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    })
}

store.subscribe(paintToDos);

const addToDo = (text) => {
    store.dispatch(add(text))
}

const onSubmit = (e) => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    addToDo(toDo);
}

form.addEventListener("submit", onSubmit);