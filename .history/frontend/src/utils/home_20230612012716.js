import React from 'react'
import First_half from "../component/body/first_half/first_half"
import Second_half from "../component/body/second_half/second_half"
import "../../style/body.css"
export default function body() {
  return (
    <div>
       <div  className='carousel'><First_half /></div>
       <div><Second_half/></div>
       <img src="/image/embassy_pristine-bellandur-bengaluru-redundant.jpg.webp" alt="bg image" className='bgdonut1' />
    </div>
  )
}
