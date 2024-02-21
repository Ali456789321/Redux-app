import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk('createUser', async (data, {rejectWithValue}) => {
   const response = await fetch("https://65ae4d981dfbae409a747fd6.mockapi.io/crud", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
   });
   try{
    const result = await response.json()
    return result
   } 
   catch (error) {
      return error
   }
})

//Show User
export const showUser = createAsyncThunk('showUser', async (arg, {rejectWithValue}) => {
    const response = await fetch("https://65ae4d981dfbae409a747fd6.mockapi.io/crud")
    const result = await response.json()
    try {  
        return result
    } catch (error) {
        rejectWithValue(error)
    }
})


//Delete User
export const deleteUser = createAsyncThunk('deleteUser', async (id, {rejectWithValue}) => {
    const response = await fetch(`https://65ae4d981dfbae409a747fd6.mockapi.io/crud/${id}`,
    {method: "DELETE"}
    )
    try {  
        const result = await response.json()
        return result
    } catch (error) {
        rejectWithValue(error)
    }
})

//Update User
export const updateUser = createAsyncThunk('updateUser', async (data, {rejectWithValue}) => {
    console.log('updated', data);
    const response = await fetch(`https://65ae4d981dfbae409a747fd6.mockapi.io/crud/${data.id}`, {
     method: "PUT",
     headers: {
         "Content-Type": "application/json"
     },
     body: JSON.stringify(data)
    });
    try{
     const result = await response.json()
     return result
    } 
    catch (error) {
       return error
    }
 })

const createPending = createAction(createUser.pending)
const createFullfilled = createAction(createUser.fulfilled)
const createRejected = createAction(createUser.rejected)

const showPending = createAction(showUser.pending)
const showFullfilled = createAction(showUser.fulfilled)
const showRejected = createAction(showUser.rejected)

const deletePending = createAction(deleteUser.pending)
const deleteFullfilled = createAction(deleteUser.fulfilled)
const deleteRejected = createAction(deleteUser.rejected)

const updatePending = createAction(updateUser.pending)
const updateFullfilled = createAction(updateUser.fulfilled)
const updateRejected = createAction(updateUser.rejected)

  const useDetails = createSlice({
    name: 'useDetail',
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: "",
        searchEmail:"",
        searchAge:""
    },
    reducers: {
        setSearchData: (state, action) => {
            console.log("Set search data:", action.payload);
      return {
        ...state,
        searchData: action.payload
      };
        },
        setEmailData: (state, action) => {
            console.log("Set email data:", action.payload);
      return {
        ...state,
        searchEmail: action.payload
      };
        },
        setAgeData: (state, action) => {
            console.log("Set age data:", action.payload);
      return {
        ...state,
        searchAge: action.payload
      };
       }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createPending, (state) => {
            state.loading = true
        })
        .addCase(createFullfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload)
        })
        .addCase(createRejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })


         //Show Data
        .addCase(showPending, (state) => {
            state.loading = true
        })
        .addCase(showFullfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload
        })
        .addCase(showRejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })

          //Delete Data
          .addCase(deletePending, (state) => {
            state.loading = true
        })
        .addCase(deleteFullfilled, (state, action) => {
            state.loading = false;
            // state.users = action.payload
            const {id} = action.payload
            if(id){
                state.users = state.users.filter((ele) => ele.id !== id)
            }
            console.log(action.payload);
        })
        .addCase(deleteRejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })


        //Update Data
        .addCase(updatePending, (state) => {
            state.loading = true
        })
        .addCase(updateFullfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.map((ele) => (
                ele.id === action.payload.id ? action.payload : ele
            ))
        })
        .addCase(updateRejected, (state,action) => {
            state.loading = false
            state.error = action.payload
        })

    }
   
})

export const {setSearchData, setEmailData, setAgeData} = useDetails.actions
export default useDetails.reducer