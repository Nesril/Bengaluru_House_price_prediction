import React from 'react'
import "../../../style/second_half.css"

import { Select } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

export default function second_half() {
 
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className='secon_half'>
       <Title level={2}>Predict our real state prices</Title>
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
          },
        ]}
       />
      </div>
      <div>

      </div>
    </div>
  )
}
