import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, setEmailData, setSearchData, showUser} from '../featrues/counterSlice'
import Custom from './Custom'
import { Link, useNavigate } from 'react-router-dom'
import './read.css'


const Read = () => {
    const dispatch = useDispatch();
    const { users, loading, searchData, searchEmail, searchAge } = useSelector((state) => state.app);
    const [popUp, setPop] = useState(false);
    const [radio, setRadio] = useState("");
    const [id, setId] = useState("");
    const [search, setSearch] = useState("");
    const [email, setEmail] = useState("");
    // const [age, setAge] = useState("")
    const [dataFound, setDataFound] = useState(true);

    const navigate = useNavigate()

    const goBack = () => {
        navigate('/read')
    }
  
    useEffect(() => {
      dispatch(setSearchData(search));
    }, [search]);

    useEffect(() => {
      dispatch(setEmailData(email))
    }, [email])

  
    useEffect(() => {
      dispatch(showUser());
    }, []);

  
    useEffect(() => {
      setDataFound(
        users.some((ele) => {
          const nameCheck = ele.name.toLowerCase().includes(searchData.toLowerCase());
          const mailCheck = ele.email.toLowerCase().includes(searchEmail.toLowerCase());
          return (nameCheck && mailCheck);
        })
      );
    }, [searchData, users]);

    if (loading) {
      return <h1>loading</h1>;
    } else {
      const filteredData = users.filter((ele) => {
        const nameMatch = ele.name.toLowerCase().includes(searchData.toLowerCase());
        return nameMatch
      })
      .filter((ele) => {
        const emailMatch = ele.email.toLowerCase().includes(searchEmail.toLowerCase());
        return emailMatch
      })
      .filter((ele) => {
        if (radio === "Male" || radio === "Female") {
          return ele.gender === radio;
        } else {
          return true;
        }
      });
  
      return (
        <>
          <div>
            {popUp && <Custom id={id} popUp={popUp} setPop={setPop} />}
            <div className='text-center inputs'>
            <h1 className="text-center text-white mb-5">All Data</h1>
            <div className='mb-5'>
              <label>Search:</label>
              <input placeholder='Search your name' className='read-input' type="text" onChange={(e) => setSearch(e.target.value)} />
              <input placeholder='Email' className='read-input' type="text" onChange={(e) => setEmail(e.target.value)}/>
              {/* <input placeholder='Age' className='read-input' type="text" onChange={(e) => setAge}/> */}
            </div>
            <input
              type="radio"
              name="gender"
              checked={radio === ""}
              onChange={() => setRadio("")}
            />
            <label>All</label>
            <input
              type="radio"
              name="gender"
              checked={radio === "Male"}
              onChange={() => setRadio("Male")}
            />
            <label>Male</label>
            <input
              type="radio"
              name="gender"
              checked={radio === "Female"}
              onChange={() => setRadio("Female")}
            />
            <label>Female</label>
            </div>
            {dataFound ? (
              filteredData.map((ele) => (
                <div key={ele.id} className="data">
                  <div className='d-flex name'>
                  <h6>Name:</h6>
                  <h6>{ele.name}</h6>
                  </div>
                  <div className='d-flex email'>
                  <h6>Email:</h6>
                  <h6>{ele.email}</h6>  
                  </div>
                  <div className='d-flex age'>
                  <h6>Age:</h6>
                  <h6>{ele.age}</h6>
                  </div>
                  <div className='read-btn'>
                  <button className='view-btn' onClick={() => [setId(ele.id), setPop(true)]}>View</button>
                  <button className='edit-btn'>
                  <Link to={`/edit/${ele.id}`}>Edit</Link>
                  </button>
                  <button className='delete-btn' onClick={goBack}> 
                  <a onClick={() => [dispatch(deleteUser(ele.id)), navigate('/read')]} href="#">
                    Delete
                  </a>
                  </button>
                  </div>
                </div>
              ))
            ) : (
              <h1>No such data name found from the existing data.</h1>
            )}
          </div>
        </>
      );
    }
  };
  
  export default Read;
  