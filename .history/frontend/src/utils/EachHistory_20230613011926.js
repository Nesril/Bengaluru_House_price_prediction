import { Button } from 'antd'
import React from 'react'

export default function EachHistory({data,getHistory,userData}) {
    const Areas=['Built-up  Area','Carpet  Area','Plot  Area','Super built-up  Area']
    const deleteHistory=(id)=>{
     console.log(id);
    }
 return (
    <div className='history-each'>
         <div className='history-each-data_used'>
             <div>Area type: <span className='history-each-data_used_value'>{Areas[data.data.area_type]}</span></div>
             <div>Location: {data.data.location}</div>
             <div>Area size: {data.data.sqft} care metere square</div>
             <div>Number of Baths: {data.data.bath}</div>
             <div>Number of BHK: {data.data.bhk}</div>
             <div>Number of balcony: {data.data.balcony}</div>
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
  )
}
