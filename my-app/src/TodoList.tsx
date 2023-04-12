import React from "react";
import {Filter} from "./App";

export type TaskType = {
    id: number, title: string, isDone: boolean
}
type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (value : number) => void ,
    chandeFilter: (value : Filter) => void
}

export function TodoList(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input type="text"/>
            <button>+</button>
        </div>
        <ul>
            {
                props.tasks.map(e => <li><input type='checkbox' checked={e.isDone}/>
                    <span>{e.title}</span>
                    <button onClick={() => {
                        props.removeTask(e.id)
                    }}>*
                    </button>
                </li>)

            }


        </ul>
        <div>
            <button onClick={() =>{props.chandeFilter("ALL")   } } >ALL</button>
            <button onClick={() =>{props.chandeFilter("Active")   }} >Active</button>
            <button onClick={() =>{props.chandeFilter("Completed")   }} >Completed</button>
        </div>
    </div>
}