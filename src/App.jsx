import './App.css'
import Navbar from './components/Navbar';
import Create from './components/Create';
import {BrowserRouter, Route, Routes, HashRouter} from 'react-router-dom'
import Read from './components/Read';
import Update from './components/Update';

function App() {



  return (
    <>
      <HashRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Create/>}/>
        <Route path='/read' element={<Read/>}/>
        <Route path='/edit/:id' element={<Update/>}/>
      </Routes>
      </HashRouter>
    </> 
  )
}

export default App
