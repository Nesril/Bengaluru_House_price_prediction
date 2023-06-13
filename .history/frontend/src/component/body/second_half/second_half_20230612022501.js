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
    style={{
      width: 200,
    }}
    onChange={handleChange}
    options={[
      {
        label: 'Manager',
        options: [
          {
            label: 'Jack',
            value: 'jack',
          },
          {
            label: 'Lucy',
            value: 'lucy',
          },
        ],
      },
      {
        label: 'Engineer',
        options: [
          {
            label: 'yiminghe',
            value: 'Yiminghe',
          },
        ],
      },
    ]}
  />
      </div>
    </div>
  )
}
