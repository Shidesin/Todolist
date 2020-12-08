import { Dispatch } from 'redux';
import {CommonResponceType} from '../../api/todolist-api';
import {setAppErrorAC, setAppErrorType, setAppStatusAC, setAppStatusType} from '../../state/appReducer';


// generic function
export const handleServerAppError = <T>(data: CommonResponceType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<setAppErrorType | setAppStatusType>