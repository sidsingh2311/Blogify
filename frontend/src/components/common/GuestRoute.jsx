import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { Navigate } from 'react-router-dom'

const GuestRoute = ({children}) => {
       // checking if the user is logged in por not 
       const {isLoggedIn} = useContext(AuthContext);
       if(isLoggedIn()) {
          return <Navigate to={`/account/profile`} />
       } 

       return children;
}

export default GuestRoute