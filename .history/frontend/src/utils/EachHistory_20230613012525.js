import { Button } from 'antd'
import React from 'react'

export default function EachHistory({no,data,getHistory,userData}) {
    const Areas=['Built-up  Area','Carpet  Area','Plot  Area','Super built-up  Area']
    const deleteHistory=(id)=>{
     console.log(id);
    }
 return (
    <div className='history-each'>
         <div>{no}</div>
         <div>       
            <div className='history-each-data_used'>
                <div>Area type: <span className='history-each-data_used_area'>{Areas[data.data.area_type]}</span></div>
                <div>Location:  <span className='history-each-data_used_location'>{data.data.location}</span></div>
                <div>Area size: <span className='history-each-data_used_size'>{data.data.sqft} care metere square</span></div>
                <div>Number of Baths: <span className='history-each-data_used_number'>{data.data.bath}</span></div>
                <div>Number of BHK: <span className='history-each-data_used_number'>{data.data.bhk}</span></div>
                <div>Number of balcony: <span className='history-each-data_used_number'>{data.data.balcony}</span></div>
            </div>
            <div className='history-each-prediction'>
                {data.prediction}
                <div className='history-each-prediction-date'> 
                {data.date}</div>
            </div>
            <div className='history-each-deleteButton'>
                <Button danger onClick={()=>deleteHistory(data.id)}>Delete History</Button>
            </div>
        </div>
    </div>
  )
}
