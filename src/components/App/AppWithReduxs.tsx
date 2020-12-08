import React, {useCallback, useEffect} from 'react';
import './App.css';
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {
    ChangeTodoLisFilterAC, fetchAddTodoList,
    fetchCnageTodoListTitle, fetchRemoveTodoList,
    fetchGetTodoListThunk, filterValueType,
    TodolistDomainType
} from '../../state/todolist-reduser';
import {changeTaskStatusAC, fetchAddTask, fetchChangeTaskTitle, fetchRemoveTask} from '../../state/tasks-reduser';
import {AppRootStateType} from '../../state/store';
import {TaskStatuses, TaskType} from '../../api/todolist-api';
import {AddItemForm} from '../../common/components/AddIetmForm/AddItemForm';
import TodoList from '../TodoList/TodoList';
import LinearProgress from '@material-ui/core/LinearProgress';
import {RequestStatusType} from '../../state/appReducer';
import {ErrorSnackbar} from '../../common/components/ErrorSnackbar/ErrorSnackbar';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    useEffect(() => {
        dispatch(fetchGetTodoListThunk())
    }, [])

    let TodoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    const addToDoList = useCallback((title: string) => {
        dispatch(fetchAddTodoList(title))
    }, [])


    const changeFilter = useCallback((value: filterValueType, todoListId: string) => {
        dispatch(ChangeTodoLisFilterAC(value, todoListId))
    }, [])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(fetchRemoveTodoList(todoListId))
    }, [])

    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {

        dispatch(fetchCnageTodoListTitle(todoListId, newTitle))
    }, [])

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(fetchRemoveTask(todoListId, taskId))
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(fetchAddTask(title, todoListId))
    }, [])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todoListId: string) => {
        dispatch(changeTaskStatusAC(id, status, todoListId))
    }, [])

    const changeTaskTitle = useCallback((id: string, title: string, todoListId: string) => {
        dispatch(fetchChangeTaskTitle(title, id, todoListId))
    }, [])


    return (
        <div className="App">
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
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
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
                                            entityStatus={tl.entityStatus}
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
            <ErrorSnackbar/>
        </div>
    );
}

export default AppWithRedux;
