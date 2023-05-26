import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Home = () => {

    const apiUrl = "http://localhost:2000/getlist"
    const deleteApi = "http://localhost:2000/deletelist"

    const [visible,setVisible] = useState(true)


    const [data,setData] = useState([])
    const [userToken,settoken] = useState(sessionStorage.getItem("userToken"))

    useEffect(() =>{
        let role = sessionStorage.getItem("role")
        if (role === 'user')
        {
            setVisible(false)
        }
        else{
            setVisible(true)
        }
        axios.post(apiUrl,{"token": userToken}).then(
            (response) =>{
                setData(response.data)
            }
        )
    },[]
    )

    const clickDelete = (event) =>{
        const element = {
            "_id" : event.target.value,
            "token": userToken
        }
        console.log(element)
         axios.post(deleteApi,element)
         .then(response=>{
                console.log(response)
                if(response.data.status=== 'Deleted Successfully'){
                    window.location.reload(true)
                }
            }
        )      
    }

    const setUser=(id,name,email,place,designation,salary)=>{
        localStorage.setItem("_id",id);
        localStorage.setItem("name",name);
        localStorage.setItem("email",email);
        localStorage.setItem("location",place);
        localStorage.setItem("position",designation);
        localStorage.setItem("salary",salary);
            
      }
    
    return (
    <div>
        <Header/>
        <div className="container">
            <div className="row g-3 trnslate-middle my-5">
                <div className="col col-12 col-sm col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">NAME</th>
                            <th scope="col">POSITION</th>
                            <th scope="col">LOCATION</th>
                            <th scope='col'>SALARY</th>
                            {visible && <th scope='col'></th> }
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(
                            (user) =>{
                            return <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.position}</td>
                            <td>{user.location}</td>
                            <td>{user.salary}</td>
                            { visible && <td className='me-auto mb-2 mb-lg-0'>
                                <Link className="btn btn-warning" to={'/update'} onClick={()=>setUser(user._id,user.name,user.email,user.location,user.position,user.salary)} >Edit</Link>
                            
                                <button className="btn btn-danger mx-3" value={user._id} onClick={clickDelete}>Delete</button>
                            </td>}
                        </tr>
                        }
                    )}
                        
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        
    </div>
  )
}
