import {usersReducer} from './userReducer';


test('user reducer should increment only age', () => {
    const startState = { age: 20, children: 2, name: 'Dimych' };

    const endState = usersReducer(startState, {type:"INCREMENT-AGE"})

    expect(endState.age).toBe(21);
    expect(endState.children).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, children: 2, name: 'Dimych' };

    const endState = usersReducer(startState, {type:'INCREMENT-CHILDREN_COUNT'})

    expect(endState.age).toBe(20)
    expect(endState.children).toBe(3)
});
test('user reducer should change name of user', () => {
    const startState = { name: 'Dimych', age: 20, children: 2 };
    const endState = usersReducer(startState, { type: 'CHANGE-NAME', newName: 'Viktor' })

    expect(endState.name).toBe('Viktor');
});

