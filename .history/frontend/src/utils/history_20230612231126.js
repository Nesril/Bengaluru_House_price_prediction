import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function History({userData}) {
  let navigate=useNavigate()
  if(!userData?.data?.isLogged){
    return navigate("/")
  }
  return (
    <div>
      history
    </div>
  )
}
