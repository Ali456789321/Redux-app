import React from 'react'
import { useSelector } from 'react-redux';

const Custom = ({id, popUp, setPop}) => {

  const {users} = useSelector((state) => state.app)
  const single = users.filter((ele) => ele.id === id)
console.log(single[0].name);

  return (
    <div className='custom-bg'>
      <div className="custom text-center">
         <h1>{single[0].name}</h1>
         <h3>{single[0].email}</h3>
         <h4>{single[0].age}</h4>
         <h5>{single[0].gender}</h5>
         <button onClick={() => setPop(false)}>Close</button>
      </div>
    </div>
  )
}

export default Custom