import React from 'react'
import { Actions } from '../App'


function Button({dispatch,digit,color,bcColor}) {
  
  return (
    <button  onClick={()=>{
        dispatch({type:Actions.add_digit,payload:{digit}})
       
      }} style={{backgroundColor:bcColor, color:color}}>{digit}</button>
  )
}

export default Button