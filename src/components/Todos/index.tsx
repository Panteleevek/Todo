import React, { useEffect, useState } from "react";
import { Todo } from "./interface";
import TodoField from "./components/TodoField";
import TodosList from "./components/TodoList";

const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [showTodos, setShowTodos] = useState<boolean>(false);

    useEffect(() => {
        if(Array.isArray(todos)){
            if(!showTodos && todos.length > 0){
                setShowTodos(true)
            }
    
            if(showTodos && todos.length === 0 ){
                setShowTodos(false)
            }
        }
    },[todos])

    return (
        <div className='Container'>
            <div className='Title'>Todos</div>
            <TodoField todos={todos} setTodos={setTodos} showTodos={showTodos} setShowTodos={setShowTodos}/>
            {showTodos && <TodosList todos={todos} setTodos={setTodos} />}
        </div>
    )
}

export default Todos;