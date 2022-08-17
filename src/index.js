import { createStore } from "redux"; //store data를 넣는 곳


const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "Add";
const MINUS = "Minus";

const countModifier = (count = 0, action) => {
    switch(action.type){
        case ADD:
            return count + 1;
            
        case MINUS:
            return count -1;

        default:
            return count;
    }
}

const countStore = createStore(countModifier);

const onChange = () => {
    number.innerText = countStore.getState();
}

countStore.subscribe(onChange);// 변화를 감지

const handleAdd = () => {
    countStore.dispatch({type: ADD});// countmodifier에 메세지를 보내는 역할
}

const handleMinus = () => {
    countStore.dispatch({type: MINUS});
}

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

