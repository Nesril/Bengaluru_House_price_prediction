import React from 'react'
import "../../../style/second_half.css"

import { Select } from 'antd';
export default function second_half() {
 
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className='secon_half'>
      <div> 
        <Select
        defaultValue="lucy"
        allowClear
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'Yiminghe',
            label: 'yiminghe',
          },
          {
            value: 'disabled',
            label: 'Disabled',
            disabled: true,
          },
        ]}
       />
      </div>
    </div>
  )
}
