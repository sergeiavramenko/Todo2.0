import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Filter} from "./App";
import p from "./qwer.module.css"


export type TaskType = {
    id: any, title: string, isDone: boolean
}
type PropsType = {
    title: string,
    id: any
    tasks: Array<TaskType>,
    removeTask: (id: any, todolostId: string) => void,
    chandeFilter: (value: Filter , todolistId: string) => void,
    addTask: (inp: string, todolostId: string) => void,
    changeStatus: (id: any, isDone: boolean, todolistId: string) => void,
    filter: Filter
    removeToDolist: (todolistId: string) => void
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
            props.addTask(inp, props.id);
            setInp("")
        }
    }
    const addTask = () => {
        if (inp.trim() === "") {
            setError("Field is requred")
            return
        }
        props.addTask(inp.trim(), props.id);
        setInp("")
        setError("")
    }
    const onAllClickHandler = () => {
        props.chandeFilter("ALL", props.id)
    }
    const onActiveclickHandler = () => {
        props.chandeFilter("Active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.chandeFilter("Completed", props.id)
    }
    const removeToDoList = () => {
        props.removeToDolist(props.id)
    }

    return <div>
        <h3>{props.title}</h3> <button onClick={removeToDoList}>*</button>
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
                        props.removeTask(e.id, props.id)
                    }
                    let onChangeHandler = (i: any) => {
                        props.changeStatus(e.id, i.currentTarget.checked, props.id)

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