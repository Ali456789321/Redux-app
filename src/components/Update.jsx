import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../featrues/counterSlice'

const Update = () => {

    const [update, setUpdate] = useState()
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {users, loading} = useSelector((state) => state.app)
    console.log(id);

    useEffect(() => {
      if(id) {
        const single = users.filter((ele) => ele.id === id)
        setUpdate(single[0])
      }
    }, [])

     const newData = (e) => {
        setUpdate({...update, [e.target.name]: e.target.value})
     }

     const handleUpdate = (e) => {
        e.preventDefault()
        dispatch(updateUser(update))
        navigate('/read')
     }

    console.log(update);

  return (
    <>
    <form action="" className='text-center' 
    onSubmit={handleUpdate}
    >
    <div className="mb-3 text-center">
            <label className="form-label">Example label</label>
            <input type="text" className="form-control w-50 m-auto" name='name' id="formGroupExampleInput" placeholder="Name" 
            onChange={newData}
            value={update && update.name}
            />
        </div>
        <div className="mb-3 text-center">
            <label className="form-label">Another label</label>
            <input type="email" className="form-control w-50 m-auto" name='email' id="formGroupExampleInput2" placeholder="Email" 
            onChange={newData}
            value={update && update.email}
            />
        </div>
        <div className="mb-3 text-center">
            <label className="form-label">Another label</label>
            <input type="text" className="form-control w-50 m-auto" name='age' id="formGroupExampleInput2" placeholder="age" 
            onChange={newData}
            value={update && update.age}
            />
        </div>
        <div>
        <input type="radio" name='gender' value='Male' 
        onChange={newData}
        checked={update && update.gender === 'Male'}
        />
        <label>Male</label>
        </div>
        <div>
        <input type="radio" name='gender' value='Female' 
        onChange={newData}
        checked={update && update.gender === 'Female'}
        />
        <label>Female</label>
        </div>
        <button className='bg-primary text-white border-0 pt-2 pe-4 pb-2 ps-4'>submit</button>
    </form>
    </>
  )
}

export default Update