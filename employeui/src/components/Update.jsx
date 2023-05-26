import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Update = () => {
    const navigate = useNavigate()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [location,setLocation] = useState('')
    const [position,setPosition] = useState('')
    const [salary,setSalary] = useState('')
    const [_id,setId] = useState(null)
    console.log("first")
    console.log(_id)

    const [userToken,settoken] = useState(sessionStorage.getItem("userToken"))


    const apiUrl="http://localhost:2000/modify"

    useEffect(() =>{
        setName(localStorage.getItem("name"))
        setEmail(localStorage.getItem("email"))
        setLocation(localStorage.getItem("location"))
        setPosition(localStorage.getItem("position"))
        setSalary(localStorage.getItem("salary"))
        setId(localStorage.getItem("_id"))
        console.log("inside useeffect")
        // console.log(_id)
    },[])

    const setdatatoApi = ()=>{
        const employeeData = {
            "_id": _id,
            "name" : name,
            "email": email,
            "location" : location,
            "position" : position,
            "salary" : salary,
            "token": userToken
        }
        axios.post(apiUrl,employeeData)
        .then(response =>{
            if(response.data.status === 'Data Updated'){
                console.log("inside axios")
                navigate('/home')
            }
            else{
                alert("Update Failed")
            }
        })
    }


  return (
    <div>
        <Header/>
        <div className="container ">
            <div className="row g-3" style={{margin: "40px 10px 0 10px"}}>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row g-3 position-absolute top-50 start-50 translate-middle">
                        <div className="col-12">
                            <label htmlFor="" className='form-label'>NAME</label>
                            <input name='name' type="text" value={name} className="form-control" onChange={(e)=> setName(e.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="" className='form-label'>EMAIL</label>
                            <input name='email' type="email" value={email} className="form-control" onChange={(e)=> setEmail(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="" className='form-label'>DESIGNATION</label>
                            <input name='position' type="text" value={position} className="form-control" onChange={(e)=> setPosition(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="" className='form-label'>LOCATION</label>
                            <input name='location' type="text" value={location} className="form-control" onChange={(e)=> setLocation(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="" className='form-label'>SALARY</label>
                            <input name='salary' type="text" value={salary} className="form-control" onChange={(e)=> setSalary(e.target.value)} />
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <button onClick={setdatatoApi} className="btn btn-warning"> UPDATE </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
