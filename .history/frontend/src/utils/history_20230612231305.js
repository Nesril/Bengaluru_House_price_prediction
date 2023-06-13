import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function History({userData}) {
  let navigate=useNavigate()
  useEffect(()=>{
  if(!userData?.data?.isLogged){
    return navigate("/signIn")
  }
})
  return (
    <div>
      history
    </div>
  )
}
