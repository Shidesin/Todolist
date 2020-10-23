import React, {useCallback} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoLisFilterAC,
    ChangeTodoListTitleAC,
    filterValueType,
    RemoveTodoListAC,
    TodolistDomainType
} from './state/todolist-reduser';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reduser';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import { TaskType, TodolistType, TaskStatuses } from './api/todolist-api';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let TodoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType,TasksStateType >(state => state.tasks)

    let dispatch = useDispatch()

    const addToDoList = useCallback((title: string) => {
        const action =  AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])


    const changeFilter = useCallback((value: filterValueType, todoListId: string) => {
        dispatch(ChangeTodoLisFilterAC(value,todoListId))
    }, [dispatch])

    const removeTodoList = useCallback ((todoListId: string) => {
        const action =  RemoveTodoListAC(todoListId)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback ((todoListId: string, newTitle: string) => {
        dispatch(ChangeTodoListTitleAC(newTitle,todoListId ))
    }, [dispatch])

    const removeTask =useCallback ((taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }, [dispatch])

    const addTask =useCallback ((title: string, todoListId: string) => {
        dispatch(addTaskAC(title,todoListId ))
    }, [dispatch])

    const changeStatus = useCallback ((id: string, status: TaskStatuses, todoListId: string) => {
        dispatch(changeTaskStatusAC(id, status, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback ((id: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(id, title, todoListId))
    }, [dispatch])



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

export default AppWithRedux;
