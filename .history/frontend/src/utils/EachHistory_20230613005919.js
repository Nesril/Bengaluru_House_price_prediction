import React from 'react'

export default function EachHistory({data,getHistory,userData}) {
  return (
    <div className='history-each'>
         <div className='history-each-data_used'>
             <div>Area type: {data.data.area_type}</div>
             <div>Location: {data.data.location}</div>
             <div>Area size: {data.data.sqft} care metere square</div>
             <div>Number of Baths: {data.data.bath}</div>
             <div>Number of BHK: {data.data.bhk}</div>
             <div>Number of balcony: {data.data.balcony}</div>
         </div>
         <div className='history-each-prediction'>
            {data.prediction}
        </div>
        <div className='history-each-deleteButton'>
            {data.date}
        </div>
    </div>
  )
}
