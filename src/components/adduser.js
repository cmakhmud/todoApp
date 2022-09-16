import React , {useState , useContext} from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import './addUser.css';
import { MainContext } from '../providers/liteDarkProvider'
import { NavLink } from 'react-router-dom';
export default function Adduser() {

    const {dark} = useContext(MainContext)
    const [formData , setFormData] = useState({
        Name:''
    })
    const [error , setError] = useState()

    const handleSubmit = async (e)=>{

       /*  if(formData.Name.length()<3){
            swal("İsim 3 harfden az olamaz")
        }else{ */
        if(formData.Name.length<3){
            swal('İsim en az 3 karakter içermeli',{
                icon:'warning'
            })
            setError(true)
        }else{
            let response = await axios.post('https://631b96c3fae3df4dcf0283cd.mockapi.io/todos',formData)

            if(response){
                swal("Kullanıcı başarıyla eklendi",{
                    icon:'success'
                })
            }else{
                swal("Bir sorun oluştu . Tekrar deneyin",{
                    icon:'warning'
                })
            }
    
            setFormData({
                Name:''
            })
            setError(false)
        }
        }

  return (
    <div className={dark?'darkContainer':'Container'}>
        <div className='container'>
        <div className='row'>
            <div className='col-md-7'>
                <h1 className={dark?'darkTxt':''}>Kullanıcı ekleme form'u</h1>
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
                        placeholder="Kullanıcı adı" 
                        aria-label="Username" 
                        aria-describedby="addon-wrapping"
                        required = {true}
                        />
                       
                </div>
                <span className={error?"spanE":"span"}>En az 3 harf yazmaniz gerek</span>
            </div>
            <div className='mb-3'>
                <div className='wrpButtons'>
                    <button onClick={handleSubmit} type="button" className={dark?"btn btn-secondary":"btn btn-success"}>Ekle</button>
                    <button type='button' className={dark?"btn btn-secondary":"btn btn-success"}><NavLink to='/'>Geri</NavLink></button>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}
