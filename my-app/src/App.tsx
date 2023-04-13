import React, {useState} from 'react';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid'

export type Filter =
    "ALL" | "Completed" | "Active"


function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "htm", isDone: true},
        {id: v1(), title: "CSddddS", isDone: false},
        {id: v1(), title: "fdf", isDone: false},
        {id: v1(), title: "332", isDone: false},
    ])
    let [filter, setFilter] = useState<Filter>("ALL")
    let tasksForTodoList = tasks
    if (filter == "Active") {
        tasksForTodoList = tasks.filter(t => t.isDone == false)
    }
    if (filter == "Completed") {
        tasksForTodoList = tasks.filter(t => t.isDone == true)
    }
    let removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    let chandeFilter = (s: Filter) => {
        setFilter(s)
    }
    let addTask = (inp: string) => {
        let newTask = {
            id: v1(), title: inp, isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeStatus = (id: any, isDone: boolean) => {
        let task = tasks.find(t => t.id == id)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])

    }
    return (
        <div>
            <TodoList title={"Hi my Frends"} tasks={tasksForTodoList} removeTask={removeTask}
                      chandeFilter={chandeFilter} addTask={addTask} changeStatus={changeStatus} filter={filter}/>
        </div>
    );
}

export default App;

