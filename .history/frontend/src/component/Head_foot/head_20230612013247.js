import React from 'react'
import "../../style/head.css"
import { Button } from 'antd';
import { Link } from 'react-router-dom';
export default function head() {
  return (
    <div className='header'>
        <div className='header-logo'>
            <img src='image/logo.png'/>
        </div>
        <div className='header-left'> 
            <div><Button><Link to={"/signIn"}>Sign in</Link> </Button></div>
            <div><Button><Link to={"/history"}>History</Link></Button></div>
        </div>
    </div>
  )
}
