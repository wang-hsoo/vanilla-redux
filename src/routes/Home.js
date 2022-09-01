import React, { useState } from "react";
import {connect} from "react-redux";
import ToDo from "../components/ToDo";
import { add } from "../store";

function Home({toDos, addToDo}){
    const [text,setText] = useState("");
    function onChange(e){
        setText(e.target.value);
    }
    function onSubmit(e){
        e.preventDefault();
        addToDo(text);
        setText("");
    }

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>ADD</button>
            </form>
            <ul>
                {toDos.map((toDo) => (
                    <ToDo {...toDo} key={toDo.id} />
                ))}
            </ul>
        </>
    )
}

function mapStateToProps(state){
    return {toDos: state}
}

function mapDispatchToProps(dispatch){
    return {
        addToDo: (text) => dispatch(add(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);

//mapStateToProps store로부터 state를 가져와서 컴포넌트의 props로 보내게 해준다
//mapDispatchToProps dispatch를 props로 보낼 수 있다