type UserType = {
    name: string,
    age: number,
    children: number
}

type ActionType = {
    type: string
    [key: string]: any
}


export const usersReducer = (state: UserType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1}
        case 'INCREMENT-CHILDREN_COUNT':
            return {...state, children: state.children + 1}
        case 'CHANGE-NAME':
            return {...state, name: action.newName}
        default:
            throw new Error('I do not understand this action type')
    }
}

