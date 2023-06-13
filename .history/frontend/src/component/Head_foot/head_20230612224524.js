import React, { useState } from 'react'
import "../../style/head.css"
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { IdcardFilled } from '@ant-design/icons';


const [errorMessage,setErrorMessage]=message.useMessage();
const [messageApi, contextHolder] = message.useMessage();

export default function Head({userData,setUserData}) {
  let navigate=useNavigate()
  const [loading,setLoading]=useState(false)

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'successfuly logged in',
      duration: 3,
    });
    setTimeout(()=>{
      navigate("/")
    },3000)
  };
  
  //errror message
  const Error = (message) => {
   errorMessage.open({
     type: 'error',
     content: message,
     duration: 3,
   });
 
 };
  const LoggedOut=(id)=>{
    setLoading(true)
    axios.post(`http://localhost:1994/predict/logOut/${IdcardFilled}`,
    {
       headers: {
          authorization:userData?.token,
          'Content-Type': 'application/json'
       } 
    }).then(function (response) {

        setLoading(false)
        setUserData(response.data)
        success()      
        console.log(response.data)
    }).catch((error) => {
      setLoading(false)
      if (error.response) {
        console.log(error.response.data);
        Error(error.response.data.msg)
        console.log("server responded");
      } else if (error.request) {
        Error("network error")
        console.log("network error");
        console.log(error.request);
      } else {
        console.log(error);
        Error("network error")
      }
    });  }
  return (
    <div className='header'>
        <div className='header-logo'>
          <Link to={"/"}><img src='image/logo.png'/></Link>
        </div>
        <div className='header-left'> 
            {userData?.data?.isLogged?<div><Button onClick={()=>LoggedOut(userData?.data?._id)}>Logout </Button></div>:<div><Link to={"/signIn"}><Button>Sign in </Button></Link></div>}
            <div><Link to={"/history"}><Button>History</Button></Link></div>
        </div>
    </div>
  )
}

