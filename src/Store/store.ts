import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import TodoReducer from '../Pages/Todo/Todo.slice'
import UserReducer from '../Pages/Login/Login.slice'

const reducers = combineReducers({
    todos : TodoReducer,
    user: UserReducer
})

export const store = configureStore({
    reducer : reducers
})

export type AppDispatch = typeof store.dispatch;