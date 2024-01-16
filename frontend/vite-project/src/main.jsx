import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { UserProvider } from './context/UserContext.jsx';
import { LoginRoute } from './routes/LoginRoute.jsx';
import { SignupRoute } from './routes/SignupRoute.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <UserProvider>
      <Router>
        <Routes>
            <Route path='/' element={<LoginRoute/>}/>
            <Route path='/signup' element={<SignupRoute/>}/>
        </Routes>
      </Router>
    </UserProvider>
  </ChakraProvider>,
)
