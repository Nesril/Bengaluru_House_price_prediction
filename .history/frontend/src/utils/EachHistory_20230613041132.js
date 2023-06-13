import { Button, Divider } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import moment from "moment"
export default function EachHistory({no,data,getHistory,userData}) {
    const Areas=['Built-up  Area','Carpet  Area','Plot  Area','Super built-up  Area']
    const [loading,setLoading]=useState(false)
   const [errorMesssage,setErrorMesssage]=useState("")
    const deleteHistory=(id,History)=>{
        setLoading(true)
        setErrorMesssage("")
        let stringify=JSON.stringify(History)
        console.log(stringify);
        axios.put(`http://localhost:1994/predict/deleteHistorySingle/${userData?.data?._id}`,stringify,
        {
           headers: {
              authorization:userData?.token,
              'Content-Type': 'application/json'
           } 
        }).then(function (response) {
            getHistory(response.data.data)
            setLoading(false)
            setErrorMesssage("")
            console.log(response.data)
        }).catch((error) => {
          setLoading(false)
          setErrorMesssage("error occured, please try again!!")
          if (error.response) {
            console.log(error.response.data);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
            console.log(error.request);
          } else {
            console.log(error);
          }
        });
    }
 return (
    <div className='history-each'>
         <div>{no+1}</div>
         <div>       
            <div className='history-each-data_used'>
                <div>Area type: <span className='history-each-data_used_area'>{Areas[data.data.area_type]}</span></div>
                <div>Location:  <span className='history-each-data_used_location'>{data.data.location}</span></div>
                <div>Area size: <span className='history-each-data_used_size'>{data.data.sqft} sq.ft</span></div>
                <div>Number of Baths: <span className='history-each-data_used_number'>{data.data.bath}</span></div>
                <div>Number of BHK: <span className='history-each-data_used_number'>{data.data.bhk}</span></div>
                <div>Number of balcony: <span className='history-each-data_used_number'>{data.data.balcony}</span></div>
            </div>
            <div className='history-each-prediction'>
                {data.prediction}
                <div className='history-each-prediction-date'> 
                 {moment(data.date).calendar()}
                </div>
            </div>
            <div className='history-each-deleteButton'>
                <Button danger onClick={()=>deleteHistory(data.id,data)}>Delete History</Button>
            </div>
            <Divider/>
        </div>
    </div>
  )
}
