import React, { useState } from 'react'
import axios from 'axios'
import { Header } from './Header'
import { Link, useNavigate } from 'react-router-dom'



export const Login = () => {

    const [input,setInput] = useState({})

    const navigate = useNavigate()

    const apiUrl ="http://localhost:2000/login"

    const changeData = (event) =>{

        setInput({
            ...input,[event.target.name]:event.target.value
        })
    }

    const clickLogin = () =>{
        axios.post(apiUrl,input)
        .then(response =>{
            console.log(response)
            if(response.data.status === "Login Successfull"){
                const token = response.data.token
                console.log(response.data.data)
                const userId = response.data.data._id
                let role = response.data.data.role

                console.log(role)

                sessionStorage.setItem("userToken",token)
                sessionStorage.setItem("userId",userId)
                sessionStorage.setItem("role",role)

                navigate("/home")
            }else{
                alert("Invalid Credentials")
            }
        
        })
    }

  return (
    <div>
        {/* <Header/> */}
        <div className="container">
            <div className="row g-3 position-absolute top-50 start-50 translate-middle">
                <h1 className="heading fw-Bolder">EMPLOYEE APP</h1>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="" className="form-label">Email</label>
                    <input name='email' type="email" className="form-control" onChange={changeData}/>
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="" className="form-label">Password</label>
                    <input name='password' type="password" className="form-control" onChange={changeData}/>
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <button onClick={clickLogin} className="btn btn-primary btn-hover">Login</button>
                </div>
                <div className="col">
                <label htmlFor="" className="form-label">Doesn't Have an Account? 
                <Link to={'/'} className='mx-3'>  Register</Link></label>
            </div>
            </div>
            
        </div>
    </div>
  )
}
