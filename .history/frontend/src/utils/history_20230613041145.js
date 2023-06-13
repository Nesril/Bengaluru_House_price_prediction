import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EachHistory from './EachHistory'
import "../style/history.css"
import { CircularProgress } from '@mui/material'
import { Button } from 'antd'

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
  setLoading(true)
  setErrorMesssage("")
  axios.get(`http://localhost:1994/predict/getHistory/${userData?.data?._id}`,
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

const [loadingToDeleteAll,setLoadingToDeleteAll]=useState(false)
const [errorMessageToDeleteAll,setErrorMessageToDeleteAll]=useState("")

const deleteAll=()=>{
  setLoadingToDeleteAll(false)
  setErrorMessageToDeleteAll("")
  axios.put(`http://localhost:1994/predict/deleteHistoryAll/${userData?.data?._id}`,
  {
     headers: {
        authorization:userData?.token,
        'Content-Type': 'application/json'
     } 
  }).then(function (response) {
      gwtHistory(response.data.data)
      setLoadingToDeleteAll(false)
      console.log(response.data)
      setErrorMessageToDeleteAll("")
  }).catch((error) => {
    setLoadingToDeleteAll(true)
    setErrorMessageToDeleteAll("error occured, please try again !!")
    gwtHistory("")
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
}
  return (
    <div className='history'>
        <h1 >Prediction History</h1>
        {loading?<div className='history-loading'><CircularProgress/></div>:
        <>
            {errorMesssage?<div className='history-error'>{errorMesssage}</div>:
              <div className='history-all'>
                {history.length>0?
                 <>
                    {history?.map((e,index)=>{
                      return <div key={e.id}><EachHistory no={index} data={e} getHistory={gwtHistory} userData={userData}/></div>
                    })}
                 </>
                :
                 <h3>No history is recorded</h3>
                }

                {history.length>0&&
                  <div className='history-deletAllButton'>
                        {loadingToDeleteAll?<CircularProgress/>:
                            <>
                                <Button  onClick={deleteAll}>Delete All</Button>
                                <div>{errorMessageToDeleteAll}</div>
                            </>
                        }
                  </div>
                }
              </div>
            }
        
        </>}
    </div>
  )
}
