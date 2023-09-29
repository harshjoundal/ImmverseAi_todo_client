import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loginuser, selectuserState, setState, Registeruser } from './Login.slice'
import styles from './Login.module.css'
import loginImage from './loginImage.png'
import {ThunkDispatch} from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import Loader from '../components/Loader'




const Login = () => {
    
    const [formState,setFormState] = useState({email:"",password:""})

    const [isLogin,setIsLogin] = useState("login")

    const navigate = useNavigate()
    const {user,loginLoading,signUpLoading} = useSelector(selectuserState)

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    
    useEffect(()=>{
            let localUser:any = localStorage.getItem("immverseUserToken")
            localUser = JSON.parse(localUser)
            if(!_.isEmpty(localUser?.user)){
                dispatch(setState(localUser.user))
            }
    })
    
    const handleSubmit = async ()=>{
        dispatch(Loginuser(formState))
    }

    if(!_.isEmpty(user)){
        navigate('/')
    }

    const handleSignUp = ()=>{
        dispatch(Registeruser(formState))
        // setIsLogin("login")
    }
  return (
    <div className={styles.mainContainer}>
        {loginLoading && <Loader message='Loading...'/>}
        {signUpLoading && <Loader message='Loading...'/>}
        <div className={styles.loginLeft}>

            {
                isLogin == "login" ? (
                    <>
                        <div className={styles.loginLeft}>
                            <div className={styles.loginFormContainer}>
                                <div className={styles.loginTitle}>Login</div>
                                <p style={{color:"white",fontSize:"12px",fontFamily:'sans-serif',marginBottom:"2rem"}}>Enter your account details</p>


                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    handleSubmit()
                                }} className={styles.loginForm}>
                                    <input placeholder='Email' type='email' required={true}
                                        value={formState.email}
                                        onChange={(e)=>{
                                            setFormState({...formState,email:e.target.value})
                                        }}
                                    />
                                    <input placeholder='Password' type='password' required={true}
                                        value={formState.password}
                                        onChange={(e)=>{
                                            setFormState({...formState,password:e.target.value})
                                        }}
                                    />
                                    <button type='submit' className={styles.loginButton}>Login</button>
                                </form>

                            <p style={{color:"#fff"}}>Don't have an account 
                            <span style={{color:"#9C6FE4",cursor:"pointer"}} onClick={()=>setIsLogin("signUp")} > SignUp</span></p>
                            </div>
                        </div>
                    </>
                ):(
                    <div className={styles.loginLeft}>
                        <div className={styles.loginFormContainer}>
                            <div className={styles.loginTitle}>Sign Up</div>
                            <p style={{color:"white",fontSize:"12px",fontFamily:'sans-serif',marginBottom:"2rem"}}>Enter your account details</p>

                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                handleSignUp()
                            }} className={styles.loginForm}>
                                <input placeholder='Email' type='email' required={true}
                                    value={formState.email}
                                    onChange={(e)=>{
                                        setFormState({...formState,email:e.target.value})
                                    }}
                                />
                                <input placeholder='Password' type='password' required={true}
                                    value={formState.password}
                                    onChange={(e)=>{
                                        setFormState({...formState,password:e.target.value})
                                    }}
                                />
                                <button type='submit' className={styles.loginButton}>SignUp</button>
                            </form>
                            <p style={{color:"#fff"}}>Already have an account 
                            <span style={{color:"#9C6FE4",cursor:"pointer"}} onClick={()=>setIsLogin("login")} > SignIn</span></p>
                            
                        </div>
                    </div>

                )
            }

        </div>
        <div className={styles.loginRight}>
            <div className={styles.leftTitle}>
                <div >Welcome to</div>
                <div >Immverse.ai</div>
            </div>

            <div className={styles.imageContainer}>
                <img className={styles.LoginImage} src={loginImage} alt=''/>
            </div>
        </div>

    </div>
  )
}

export default Login