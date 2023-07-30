import React from 'react'
import { Actions } from '../App'

function Delete({dispatch,bcColor,color}) {
  return (
    <button onClick={()=>{
        dispatch({type:Actions.delete})
      }} style={{backgroundColor:bcColor, color:color}}>Del</button>
  )
}

export default Delete