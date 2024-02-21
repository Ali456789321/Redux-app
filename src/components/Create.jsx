import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../featrues/counterSlice'
import { useNavigate } from 'react-router-dom'
import './create.css'

const Create = () => {
     
  const [user, setUser] = useState({})
  const [animate, setAnimate] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
 

   const getUserData = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
   }
     
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user);
       dispatch(createUser(user))  
       navigate("/read") 
    }

    useEffect(() => {
        setAnimate(true)
    }, [])

    return (
        <>
        <div>
        <h1 className={`create-header  ${animate ? 'animate': '' }`}>Add Your Data</h1>
        </div>
        <div className='form-container'>
        <form action="" className='text-center create-form' onSubmit={handleSubmit}>
        <div className="mb-3 mt-5 text-center">
                <label className="form-label">Name :</label>
                <input type="text" className="" name='name' id="formGroupExampleInput" placeholder="Name" onChange={getUserData}/>
            </div>
            <div className="mb-3 mt-5 text-center">
                <label className="form-label">Email :</label>
                <input type="email" className="" name='email' id="formGroupExampleInput2" placeholder="Email" onChange={getUserData}/>
            </div>
            <div className="mb-3 mt-5 text-center">
                <label className="form-label">Age :</label>
                <input type="text" className="" name='age' id="formGroupExampleInput2" placeholder="Age" onChange={getUserData}/>
            </div>
            <div className='radio-group'>
            <div className='male'>
            <input type="radio" name='gender' value='Male' onChange={getUserData}/>
            <label>Male</label>
            </div>
            <div className='female'>
            <input type="radio" name='gender' value='Female' onChange={getUserData}/>
            <label>Female</label>
            </div>
            </div>
            <button className='btn'>submit</button>
        </form>
        </div>
       
        </>
    )
}

export default Create