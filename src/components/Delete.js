import React from 'react'
import { Actions } from '../App'

function Delete({dispatch}) {
  return (
    <button onClick={()=>{
        dispatch({type:Actions.delete})
      }}>Del</button>
  )
}

export default Delete