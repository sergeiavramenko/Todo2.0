import React, {useState} from 'react';

export type FilterType = "ALL" | "ACTIVE" | "COMPLETED";
export type  TasksType = {
    id: any, title: string, isDone: boolean
}
export type PropsType = {
    tasks: Array<TasksType>
    delTask: (id: any) => void,
    changeFilter: (buttonActiv: FilterType) => void,
    addTask: (inp: string) => void
}


function TodoList(props: PropsType) {
    let clickButton = (buttonActiv: FilterType) => {
        props.changeFilter(buttonActiv)
    }
    let [inp, setInp] = useState('qweq')
    let add = (inp: string) => {
        props.addTask(inp)
        setInp("")
    }
    return (
        <div>
            <h3>HI</h3>
            <div>
                <input type="text" value={inp} onChange={(e) => {
                    setInp(e.currentTarget.value)
                }}/>
                <button onClick={() => {
                    add(inp)
                }}>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(e => <li>
                        <input type="checkbox" checked={e.isDone}/>
                        <span>{e.title}</span>
                        <button onClick={() => {
                            props.delTask(e.id)
                        }}>--
                        </button>
                    </li>)
                }

            </ul>
            <div>
                <button onClick={() => {
                    clickButton("ALL")
                }}>All
                </button>
                <button onClick={() => {
                    clickButton("ACTIVE")
                }}>Active
                </button>
                <button onClick={() => {
                    clickButton("COMPLETED")
                }}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;

