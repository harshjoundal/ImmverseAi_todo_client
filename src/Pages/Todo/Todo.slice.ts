import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { addTodo, deleteTodo, getTodos, updateTodo } from './Todo.api'
import { message } from 'antd'

const initialState = {
    todos : [],
    count:100,
    getAllLoading : false,
    updateLoading:false,
    addtodoLoading:false,
    deleteTodoLoading:false
}


export const getAllTodos = createAsyncThunk(
    "todos/getAllTodos",
    async ({userId,page,items}:any)=>{
        return await getTodos({userId,page,items})
    }
)
export const updatetodo = createAsyncThunk(
    "todos/updateTodo",
    async (body:any) =>{
        return await updateTodo(body)
    }
)
export const Addtodo = createAsyncThunk(
    "todos/Addtodo",
    async (body:{userId:string,todo:string}) =>{
        return await addTodo(body)
    }
)

export const DeleteTodo = createAsyncThunk(
    'todos/DeleteTodo',
    async (id:string)=>{
        return await deleteTodo(id)
    }
)

export const TodoSlice = createSlice({
    name :"todos",
    initialState,
    reducers :{

    },
    extraReducers: builder =>{
        builder
        .addCase(getAllTodos.pending,(state)=>{
            state.getAllLoading = true
        })
        .addCase(getAllTodos.fulfilled,(state,action)=>{
            state.getAllLoading = false
            state.todos = action.payload.result
            state.count = action.payload.count
            
        })
        .addCase(getAllTodos.rejected,(state)=>{
            state.getAllLoading = false
            message.error("Something went wrong!")
        })
        .addCase(updatetodo.pending,(state)=>{
            state.updateLoading = true
        })
        .addCase(updatetodo.fulfilled,(state)=>{
            state.updateLoading = false
            message.success("Todo updated!")
        })
        .addCase(updatetodo.rejected,(state)=>{
            state.updateLoading = false
            message.error("Something went wrong!")
        })
        .addCase(Addtodo.pending,(state)=>{
            state.addtodoLoading = true
        })
        .addCase(Addtodo.fulfilled,(state,action)=>{
            state.addtodoLoading = false
        })
        .addCase(Addtodo.rejected,(state)=>{
            state.addtodoLoading = false
        })
        .addCase(DeleteTodo.pending,(state)=>{
            state.deleteTodoLoading = true
        })
        .addCase(DeleteTodo.fulfilled,(state,action)=>{
            state.deleteTodoLoading = false
            message.success("Todo deleted Successfully!")
        })
        .addCase(DeleteTodo.rejected,(state)=>{
            state.deleteTodoLoading = false
            message.error("Something went wrong!")
        })
    }
})

export const selectTodoState = (state:any)=> state.todos
export default TodoSlice.reducer