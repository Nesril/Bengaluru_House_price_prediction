import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EachHistory from './EachHistory'
import "../style/history.css"
import { CircularProgress } from '@mui/material'

export default function History({userData}) {
  let navigate=useNavigate()
  useEffect(()=>{
  if(!userData?.data?.isLogged){
    return navigate("/signIn")
  }
})
const [loading,setLoading]=useState(false)
const [errorMesssage,setErrorMesssage]=useState("")
const [history,gwtHistory]=useState([])
useEffect(()=>{
  axios.get(`http://localhost:1994/prdict/getHistory/${userData?.data?._id}`,
  {
     headers: {
        authorization:userData?.token,
        'Content-Type': 'application/json'
     } 
  }).then(function (response) {
    gwtHistory(response.data.data)
      setLoading(false)
      setErrorMesssage("")
      console.log(response.data)
  }).catch((error) => {
    setLoading(false)
    gwtHistory("")
    setErrorMesssage("error occured, please try again!!")
    if (error.response) {
      console.log(error.response.data);
      console.log("server responded");
    } else if (error.request) {
      console.log("network error");
      console.log(error.request);
    } else {
      console.log(error);
    }
  }); 
},[userData])
  return (
    <div className='history'>
        <h1 >Prediction History</h1>
        {loading?<CircularProgress/>:
        <>
            {errorMesssage?<div className='history-error'>{errorMesssage}</div>:
              <div className='history-all'>
                {history?.map((e,index)=>{
                  return <EachHistory no={index} data={e} getHistory={gwtHistory} userData={userData}/>
                })}
              </div>
            }
        
        </>}
    </div>
  )
}
