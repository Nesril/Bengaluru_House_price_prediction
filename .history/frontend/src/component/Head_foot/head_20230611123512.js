import React from 'react'
import "../../style/head.css"
export default function head() {
  return (
    <div className='header'>
        <div className='header-logo'>
            <img src='image/logo.png'/>
        </div>
        <div className='header-left'> 
            <div><button>Sign in</button></div>
            <div><button>History</button></div>
        </div>
    </div>
  )
}
