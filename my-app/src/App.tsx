import React, {useState} from 'react';
import {TaskType, TodoList} from "./TodoList";
export type Filter =
    "ALL" | "Completed" | "Active"


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "htm", isDone: true},
        {id: 2, title: "CSddddS", isDone: false},
        {id: 3, title: "fdf", isDone: false},
        {id: 4, title: "332", isDone: false},
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

    return (
        <div>
            <TodoList title={"Hi my Frends"} tasks={tasksForTodoList} removeTask={removeTask} chandeFilter={chandeFilter} />
        </div>
    );
}

export default App;

