import React, { useState } from 'react'
import "../../../style/second_half.css"

import { Select } from 'antd';
import { Typography } from 'antd';

import { Alert, Button, Checkbox, Form, Input } from 'antd';
import Link from 'antd/es/typography/Link';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { InputNumber } from 'antd';

import {  useNavigate,} from "react-router-dom";
const { Title } = Typography;

export default function Second_half() {
 
const [circularProgress,makeCircularProgress]=useState(false)

 let [otherErrs,setOtherErrors]=useState("")
 let navigate=useNavigate()

  const handleChangeLocation = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeArea = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setOtherErrors("")
  };

  const onFinish=(data)=>{
    console.log("success ",data);
  }
  return (
    <div className='secon_half'>
       <Title level={2}>Predict our real state prices</Title>
       <div className='form'>
         <Form
              layout="vertical"
              name="basic"
              labelCol={{
                span: 58,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                Width:700,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
          >
               <Form.Item
                  label="Location"
                  name="location"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your username!',
                    },
                  ]}
                >
                  <Select
                      allowClear
                      style={{
                        width: 120,
                      }}
                      onChange={handleChangeLocation}
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
              </Form.Item>
              <Form.Item
                  label="Area Type"
                  name="area_type"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Area Type',
                    },
                  ]}
                >
                  <Select
                      allowClear
                      style={{
                        width: 120,
                      }}
                      onChange={handleChangeArea}
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
              </Form.Item>
              <Form.Item
                  label="Size"
                  name="sqft"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter size',
                    },
                  ]}
                 >
                   <InputNumber addonBefore="+" addonAfter="$" defaultValue={1000} />
                </Form.Item>
                <Form.Item
                  label="Number of Bath"
                  name="bath"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter bath',
                    },
                  ]}
                >
                  <InputNumber min={0}  defaultValue={1}/>;
                </Form.Item>
                <Form.Item
                  label="Number of Balcony"
                  name="balcony"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter balcony',
                    },
                  ]}
                >
                  <InputNumber min={0}  defaultValue={1}/>;
                </Form.Item>
                <Form.Item
                  label="Number of BHK"
                  name="bhk"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter bhk',
                    },
                  ]}
                >
                  <InputNumber min={0}  defaultValue={1}/>;
                </Form.Item>
             
              <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                 {circularProgress?<circularProgress/>:  <Button type="primary" htmlType="submit">
                    predict
                  </Button>}
              </Form.Item>
              {otherErrs&&<Alert message={otherErrs} type="error" showIcon />}
       </Form>
       </div>

      <div>
            here
      </div>
    </div>
  )
}
