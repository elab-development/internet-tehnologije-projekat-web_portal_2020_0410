import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './routes/Login.jsx';
import Signup from './routes/Signup.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <Router>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
  </ChakraProvider>,
)
