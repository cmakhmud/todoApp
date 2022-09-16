import React , { useState ,useEffect , useContext}from 'react'
import './MainPage.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import {AiOutlineDelete} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import { MainContext } from '../providers/liteDarkProvider'
import {MdOutlineDarkMode , MdOutlineLightMode} from 'react-icons/md'


export default function MainPage() {

    const [datas , setData] = useState()
    const {dark , setDark} = useContext(MainContext)

    useEffect(()=>{
        axios
        .get('https://631b96c3fae3df4dcf0283cd.mockapi.io/todos')
        .then(res=>{
            setData(res.data)
        })
    },[])

    const handleDelete = (id,e)=>{
        const response = axios.delete(`https://631b96c3fae3df4dcf0283cd.mockapi.io/todos/${id}`)
        const newData = datas.filter((result)=>result.id !== id)
        setData(newData)
        if(response)swal("Kullanıcı başarıyla silindi",{ icon:'success' })
    }

  return (
    <>
    <div className={dark?'wrpDark':' wrp'}>
        <div className='wrapper'>
            <div className='addTxtWrp'>
                <div className={dark?'darkTodoTxt':'todoTxt'}>Todos</div>
                <div className='darkAddButtons'>
                        {/* <input onClick={()=>setDark(!dark)} type="checkbox"/> */}
                        <div className={dark?'ddarkLightMode':'darkLightMode'} onClick={()=>setDark(!dark)}>
                            {dark?<MdOutlineDarkMode size={24}/>:<MdOutlineLightMode size={24}/>}
                        </div>
                    <button type="button" className={dark?"btn btn-secondary":"btn btn-success"}><NavLink to='/todos/addpage'>Add new</NavLink></button>
                </div>
            </div>
            <ul className="list-group todoList">
                {datas?.map((data , id)=>{
                    return(
                        <li key={id} className={dark?"list-group-item-dark list-group-item":"list-group-item"}>
                            <div className='liCon'>
                                <h5>{data.Name}</h5>
                                <div className='buttonCon'>
                                    <button type="button" className={dark?"btn btn-dark":"btn btn-primary"}><NavLink to={`/todos/${data.id}`}><FiEdit color={dark?'white':''} size={24}/></NavLink></button>
                                    <button onClick={(e)=>handleDelete(data.id,e)} type="button" className={dark?"btn btn-dark":"btn btn-danger"}><AiOutlineDelete color={dark?'white':''} size={24}/></button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    </div>
    
    </>
  )
}
