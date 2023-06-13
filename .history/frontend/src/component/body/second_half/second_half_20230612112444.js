import React, { useState } from 'react'
import "../../../style/second_half.css"

import { Select } from 'antd';
import { Typography } from 'antd';
import {Loactions} from "./loaction"
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
       <div className='secon_half-form'>
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
              <Title level={4}>Type</Title>
              <div className='secon_half-form-upper'>
                <Form.Item
                    label="Location"
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter  Location',
                      },
                    ]}
                  >
                    <Select
                        showSearch
                        style={{
                          width: 200,
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={Loactions}
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
                            value: 3,
                            label: 'Super built-up  Area',
                          },
                          {
                            value: 2,
                            label: 'Plot  Area',
                          },
                          {
                            value: 0,
                            label: 'Built-up  Area',
                          },
                          {
                            value: 1,
                            label: 'Carpet  Area',
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
                    <InputNumber  addonAfter="sqft" defaultValue={1000} />
                </Form.Item>
             </div>
             <Title level={4}>Component</Title>
             <div className='secon_half-form-bottom'>
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
                  <InputNumber min={0} />;
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
                  <Input/>;
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
                  <InputNumber min={0}  />;
                </Form.Item>           
             </div>
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
