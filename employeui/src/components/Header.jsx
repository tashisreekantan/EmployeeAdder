import React, { useEffect, useState } from 'react'
 


export const Header = () => {

    const [visible,setVisible] = useState(true)

    useEffect(()=>{
        let role = sessionStorage.getItem("role")
        if (role === 'user')
        {
            setVisible(false)
        }
        else{
            setVisible(true)
        }
    },[])

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <Link to="/home" className="navbar-brand" >EMPLOYEE APP</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <div className="navbar-nav">
                    {visible && <Link className="nav-link active" aria-current="page" to="/home">Home</Link> }
                    { visible && <Link className="nav-link active" to="/form">Add Employee</Link> }
                    <Link className="nav-link active " to="/">Logout</Link>
                </div>
            </div>
        </div>
    </nav>
    </div>
  )
}
