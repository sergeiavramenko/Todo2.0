import React, {useState} from 'react';

export type FilterType = "ALL" | "ACTIVE" | "COMPLETED";
export type  TasksType = {
    id: string, title: string, isDone: boolean
}
export type PropsType = {
    tasks: Array<TasksType>
    delTask: (id: string) => void,
    changeFilter: (buttonActiv: FilterType) => void,
    addTask: (inp: string) => void
}


function TodoList(props: PropsType) {
    let clickButton = (buttonActiv: FilterType) => {
        props.changeFilter(buttonActiv)
    }
    let [inp, setInp] = useState('')
    let add = () => {
        props.addTask(inp)
        setInp("")
    }

    return (
        <div>
            <h3>HI</h3>
            <div>
                <input type="text"
                       onKeyPress={(e) => {
                           if (e.charCode == 13) {
                               props.addTask(inp)
                               setInp("")
                           }
                       }}
                       value={inp}
                       onChange={(e) => {
                    setInp(e.currentTarget.value)
                }}/>
                <button onClick={add}>+  </button>
            </div>
            <ul>
                {
                    props.tasks.map((e) => {

                        let removeHandler = () => {
                            props.delTask(e.id)
                        }
                        return <li key={e.id} >
                        <input type="checkbox" checked={e.isDone}/>
                        <span>{e.title}</span>
                        <button onClick={removeHandler}>--
                        </button>
                    </li>})
                }

            </ul>
            <div>
                <button onClick={() => {   clickButton("ALL")  }}>All   </button>
                <button onClick={() => {  clickButton("ACTIVE")   }}>Active     </button>
                <button onClick={() => {  clickButton("COMPLETED")  }}>Completed     </button>
            </div>
        </div>
    );
}

export default TodoList;

