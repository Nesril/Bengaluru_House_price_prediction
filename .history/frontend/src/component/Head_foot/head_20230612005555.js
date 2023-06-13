import React from 'react'
import "../../style/head.css"
import { Button, Space } from 'antd';
export default function head() {
  return (
    <div className='header'>
        <div className='header-logo'>
            <img src='image/logo.png'/>
        </div>
        <div className='header-left'> 
            <div><Button>Sign in</Button></div>
            <div><Button>History</Button></div>
        </div>
    </div>
  )
}
