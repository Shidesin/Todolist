import {v1} from 'uuid';
import {filterValueType, TodoListType} from '../components/App/App';
import {
    AddTodoListAC,
    ChangeTodoLisFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from './todolist-reduser';
import {tasksReducer} from './tasks-reduser';


let todolistId1: string
let todolistId2: string
let startState: Array<TodoListType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {

    const startStateTasks = {
        [todolistId1]: [],
        [todolistId2]: []
    }
    const action = RemoveTodoListAC(todolistId1)

    const endStateTodolist = todoListReducer(startState, action)
    const endStateTask = tasksReducer(startStateTasks,action)
    const tasksID = Object.keys(endStateTask)



    expect(endStateTodolist.length).toBe(1);
    expect(endStateTodolist[0].id).toBe(todolistId2);
    expect(tasksID.length).toBe(1);
});
test('correct todolist should be added', () => {

    let newTodolistTitle = "New TodoList";

    const startStateTasks = {
        [todolistId1]: [],
        [todolistId2]: []
    }

    const action = AddTodoListAC(newTodolistTitle)

    const endStateTodoList = todoListReducer(startState, action)
    const endStateTask = tasksReducer(startStateTasks,action)

    const todolistID = endStateTodoList[2].id
    const tasksID = Object.keys(endStateTask)

    expect(endStateTodoList.length).toBe(3);
    expect(endStateTodoList[2].title).toBe(newTodolistTitle);
    expect(endStateTodoList[2].filter).toBe('all');
    expect(endStateTodoList[2].id).toBeDefined();
    expect(todolistID).toBe(tasksID[2]);

});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";


    const endState = todoListReducer(startState, ChangeTodoListTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: filterValueType = "completed";

    const endState = todoListReducer(startState, ChangeTodoLisFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});