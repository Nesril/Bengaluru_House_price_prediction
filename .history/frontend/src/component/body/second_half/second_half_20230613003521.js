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

export default function Second_half({setUserData,userData}) {
 

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
  
  const [loading,setLoading]=useState(false)
  const [errorMesssage,setErrorMesssage]=useState("false")
  const [predictionValue,setPredictionValue]=useState("")
  const onFinish=(data)=>{
    console.log("success ",data);
    setLoading(true)
    setErrorMesssage("")
    let stringfyValue=JSON.stringify(data)
    axios.put(`http://localhost:1994/predict/makeHistory/${userData?.data?._id}`,stringfyValue,
    {
       headers: {
          authorization:userData?.token,
          'Content-Type': 'application/json'
       } 
    }).then(function (response) {
        setPredictionValue(response.data.history)
        setLoading(false)
        setErrorMesssage("")
        console.log(response.data)
    }).catch((error) => {
      setLoading(false)
      if (error.response) {
        console.log(error.response.data);
        setErrorMesssage(error.response.data.msg)
        console.log("server responded");
      } else if (error.request) {
        setErrorMesssage("network error")
        console.log("network error");
        console.log(error.request);
      } else {
        console.log(error);
        setErrorMesssage("network error")
      }
    }); 
  }
 console.log(predictionValue.prediction);
  return (
    <div className='secon_half'>
       <Title level={3}>Predict our real state prices</Title>
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
           
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                        placeholder="Search to location "
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
                        placeholder="Select Area type "
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
                      }
                    ]}
                  >
                    <InputNumber min={500}  placeholder='1500'   />
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
                   <InputNumber min={1} placeholder='1'  />
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
                  <InputNumber min={1}  placeholder='1' />
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
                  <InputNumber min={1} placeholder='1'  />
                </Form.Item>           
             </div>
              <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                 {loading?<CircularProgress/>:  
                      <Button type="primary" htmlType="submit">
                        predict
                    </Button>}
              </Form.Item>
              {otherErrs&&<Alert message={otherErrs} type="error" showIcon />}
       </Form>
       </div>

      <div className='predictionValue'>
          {predictionValue?.prediction}
      </div>
    </div>
  )
}
