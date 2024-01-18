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
import MyReviewsRoute from './routes/MyReviewsRoute.jsx'
import customTheme from "./utils/themes.jsx";
import CreateReviewRoute from './routes/CreateReviewRoute.jsx';
import { SearchRoute } from './routes/SearchRoute.jsx'
import { OpinionRoute } from './routes/OpinionRoute.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={customTheme}>
    <UserProvider>
      <Router>
        <Routes>
            <Route path='/' element={<LoginRoute/>}/>
            <Route path='/signup' element={<SignupRoute/>}/>
            <Route path='/my_reviews' element={<MyReviewsRoute/>}/>
            <Route path='/review/create' element={<CreateReviewRoute/>}/>
            <Route path='/search' element={<SearchRoute/>}/>
            <Route path='/opinion' element={<OpinionRoute/>}/>
        </Routes>
      </Router>
    </UserProvider>
  </ChakraProvider>,
)
