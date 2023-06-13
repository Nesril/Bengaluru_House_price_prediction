import React from 'react'
import First_half from "./first_half/first_half"
import Second_half from "./second_half/second_half"
import "../../style/body.css"
export default function body() {
  return (
    <div>
       <div><First_half /></div>
       <div><Second_half/></div>
    </div>
  )
}
