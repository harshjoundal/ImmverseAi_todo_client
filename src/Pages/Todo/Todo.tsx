import React ,{useEffect,useState} from 'react'
import styles from './Todo.module.css'
import { Webimages } from '../components/resources'
import { Checkbox, Pagination, message } from 'antd'
import {DeleteOutlined} from '@ant-design/icons'
import { useAppDispatch } from '../../Store/Hooks'
import { Addtodo, DeleteTodo, getAllTodos, selectTodoState, updatetodo } from './Todo.slice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const Todo = () => {
  const dispatch = useAppDispatch()
  const {todos=[],count,getAllLoading,updateLoading,addtodoLoading,deleteTodoLoading} = useSelector(selectTodoState)
  const [trigger,setTrigger] = useState(false)
  const [input,setInput] = useState("")
  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)
  const navigate = useNavigate()

  let user:any = localStorage.getItem("immverseUserToken")
  user = JSON.parse(user);
  if(!user){
    navigate('/login')
  }

  useEffect(()=>{
      dispatch(getAllTodos({
        userId:user?.user?._id,
        page : page,
        items:pageSize
      }))
      // console.log(user?.user);
      
  },[trigger,page,pageSize])

  const handleAdd = ()=>{
    let data = {
      userId : user?.user?._id,
      todo : input
    }
    dispatch(Addtodo(data))
  }

  return (

    <div className={styles.main_container}>

      {
          (getAllLoading || updateLoading || addtodoLoading || deleteTodoLoading)
          && <Loader message='Loading....'/>
      }
      <div className={styles.title}>
        <img src={Webimages.todo} alt=''/>
      </div>

      <div className={styles.todoContainer}>
        <div className={styles.inputContainer}>
          <input placeholder='What do you need to do?' value={input} onChange={(e)=>setInput(e.target.value)}/>
          <button onClick={ async ()=>{
              if(input == ""){
                message.warning("Add something!")
                return;
              }
              await handleAdd()
              setTrigger(state=>!state)
              setInput("")
          }} className={styles.addtodoButton}>ADD</button>
        </div>

        <div className={styles.todos}>
          {
            todos.map((ele:any)=>(
            <div className={styles.todo} key={ele?._id}>
                <Checkbox style={{width:"50px"}}  defaultChecked={ele?.isCompleted} onChange={async (e)=>{
                  let data = {...ele,isCompleted:e.target.checked};
                  await dispatch(updatetodo(data))
                  setTrigger(state => !state)
                }}/>
                <div style={{width:"100%",textAlign:"start",}} className={
                  ele?.isCompleted && `${styles.completed}`
                }>
                  <div>{ele?.todo}</div>
                </div>
                <div>
                  <DeleteOutlined onClick={async ()=>{
                    await dispatch(DeleteTodo(ele?._id))
                    setTrigger(state => !state)
                  }} style={{width:"50px",color:"red"}}/>
                </div>
            </div>
            ))
          }
    

        </div>
        <Pagination onChange={(page, pageSize)=>{
          setPage(page)
          setPageSize(pageSize)
        }}  defaultCurrent={1} total={count} pageSizeOptions={[5,10,15,20,25]} />
      </div>
    </div>
  )
}

export default Todo