import axios from "axios"
import { config } from "../../config/config"

let user:any = localStorage.getItem("immverseUserToken")
user = JSON.parse(user);


export const getTodos = async ({userId,page,items}:any)=>{
    try {
        let res = await axios.get(`${config.backEndUrl}/todos/getall/${userId}?page=${page}&items=${items}`,{
            headers:{
                Authorization:user.token
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}
export const updateTodo = async (body:any)=>{
    try {
        let res = await axios.post(`${config.backEndUrl}/todos/update`,body,{
            headers:{
                Authorization:user.token
            }
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const addTodo = async (body:{userId:string,todo:string}) =>{
    try {
        let res = await axios.post(`${config.backEndUrl}/todos/addTodo`,body,{
            headers:{
                Authorization:user.token
            }
        })
        return res.data
        
    } catch (error) {
        
    }
}
export const deleteTodo = async (id:string) =>{
    try {
        let res = await axios.post(`${config.backEndUrl}/todos/deleteTodo/${id}`,{},{
            headers:{
                Authorization:user.token
            }
        })
        return res;
    } catch (error) {
        return error
    }
}