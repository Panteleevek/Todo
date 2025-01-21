import { useEffect, useState } from "react";
import { Todo } from "../../interface";

const iconCheck = `
<svg id="Layer_1" viewBox="0 0 512 512" data-name="Layer 1"><path fill='#90EE90' d="m508.485 105.024-318.922 318.922a12 12 0 0 1 -16.971 0l-169.077-169.077a12 12 0 0 1 16.97-16.969l160.592 160.591 310.438-310.437a12 12 0 0 1 16.97 16.97z"/></svg>
`

const TodosList = ({ todos, setTodos }: { todos: Todo[]; setTodos: (val: Todo[]) => void }) => {
    const [filterTodos, setFilterTodos] = useState<Todo[]>(todos);
    const [filterType, setFilterType] = useState<string>('');

    useEffect(() => {
        const sortTodos = [...todos].sort((a, b) => b.id - a.id)
        setFilterTodos(sortTodos)
    },[todos])
    
    const handleTodoUpdate = ({ id, name, value }:{ id: number, name: string, value: boolean }) => {
        const newTodos = todos.map((todo) => {
            if(todo.id === id){
                return ({ ...todo, [name]: value })
            }
            return todo
        });

        return setTodos(newTodos)
    }

    const renderTodos = () => {
            return filterTodos.map((todo) => {
                const { id, value, active, completed } = todo;

                return (
                    <div key={id} className="TodoItem">
                        <div className="TodoItemCheck" style={{ cursor: completed ? 'default' : 'pointer'}} onClick={() => !completed && handleTodoUpdate({id, name: 'active', value: !active})}>
                            {active && <div className="TodoItemCheckIcon" dangerouslySetInnerHTML={{__html: iconCheck}}></div>}
                        </div>
                        <div onClick={() => !completed ? handleTodoUpdate({id, name: 'completed', value: true }) : null}>
                            <div className="TodoItemText" style={{ opacity: completed ? 0.5 : 1, cursor: completed ? 'default' : 'pointer'}}>{value} {completed && <div className="TodoItemCompleted"></div>}</div>
                        </div>
                    </div>
                )
            })
    };
    
    if(Array.isArray(filterTodos)){
        const leftTodos = filterTodos.filter((todo) => !todo?.completed)
        const countLeftTodos = `${leftTodos.length} items left`;
        
        const handleFilterTodos = (type: string) => {
            const newTodos: Todo[] = todos.filter((todo) =>todo[type as keyof typeof todo])  
            setFilterType(type)
            if(type === 'all') {
               return setFilterTodos(todos)    
            }
            
            return setFilterTodos(newTodos)
        };

        const handleClear = () => {
            const newTodos: Todo[] = todos.filter((todo) => !todo.completed)  

            return setTodos(newTodos);
        }

        return (
            <div>
                <div className="TodoItems">{renderTodos()}</div>
                <div className='TodoItemsControls'>
                    <div className="TodoItemsCount">{countLeftTodos}</div>
                    <div className="TodoButtonsFilter">
                    {['all', 'active', 'completed'].map((btn) => {
                        const isActiveType = btn === filterType;
                        return (
                        <div key={btn} className={isActiveType ? "TodoButtonFilterActive" : "TodoButtonFilter"} onClick={() => handleFilterTodos(btn)}>
                           {String(btn).charAt(0).toUpperCase() + String(btn).slice(1)}
                        </div>
                        )
                    })}
                    </div>
                    <div className="TodoButtonClear" onClick={handleClear}>Clear completed</div>
                </div>
            </div>
        )
    }

    return null;
}

export default TodosList;