import React, {useState} from 'react';
import s from "./qwer.module.css"

export type FilterType = "ALL" | "ACTIVE" | "COMPLETED";
export type  TasksType = {
    id: string, title: string, isDone: boolean
}
export type PropsType = {
    tasks: Array<TasksType>,
    title: string
    delTask: (id: string,todoId: string) => void,
    changeFilter: (buttonActiv: FilterType, idTodolist: string) => void,
    addTask: (inp: string,todoId: string) => void,
    changeStatus: (id: string, isdone: boolean, todoId: string) => void,
    filter: FilterType,
    id: string
    delll: (id: string) => void

}


function TodoList(props: PropsType) {
    let clickButton = (buttonActiv: FilterType) => {
        props.changeFilter(buttonActiv, props.id)
    }
    let [inp, setInp] = useState('')
    let [err, setErr] = useState("")
    let add = () => {
        if (inp.trim() == "") {
            setErr('Errors')
            return
        } else {
            props.addTask(inp.trim(), props.id)
            setInp("")
            setErr('')
        }

    }
let de = () => {
        props.delll(props.id)
}
    return (
        <div>
            <h3>{props.title} <button onClick={de}>*</button></h3>
            <div>
                <input className={err ? s.error : ""} type="text"
                       onKeyPress={(e) => {
                           if (e.charCode == 13) {
                               props.addTask(inp, props.id)
                               setInp("")

                           }
                       }}
                       value={inp}
                       onChange={(e) => {
                           setInp(e.currentTarget.value)
                           setErr("")
                       }}/>
                <button onClick={add}>+</button>
                <div className={err ? s.errormessage : ""}>{err}</div>
            </div>
            <ul>
                {
                    props.tasks.map((e) => {
                        let removeHandler = () => {
                            props.delTask(e.id, props.id)
                        }

                        return <li key={e.id} className={e.isDone ? s.isdone : ""}>
                            <input type="checkbox"
                                   checked={e.isDone}
                                   onChange={(t) => {
                                       props.changeStatus(e.id, t.currentTarget.checked, props.id)
                                   }}/>
                            <span>{e.title}</span>
                            <button onClick={removeHandler}>--
                            </button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button className={props.filter === "ALL" ? s.activefilter : ""} onClick={() => {
                    clickButton("ALL")
                }}>All
                </button>
                <button className={props.filter === "ACTIVE" ? s.activefilter : ""} onClick={() => {
                    clickButton("ACTIVE")
                }}>Active
                </button>
                <button className={props.filter === "COMPLETED" ? s.activefilter : ""} onClick={() => {
                    clickButton("COMPLETED")
                }}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;

