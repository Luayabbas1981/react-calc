import React from 'react'
import { Actions } from '../App'


function Button({dispatch,digit}) {
  
  return (
    <button  onClick={()=>{
        dispatch({type:Actions.add_digit,payload:{digit}})
       
      }} >{digit}</button>
  )
}

export default Button