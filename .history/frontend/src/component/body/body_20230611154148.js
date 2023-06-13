import React from 'react'
import First_half from "./first_half/first_half"
import Second_half from "./second_half/second_half"
import { SliderData } from './first_half/SliderData'
import "../../style/body.css"
export default function body() {
  return (
    <div>
       <div><First_half slides={SliderData}/></div>
       <div><Second_half/></div>
    </div>
  )
}
