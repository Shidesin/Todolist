import React, {useReducer} from 'react';
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
    RemoveTodoListAC,
    todoListReducer
} from './state/todolist-reduser';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reduser';

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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type filterValueType = 'all' | 'active' | 'completed';

function AppWithReducers() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [TodoLists, dispatchTodoLists] = useReducer(todoListReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'Pets', filter: 'all'}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
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
        const action =  AddTodoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    function changeFilter(value: filterValueType, todoListId: string) {
        dispatchTodoLists(ChangeTodoLisFilterAC(value, todoListId))
    }

    function removeTodoList(todoListId: string) {
        const action =  RemoveTodoListAC(todoListId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    function changeTodoListTitle(todoListId: string, newTitle: string) {
        dispatchTodoLists(ChangeTodoListTitleAC(newTitle,todoListId ))
    }

    function removeTask(taskId: string, todoListId: string) {
        dispatchTasks(removeTaskAC(taskId, todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatchTasks(addTaskAC(title,todoListId ))
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        dispatchTasks(changeTaskStatusAC(id, isDone, todoListId))
    }

    function changeTaskTitle(id: string, title: string, todoListId: string) {
        dispatchTasks(changeTaskTitleAC(id, title, todoListId))
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

export default AppWithReducers;
