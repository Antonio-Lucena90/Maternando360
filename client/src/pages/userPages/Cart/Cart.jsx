import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'

const Cart = () => {
  const {cart} = useContext(AuthContext);
  console.log(cart);
  
  return (
    <div>
      {cart?.map((e)=>{
        return(
          <div key={e.workshop_id}>
            <p>Nombre: {e.workshop_name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Cart