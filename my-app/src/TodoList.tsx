import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {Filter} from "./App";

export type TaskType = {
    id: any, title: string, isDone: boolean
}
type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: number) => void,
    chandeFilter: (value: Filter) => void,
    addTask: (inp: string) => void,

}

export function TodoList(props: PropsType) {
    let [inp, setInp] = useState("a");
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInp(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(inp);
            setInp("")
        }
    }
    const addTask = () => {
        props.addTask(inp);
        setInp("")
    }
    const onAllClickHandler = () => {
        props.chandeFilter("ALL")
    }
    const onActiveclickHandler = () => {
        props.chandeFilter("Active")
    }
    const onCompletedClickHandler = () => {
        props.chandeFilter("Completed")
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={inp}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map((e) => {
                    let RemoveT = () => {
                        props.removeTask(e.id)
                    }

                    return <li key={e.id}><input type='checkbox' checked={e.isDone}/>
                        <span>{e.title}</span>
                        <button onClick={RemoveT}>*
                        </button>
                    </li>
                })
            }

        </ul>
        <div>
            <button onClick={onAllClickHandler}>ALL</button>
            <button onClick={onActiveclickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}