import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { AuthContext } from '../contexts/AuthContext/AuthContext'

export const PublicRoutes = () => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      if(user.type === 1) navigate('/userPage')
      if(user.type === 2) navigate('/admin')
    }
  },[user])

  return (
    <>
    {!user &&<Outlet/>}
     </>
  )
}
