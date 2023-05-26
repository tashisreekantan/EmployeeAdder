import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'



export const Register = () => {

    const [input,setInput] = useState({})

    const navigate = useNavigate()

    const apiUrl ="http://localhost:2000/register"

    const changeData = (event) =>{

        setInput({
            ...input,[event.target.name]:event.target.value
        })
        console.log(input)
    }

    const clickRegister = () =>{
        axios.post(apiUrl,input)
        .then(response =>{
            console.log(response)
            alert(response.data.status)
            navigate('/signin')
        })
    }
  return (
    <div>
        <div className="container">
            <div className="row g-3 position-absolute top-50 start-50 translate-middle">
                <h1 className="heading fw-Bolder">EMPLOYEE APP</h1>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 g-3">
                <div className="form-check form-check-inline">
                   <input className="form-check-input" type="radio" name="role" id="inlineRadio1" value="user" onClick={changeData} ></input>
                   <label className="form-check-label" for="inlineRadio1">USER</label>
                </div>
                <div className="form-check form-check-inline">
                   <input className="form-check-input" type="radio" name="role" id="inlineRadio2" value="admin" onClick={changeData}></input>
                   <label className="form-check-label" for="inlineRadio2">ADMIN</label>
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-2">

                    <label htmlFor="" className="form-label">Username</label>
                    <input name='username' type="text" className="form-control" onChange={changeData}/>
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="" className="form-label">Email</label>
                    <input name='email' type="email" className="form-control" onChange={changeData}/>
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="" className="form-label">Password</label>
                    <input name='password' type="password" className="form-control" onChange={changeData}/>
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                    <button onClick={clickRegister} className="btn btn-success btn-hover">Register</button>
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-3">
                <label htmlFor="" className="form-label">Already Have an Account? 
                <Link to={'/signin'} className='mx-3'>SignIn</Link></label>
            </div>
            </div>
            </div>
        </div>
    </div>
  )
}
