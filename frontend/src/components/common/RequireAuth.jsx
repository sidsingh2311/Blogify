import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth' 
import { Navigate } from 'react-router-dom'

const RequireAuth = ({children}) => { 
    const{user} = useContext(AuthContext);
     
    // if the user is null return it to the home page 
    if(!user) {
        return <Navigate to={'/login'} />
    } 

    return children;
   
}

export default RequireAuth