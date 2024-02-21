import { configureStore } from '@reduxjs/toolkit'
import  useDetails   from '../featrues/counterSlice'

export default configureStore({
    reducer:{
        app: useDetails
    }
})
