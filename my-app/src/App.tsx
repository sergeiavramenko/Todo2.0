import React, {useState} from 'react';
import {TaskType, TodoList} from "./TodoList";


function App() {
    let tasks1: Array<TaskType> = [
        {id: 1, title: "htm", isDone: true},
        {id: 2, title: "CSS", isDone: false},
        {id: 3, title: "TS", isDone: true}
    ]
    return (
        <div>
            <TodoList title={"Hi my Frends"} tasks={tasks1} />
        </div>
    );
}

export default App;

