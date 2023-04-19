import React, {useState} from 'react';
import s from "./qwer.module.css"
export type FilterType = "ALL" | "ACTIVE" | "COMPLETED";
export type  TasksType = {
    id: string, title: string, isDone: boolean
}
export type PropsType = {
    tasks: Array<TasksType>
    delTask: (id: string) => void,
    changeFilter: (buttonActiv: FilterType) => void,
    addTask: (inp: string) => void,
    changeStatus: (id: string, isdone: boolean) => void,
    filter: FilterType
}


function TodoList(props: PropsType) {
    let clickButton = (buttonActiv: FilterType) => {
        props.changeFilter(buttonActiv)
    }
    let [inp, setInp] = useState('')
    let [err, setErr] = useState("")
    let add = () => {
        if (inp.trim() == "") {
            setErr('Errors')
            return
        } else {
            props.addTask(inp.trim())
            setInp("")
            setErr('')
        }

    }

    return (
        <div>
            <h3>HI</h3>
            <div>
                <input className={err?  s.error : ""} type="text"
                       onKeyPress={(e) => {
                           if (e.charCode == 13) {
                               props.addTask(inp)
                               setInp("")

                           }
                       }}
                       value={inp}
                       onChange={(e) => {
                    setInp(e.currentTarget.value)
                           setErr("")
                }}/>
                <button onClick={add}>+  </button>
                <div className={err? s.errormessage : ""} >{err}</div>
            </div>
            <ul>
                {
                    props.tasks.map((e) => {
                        let removeHandler = () => {
                            props.delTask(e.id)
                        }

                        return <li key={e.id} className={e.isDone ? s.isdone : "" }>
                        <input type="checkbox"
                               checked={e.isDone}
                               onChange={(t) => { props.changeStatus(e.id, t.currentTarget.checked)  }}/>
                        <span>{e.title}</span>
                        <button onClick={removeHandler}>--
                        </button>
                    </li>})
                }

            </ul>
            <div>
                <button className={ props.filter === "ALL" ? s.activefilter : ""} onClick={() => {   clickButton("ALL")  }}>All   </button>
                <button className={ props.filter === "ACTIVE" ? s.activefilter : ""} onClick={() => {  clickButton("ACTIVE")   }}>Active     </button>
                <button className={ props.filter === "COMPLETED" ? s.activefilter : ""}  onClick={() => {  clickButton("COMPLETED")  }}>Completed     </button>
            </div>
        </div>
    );
}

export default TodoList;

