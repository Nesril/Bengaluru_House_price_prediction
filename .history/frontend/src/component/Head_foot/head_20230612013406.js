import React from 'react'
import "../../style/head.css"
import { Button } from 'antd';
import { Link } from 'react-router-dom';
export default function head() {
  return (
    <div className='header'>
        <div className='header-logo'>
          <Link to={"/"}><img src='image/logo.png'/></Link>
        </div>
        <div className='header-left'> 
            <div><Link to={"/signIn"}><Button>Sign in </Button></Link></div>
            <div><Link to={"/history"}><Button>History</Button></Link></div>
        </div>
    </div>
  )
}
