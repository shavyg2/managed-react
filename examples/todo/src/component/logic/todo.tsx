import ManagedReact from "managed-react";
import uuid from "uuid/v4";
import { Layout } from '../../lib/layout/layout';





export const Todo = ManagedReact.create({
    todos:[],
    layout:Layout
})


.logic((state,dispatch)=>{


    return {
        getTodos(){
            return state.todos
        },
        get total(){
            return state.todos.length;
        },

        newTodo(){
            dispatch(state=>{
                state.todos.push(CreateTodo())
            })
        },
        Completed(todo){
            return ()=>{
                debugger;
                dispatch(state=>{
                    state.todos.find(t=>t.id===todo.id).completed=true
                })
            }
        }

    }
})

.build()


function CreateTodo(){
    return {
        id:uuid(),
        title:"Edit Todo",
        description:"",
        completed:false,
        date:new Date()
    }
}