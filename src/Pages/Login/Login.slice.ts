import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { loginUser, signUp } from './login.api'
import {message} from 'antd'

const initialState = {
    user :{},
    isLoggedIn:false,
    loginLoading : false,
    signUpLoading:false
}

export const Loginuser = createAsyncThunk(
    "user/login",
    async(data : {email:string,password:string})=>{
        return await loginUser(data)
    }
)
export const Registeruser = createAsyncThunk(
    "user/Registeruser",
    async(data : {email:string,password:string})=>{
        return await signUp(data)
    }
)

export const userSlice = createSlice({
    name :"user",
    initialState,
    reducers:{
       setState : (state,action:any) =>{
            state.user = action.payload
        },
        removeState : (state) =>{
            state.user = {}
        }
    },
    extraReducers:builder=>{
        builder
        .addCase(Loginuser.pending,(state)=>{
            state.loginLoading = true;
            message.info("Logging In")
            return
        })
        .addCase(Loginuser.fulfilled,(state,action:any)=>{
            state.loginLoading=false;
            if(action.payload.success == false){
                message.error(action.payload.message)
                return;
            }
            state.user = action?.payload?.user;
            state.isLoggedIn = true
            message.success("Login Successful!")
            localStorage.setItem("immverseUserToken",JSON.stringify({token : action?.payload?.token,user:action?.payload?.user}))
        })
        .addCase(Loginuser.rejected,(state,action:any)=>{
            state.loginLoading=false;
            state.isLoggedIn = false
        })
        .addCase(Registeruser.pending,(state,action:any)=>{
            state.signUpLoading = true;
        })
        .addCase(Registeruser.fulfilled,(state,action:any)=>{
            state.signUpLoading = false;
            message.success("Signup Successful!")
            window.location.reload()
        })
        .addCase(Registeruser.rejected,(state,action:any)=>{
            state.signUpLoading = false;
            message.success("Something went wrong!")
        })
    }
})

export const selectuserState = (state:any) => state.user
export const {setState,removeState} = userSlice.actions
export default userSlice.reducer;