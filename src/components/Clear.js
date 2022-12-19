import React from 'react'
import { Actions } from '../App'

function Clear({dispatch}) {
  return (
    <button className='span-two' onClick={()=>{
        dispatch({type:Actions.clear})
      }}>AC</button>
  )
  
}

export default Clear