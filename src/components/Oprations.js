import React from 'react'
import { Actions } from '../App'

function Oprations({opration,dispatch}) {
  return (
    <button onClick={()=>{
        dispatch({type:Actions.choose_opration,payload:{opration}})
      }}>{opration}</button>
  )
}

export default Oprations