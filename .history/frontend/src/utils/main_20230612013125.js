import React from 'react'
import Head from '../component/Head_foot/head'
import Footer from '../component/Head_foot/foots'
import { Outlet } from 'react-router-dom'
export default function main() {
  return (
    <div>
         <div><Head /></div>
         <div><Outlet /></div>
         <div><Footer /></div>
    </div>
  )
}
