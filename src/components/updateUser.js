import React, { useEffect , useContext , useState} from 'react'
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert';
import './addUser.css'
import { MainContext } from '../providers/liteDarkProvider';
export default function Adduser() {

  const {id} = useParams()
  const{dark} = useContext(MainContext)

    const [formData , setFormData] = useState({
        Name:''
    })
    const [error , setError] = useState()

    useEffect(()=>{

      axios.get(`https://631b96c3fae3df4dcf0283cd.mockapi.io/todos/${id}`)
      .then((response)=>{
        if(response.data.Name)setFormData(response.data)
      })

    },[])

    const handleSubmit = async (e)=>{
      
      axios.put(`https://631b96c3fae3df4dcf0283cd.mockapi.io/todos/${id}`,formData)
        swal("Kullanıcı başarıyla düzenlendi",{
            icon:'success'
        })
      setError(false)
    }

  return (
    <div className={dark?'darkContainer':'Container'}>
      <div className='container'>
        <div className='row'>
            <div className='col-md-7'>
                <h1 className={dark?'darkTxt':''}>Kullanıcı Düzenleme formu</h1>
            </div>
            <div className='mb-3'>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">İsim</span>
                    <input 
                        value={formData.Name}
                        onChange={(e)=>setFormData({...formData , 
                            Name: e.target.value})}
                        type="text" 
                        className="form-control" 
                        placeholder="Yeni İsim giriniz" 
                        aria-label="Username" 
                        aria-describedby="addon-wrapping"
                        required = {true}
                        />
                       
                </div>
                <span className={error?"spanE":"span"}>En az 3 harf yazmaniz gerek</span>
            </div>
            <div className='mb-3'>
              <div className='wrpButtons'>
                <button onClick={handleSubmit} type="button" className={dark?"btn btn-secondary":"btn btn-success"}>Düzenle</button>
                <button type="button" className={dark?"btn btn-secondary":"btn btn-success"}><NavLink to='/'>Geri</NavLink></button>
              </div>
                
            </div>
        </div>
    </div>
    </div>
  )
}
