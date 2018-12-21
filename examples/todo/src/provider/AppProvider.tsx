import React from "react";
import { TodoApp } from '../component/page/todo.app';
import { Todo } from '../component/logic/todo';



export function AppProvider(props){

    return (
        <Todo.Provider>
            {props.children}
        </Todo.Provider>

    )
}