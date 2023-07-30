import React from 'react'
import { Actions } from '../App'

function Operations({operation,dispatch,bcColor,color}) {
  return (
    <button onClick={()=>{
        dispatch({type:Actions.choose_Operation,payload:{operation}})
      }} style={{backgroundColor:bcColor, color:color}}>{operation}</button>
  )
}

export default Operations