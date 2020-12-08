
import {tasksReducer} from './tasks-reduser';
import {AddTodoListAC, todoListReducer} from './todolist-reduser';
import {TasksStateType} from '../components/App/AppWithReduxs';


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<any> = [];


    const action = AddTodoListAC("new todolist", 'ddd');


    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)


    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;


    expect(idFromTasks).toBe(action.todolistID);
    expect(idFromTodolists).toBe(action.todolistID);
});