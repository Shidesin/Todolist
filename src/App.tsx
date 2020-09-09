import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Typography, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {Menu} from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: filterValueType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type filterValueType = 'all' | 'active' | 'completed';

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [TodoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'Pets', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Dog', isDone: false},
            {id: v1(), title: 'Cat', isDone: true},
            {id: v1(), title: 'Pig', isDone: false},
            {id: v1(), title: 'Horse', isDone: false}

        ]
    })

    function addToDoList(title: string) {
        let newToDoListID = v1();
        let newToDoList: TodoListType = {
            id: newToDoListID,
            title: title,
            filter: 'all'
        };
        setTodoLists([...TodoLists, newToDoList]);
        setTasks({
            ...tasks, [newToDoListID]: []
        })
    }

    function changeFilter(value: filterValueType, todoListId: string) {
        let todoList = TodoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...TodoLists])
        }
    }

    function removeTask(taskId: string, todoListId: string) {
        let todoList = tasks[todoListId];
        tasks[todoListId] = todoList.filter(t => t.id !== taskId)
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoList = tasks[todoListId];
        tasks[todoListId] = [newTask, ...todoList]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoList = tasks[todoListId];
        let task = todoList.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function removeTodoList(todoListId: string) {
        let newTDL = TodoLists.filter(tl => tl.id !== todoListId);
        setTodoLists(newTDL);
        delete tasks[todoListId];
        setTasks({...tasks});
    }

    function changeTaskTitle(id: string, title: string, todoListId: string) {
        let todoList = tasks[todoListId];
        let task = todoList.find(t => t.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
    }

    function changeTodoListTitle(todoListId: string, newTitle: string) {
        const todoList = TodoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...TodoLists])
        }
    }

    return (
        <div className="App" >
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{marginLeft: '5px'}}>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        TodoLists.map(tl => {
                            let tasksForToDoList = tasks[tl.id];
                            if (tl.filter === 'active') {
                                tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
                            }
                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: '10px'}} elevation={3}>
                                    <TodoList
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        tasks={tasksForToDoList}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
