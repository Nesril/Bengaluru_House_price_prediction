import React from 'react'
import Head from '../component/Head_foot/head'
import Footer from '../component/Head_foot/foot'
import { Outlet } from 'react-router-dom'
export default function main({userData,setUserData}) {
  return (
    <div>
         <div><Head userData={userData} setUserData={setUserData}/></div>
         <div><Outlet /></div>
         <div><Footer /></div>
    </div>
  )
}
