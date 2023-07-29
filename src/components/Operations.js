import React from 'react'
import { Actions } from '../App'

function Operations({operation,dispatch}) {
  return (
    <button onClick={()=>{
        dispatch({type:Actions.choose_Operation,payload:{operation}})
      }}>{operation}</button>
  )
}

export default Operations