import React from 'react'
import { Actions } from '../App'

function Clear({dispatch,bcColor,color}) {
  return (
    <button className='span-two' onClick={()=>{
        dispatch({type:Actions.clear})
      }} style={{backgroundColor:bcColor, color:color}}>AC</button>
  )
  
}

export default Clear