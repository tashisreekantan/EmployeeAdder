import React, { useState} from 'react'
import { Header } from './Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Form = () => {

    const [input,setInput] = useState({})
    const navigate=useNavigate()
    const [userToken,settoken] = useState(sessionStorage.getItem("userToken"))


    const apiUrl = "http://localhost:2000/addlist"

    const changeMyData = (event) => {
        setInput({
            ...input,[event.target.name]:event.target.value,
            "token" : userToken
        })
    }

    const clickAdd = ()=>{
        console.log("outside axios")

        axios.post(apiUrl,input)
        .then(response =>{
            console.log("inside axios")
            console.log(response)
            navigate('/home')
        })
    }

  return (
    <div>
        <Header/>
        <div className="container">
            <div className="row g-3" style={{margin: "40px 10px 0 10px"}}>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row g-3 position-absolute top-50 start-50 translate-middle">
                        <div className="col-12">
                            <label htmlFor="" className='form-label'>NAME</label>
                            <input name='name' type="text" className="form-control" onChange={changeMyData} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="" className='form-label'>EMAIL</label>
                            <input name='email' type="email" className="form-control" onChange={changeMyData} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="" className='form-label'>DESIGNATION</label>
                            <input name='position' type="text" className="form-control" onChange={changeMyData} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="" className='form-label'>LOCATION</label>
                            <input name='location' type="text" className="form-control" onChange={changeMyData} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="" className='form-label'>SALARY</label>
                            <input name='salary' type="text" className="form-control" onChange={changeMyData} />
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <button onClick={clickAdd} className="btn btn-success"> ADD DATA </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
