import React, {useState} from 'react';
import TodoList, {FilterType, TasksType} from "./TodoList";
import {v1} from 'uuid'


function App() {
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "Css", isDone: false},
        {id: v1(), title: "Html", isDone: true},
        {id: v1(), title: "Html", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ]);
    let delTask = (id: number) => {
        let task = tasks.filter(e => e.id !== id)
        setTasks(task)
    }
    let [filter, setFilter] = useState<FilterType>('ALL')
    let tasksForToDoList = tasks;
    if (filter === "COMPLETED") {
        tasksForToDoList = tasks.filter(e => e.isDone === true)
    }    if (filter === "ACTIVE") {
        tasksForToDoList = tasks.filter(e => e.isDone === false)
    }
    let changeFilter = (buttonActiv:FilterType) => {
        setFilter(buttonActiv)
    }
    let addTask = (inp: string) => {
        let newTask:TasksType = {id: v1(), title: inp, isDone: false }
        setTasks( [newTask, ...tasks])

    }

    return (
        <div>
            <TodoList tasks={tasksForToDoList} delTask={delTask} changeFilter={changeFilter} addTask={addTask}/>

        </div>
    );
}


export default App;

