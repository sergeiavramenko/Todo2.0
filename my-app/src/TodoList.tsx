import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Filter} from "./App";
import p from "./qwer.module.css"


export type TaskType = {
    id: any, title: string, isDone: boolean
}
type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: number) => void,
    chandeFilter: (value: Filter) => void,
    addTask: (inp: string) => void,
    changeStatus: (id: any, isDone: boolean) => void,
    filter: Filter
}

export function TodoList(props: PropsType) {
    let [inp, setInp] = useState("a");
    let [error, setError] = useState("")
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInp(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (e.charCode === 13) {
            props.addTask(inp);
            setInp("")
        }
    }
    const addTask = () => {
        if (inp.trim() === "") {
            setError("Field is requred")
            return
        }
        props.addTask(inp.trim());
        setInp("")
        setError("")
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
                   className={error ? p.error : ""}            />
            <button onClick={addTask}>+</button>
            <div className={error ?  p.error : ""} > Field is required</div>
        </div>
        <ul>
            {
                props.tasks.map((e) => {
                    let RemoveT = () => {
                        props.removeTask(e.id)
                    }
                    let onChangeHandler = (i: any) => {
                        props.changeStatus(e.id, i.currentTarget.checked)

                    }
                    return <li key={e.id} className={e.isDone ? p.isdone: ""} >
                        <input type='checkbox' onChange={onChangeHandler} checked={e.isDone}/>
                        <span>{e.title}</span>
                        <button onClick={RemoveT}>*
                        </button>
                    </li>
                })
            }

        </ul>
        <div>
            <button className={props.filter === "ALL" ? p.activefilter : ""} onClick={onAllClickHandler}>ALL</button>
            <button className={props.filter === "Active" ? p.activefilter: ""} onClick={onActiveclickHandler}>Active</button>
            <button className={props.filter === "Completed" ? p.activefilter : ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}