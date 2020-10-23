// import React, {useState} from 'react';
// import './App.css';
// import TodoList from './TodoList';
// import {v1} from 'uuid';
// import {AddItemForm} from './AddItemForm';
// import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
// import {Menu} from '@material-ui/icons';
// import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-api';
// import {filterValueType, TodolistDomainType} from './state/todolist-reduser';
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
// function App() {
//
//     let todolistID1 = v1();
//     let todolistID2 = v1();
//
//     let [TodoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
//         {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
//         {id: todolistID2, title: 'Pets', filter: 'all', order: 0, addedDate: ''}
//     ])
//
//     let [tasks, setTasks] = useState<TasksStateType>({
//         [todolistID1]: [
//             {
//                 id: v1(),
//                 title: 'JS',
//                 status: TaskStatuses.Completed,
//                 todoListId: todolistID1,
//                 startDate: '',
//                 deadline: '',
//                 addedDate: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             },
//             {
//                 id: v1(),
//                 title: 'CSS',
//                 status: TaskStatuses.Completed,
//                 todoListId: todolistID1,
//                 startDate: '',
//                 deadline: '',
//                 addedDate: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             }
//         ],
//         [todolistID2]: [
//             {
//                 id: v1(),
//                 title: 'Dog',
//                 status: TaskStatuses.New,
//                 todoListId: todolistID2,
//                 startDate: '',
//                 deadline: '',
//                 addedDate: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             },
//             {
//                 id: v1(),
//                 title: 'Cat',
//                 status: TaskStatuses.Completed,
//                 todoListId: todolistID2,
//                 startDate: '',
//                 deadline: '',
//                 addedDate: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: ''
//             }
//
//         ]
//     })
//
//     function addToDoList(title: string) {
//         let newToDoListID = v1();
//         let newToDoList: TodolistDomainType = {
//             id: newToDoListID,
//             title: title,
//             filter: 'all',
//             addedDate: '',
//             order: 0
//         };
//         setTodoLists([...TodoLists, newToDoList]);
//         setTasks({
//             ...tasks, [newToDoListID]: []
//         })
//     }
//
//     function changeFilter(value: filterValueType, todoListId: string) {
//         let todoList = TodoLists.find(tl => tl.id === todoListId)
//         if (todoList) {
//             todoList.filter = value
//             setTodoLists([...TodoLists])
//         }
//     }
//
//     function removeTodoList(todoListId: string) {
//         let newTDL = TodoLists.filter(tl => tl.id !== todoListId);
//         setTodoLists(newTDL);
//         delete tasks[todoListId];
//         setTasks({...tasks});
//     }
//
//     function changeTodoListTitle(todoListId: string, newTitle: string) {
//         const todoList = TodoLists.find(tl => tl.id === todoListId)
//         if (todoList) {
//             todoList.title = newTitle;
//             setTodoLists([...TodoLists])
//         }
//     }
//
//     function removeTask(taskId: string, todoListId: string) {
//         let todoList = tasks[todoListId];
//         tasks[todoListId] = todoList.filter(t => t.id !== taskId)
//         setTasks({...tasks});
//     }
//
//     function addTask(title: string, todoListId: string) {
//         let newTask = {
//             id: v1(),
//             title: title,
//             status: TaskStatuses.New,
//             todoListId: todoListId,
//             startDate: '',
//             deadline: '',
//             addedDate: '',
//             order: 0,
//             priority: TaskPriorities.Low,
//             description: ''
//         };
//         let todoList = tasks[todoListId];
//         tasks[todoListId] = [newTask, ...todoList]
//         setTasks({...tasks})
//     }
//
//     function changeStatus(id: string, status: TaskStatuses, todoListId: string) {
//         let todoList = tasks[todoListId];
//         let task = todoList.find(t => t.id === id);
//         if (task) {
//             task.status = status;
//             setTasks({...tasks});
//         }
//     }
//
//     function changeTaskTitle(id: string, title: string, todoListId: string) {
//         let todoList = tasks[todoListId];
//         let task = todoList.find(t => t.id === id);
//         if (task) {
//             task.title = title;
//             setTasks({...tasks});
//         }
//     }
//
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed style={{marginLeft: '5px'}}>
//                 <Grid container style={{padding: '20px'}}>
//                     <AddItemForm addItem={addToDoList}/>
//                 </Grid>
//                 <Grid container spacing={5}>
//                     {
//                         TodoLists.map(tl => {
//                             let tasksForToDoList = tasks[tl.id];
//                             if (tl.filter === 'active') {
//                                 tasksForToDoList = tasksForToDoList.filter(t => t.status === TaskStatuses.New)
//                             }
//                             if (tl.filter === 'completed') {
//                                 tasksForToDoList = tasksForToDoList.filter(t => t.status === TaskStatuses.Completed)
//                             }
//                             return (
//                                 <Grid item key={tl.id}>
//                                     <Paper style={{padding: '10px'}} elevation={3}>
//                                         <TodoList
//                                             id={tl.id}
//                                             title={tl.title}
//                                             changeFilter={changeFilter}
//                                             tasks={tasksForToDoList}
//                                             removeTask={removeTask}
//                                             addTask={addTask}
//                                             changeStatus={changeStatus}
//                                             filter={tl.filter}
//                                             removeTodoList={removeTodoList}
//                                             changeTaskTitle={changeTaskTitle}
//                                             changeTodoListTitle={changeTodoListTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
export default () => {}
// App;
