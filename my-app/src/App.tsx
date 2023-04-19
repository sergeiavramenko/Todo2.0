import React, {useState} from 'react';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid'

type ToDoListType = {
    id: any,
    title: string,
    filter: Filter
}
export type Filter =
    "ALL" | "Completed" | "Active"

function App() {
    let removeTask = (id: any, todolostId: string) => {
        let tasksSimple = tasks[todolostId]
        let filteredTasks = tasksSimple.filter(t => t.id !== id)
        tasks[todolostId] = filteredTasks
        setTasks({...tasks})
    }

    let addTask = (inp: string, todolostId: string) => {
        let newTask = {id: v1(), title: inp, isDone: false}
        let tasksSimple = tasks[todolostId]
        let newTasks = [newTask, ...tasksSimple]
        tasks[todolostId] = newTasks
        setTasks({...tasks})
    }

    const changeStatus = (id: any, isDone: boolean, todolostId: string) => {
        let tasksSimple = tasks[todolostId]
        let task = tasksSimple.find(t => t.id == id)
        if (task) {
            task.isDone = isDone

            setTasks({...tasks})
        }

    }
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolist, setTodolist] = useState<Array<ToDoListType>>([
        {id: todolistId1, title: 'what to learn', filter: 'Active'},
        {id: todolistId2, title: 'what to buy', filter: 'Completed'},
    ])
    let removeToDolist = (todolistId: string) => {
        let filteredToDoList = todolist.filter(tl => tl.id !== todolistId)
        setTodolist(filteredToDoList);
        delete tasks[todolistId]
        setTasks({...tasks})

    }
    let [tasks, setTasks] = useState(
        {
            [todolistId1]: [
                {id: v1(), title: "htm", isDone: true},
                {id: v1(), title: "CSddddS", isDone: false},
                {id: v1(), title: "fdf", isDone: false},
                {id: v1(), title: "332", isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: "boo;", isDone: true},
                {id: v1(), title: "Milk", isDone: false},
            ]
        }
    )

    let chandeFilter = (s: Filter, todolistId: string) => {
        let todo = todolist.find(tl => tl.id === todolistId)
        if (todo) {
            todo.filter = s;
            setTodolist([...todolist])
        }
    }
    return (
        <div>
            {
                todolist.map((tl) => {
                    let tasksForTodoList = tasks[tl.id]
                    if (tl.filter == "Active") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone == false)
                    }
                    if (tl.filter == "Completed") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone == true)
                    }
                    return <TodoList id={tl.id} key={tl.id} title={tl.title}
                                     tasks={tasksForTodoList} removeTask={removeTask}
                                     chandeFilter={chandeFilter} addTask={addTask}
                                     changeStatus={changeStatus} filter={tl.filter}
                                     removeToDolist={removeToDolist}/>

                })
            }
        </div>
    );
}

export default App;

