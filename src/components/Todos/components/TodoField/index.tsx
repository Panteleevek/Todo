
import React, { useState } from "react";
import { Todo } from "../../interface";

const icon = `
<svg x="0px" y="0px" viewBox="0 0 511.998 511.998" style="enable-background:new 0 0 511.998 511.998;" xml:space="preserve"><path style="fill:#303C42;" d="M255.999,384.004c-2.656,0-5.313-0.99-7.375-2.958L3.29,146.379 c-4.25-4.073-4.406-10.823-0.333-15.083c4.063-4.26,10.812-4.427,15.083-0.333l237.958,227.615l237.958-227.615 c4.281-4.073,11.021-3.906,15.083,0.333c4.073,4.26,3.917,11.01-0.333,15.083L263.374,381.046 C261.311,383.015,258.655,384.004,255.999,384.004z"/><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-45.6831" y1="642.2841" x2="-25.8849" y2="633.0515" gradientTransform="matrix(21.3333 0 0 -21.3333 996.3579 13791.6406)"><stop offset="0" style="stop-color:#FFFFFF;stop-opacity:0.2"/><stop offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/></linearGradient><path style="fill:url(#SVGID_1_);" d="M255.999,384.004c-2.656,0-5.313-0.99-7.375-2.958L3.29,146.379 c-4.25-4.073-4.406-10.823-0.333-15.083c4.063-4.26,10.812-4.427,15.083-0.333l237.958,227.615l237.958-227.615 c4.281-4.073,11.021-3.906,15.083,0.333c4.073,4.26,3.917,11.01-0.333,15.083L263.374,381.046 C261.311,383.015,258.655,384.004,255.999,384.004z"/></svg>
`

const TodoField = ({ todos, setTodos, showTodos, setShowTodos }: { todos: Todo[]; setTodos: (val: Todo[]) => void; showTodos: boolean, setShowTodos: (val: boolean) => void; }) => {
    const [valueText, setValueText] = useState<string>('');

    const date = new Date();
    
    const handleAddTodo = () => {
        if(valueText){
            setTodos([ ...todos, { id: date.getTime(), value: valueText}]);
            setValueText('');
        }
    };

    const handleChangeTodo: React.ChangeEventHandler<
    HTMLInputElement
> = (e) => {
        setValueText(e.target.value)
        e.preventDefault();
    }

    const renderIconField = () => {
        if(Array.isArray(todos) && todos.length > 0){
            return (
                <div onClick={() => setShowTodos(!showTodos)} className="TodoFieldInputIcon" dangerouslySetInnerHTML={{ __html: icon}} style={{ transform: showTodos ? 'rotate(180deg)' : 'rotate(0deg)' }}></div>
            )
        }
        return null;
    }
    return (
            <div className="TodoField">
                {renderIconField()}
                <input className="TodoFieldInput" placeholder="What needs to be done?" onChange={handleChangeTodo} value={valueText} onKeyDown={(e) => { 
                    if (e.key === "Enter") 
                        handleAddTodo(); 
                    }} 
                 />
            </div>
    )
}

export default TodoField