import axios from "axios"
import { config } from "../../config/config"

export const loginUser = async (data : {email:string,password:string})=>{
    try{
        let res = await axios.post(`${config.backEndUrl}/user/login`,data)
        return res.data
    }
    catch(err){
        return err
    }
}
export const signUp = async (data : {email:string,password:string})=>{
    try{
        let res = await axios.post(`${config.backEndUrl}/user/signup`,data)
        return res.data
    }
    catch(err){
        return err
    }
}