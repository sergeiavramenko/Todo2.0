import React, {useState} from 'react';
import TodoList, {FilterType, TasksType} from "./TodoList";
import {v1} from 'uuid'


function App() {
    let delTask = (id: string, todoId: string) => {
        let tasks = tasksObj[todoId]
        let task = tasks.filter(e => e.id !== id)
        tasksObj[todoId] = task
        settasksObj({...tasksObj})
    }


    let addTask = (inp: string,todoId: string) => {
        let newTask: TasksType = {id: v1(), title: inp, isDone: false}
        let tasks = tasksObj[todoId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todoId] =  newTasks
        settasksObj({...tasksObj})
    }

    let changeStatus = (id: string, isdone: boolean, todoId: string) => {
        let tasks = tasksObj[todoId]
        let task = tasksObj[todoId].find(e => e.id == id)
        if (task) {
            task.isDone = isdone
            settasksObj({...tasksObj})
        }

    }
    type todolistType = {
        id: string, title: string, filter: FilterType
    }
    let changeFilter = (buttonActiv: FilterType, idTodolist: string) => {
        let find = todolists.find(i => i.id === idTodolist)
        if (find) {
            find.filter = buttonActiv
            setTodolists([...todolists])
        }
    }
    let delll = (id:string) => {
        let naw = todolists.filter( e => e.id !== id   )
        setTodolists(naw)
    }
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todolistId1, title: 'What to do', filter: "ACTIVE"},
        {id: todolistId2, title: 'Micro', filter: "COMPLETED"},
    ])


    let [tasksObj, settasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: "Css", isDone: false},
            {id: v1(), title: "Html", isDone: true},
            {id: v1(), title: "Html", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "rtyu", isDone: false},
            {id: v1(), title: "cvbnm", isDone: true},
        ]
    })
    return (
        <div>
            {todolists.map((tl) => {
                let tasksForToDoList = tasksObj[tl.id];
                if (tl.filter === "COMPLETED") {
                    tasksForToDoList = tasksObj[tl.id].filter(e => e.isDone === true)
                }
                if (tl.filter === "ACTIVE") {
                    tasksForToDoList = tasksObj[tl.id].filter(e => e.isDone === false)
                }


                return <TodoList title={tl.title} tasks={tasksForToDoList} delTask={delTask}
                                 changeFilter={changeFilter} addTask={addTask}
                                 changeStatus={changeStatus} filter={tl.filter}
                                 key={tl.id} id={tl.id} delll={delll}
                />
            })}
        </div>
    );
}


export default App;

