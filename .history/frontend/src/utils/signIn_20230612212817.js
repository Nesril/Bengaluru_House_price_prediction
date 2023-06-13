import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input,message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {  KeyOutlined} from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import axios from 'axios';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
  useNavigate,
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
export default function RighSide({setUserData,userData,setCount,count}) {
  const [loading,setLoading]=useState(false)
  let navigate=useNavigate()
  

  const [errorMessage,setErrorMessage]=message.useMessage();
  const [messageApi, contextHolder] = message.useMessage();
   //successfull message
   const success = () => {
    messageApi.open({
      type: 'success',
      content: 'successfuly logged in',
      duration: 3,
    });
    setTimeout(()=>{
      navigate("/")
    },3000)
  };
  
  //errror message
  const Error = (message) => {
   errorMessage.open({
     type: 'error',
     content: message,
     duration: 3,
   });
 
 };
  const onFinish = async(values) => {
    setLoading(true)
    setCount(count+1)
    console.log('Success:', values);
    let stringfyValue=JSON.stringify(values)
    axios.post('http://localhost:5000/api/user/logIn',stringfyValue, //proxy uri
    {
       headers: {
          authorization: ' xxxxxxxxxx' ,
          'Content-Type': 'application/json'
       } 
    }).then(function (response) {
      setLoading(false)
      setUserData(response.data)
      if(values){
        success()
      }
      //console.log(response.data)
    }).catch((error) => {
      setLoading(false)
      if (error.response) {
        console.log(error.response.data);
        Error(error.response.data.msg)
        console.log("server responded");
      } else if (error.request) {
        Error("network error")
        console.log("network error");
        console.log(error.request);
      } else {
        console.log(error);
        Error("network error")
      }
    });
 }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
 
  return (
    <div className='rightSide'>
         <h2  className='rightSideTitle'>Sign in</h2>
         {setErrorMessage}
         {contextHolder}
         <section className='rightSideForm'>
            <Form
              layout="vertical"
              name="basic"
              labelCol={{
                span: 28,
              }}
              wrapperCol={{
                span: 86,
              }}
              style={{
                Width:800,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
        >
            <Form.Item
                label="email or username"
                name="emailOrusername"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email or udername!',
                  },
                ]}
              >
              <Input size="middle"  prefix={<UserOutlined />} />
            </Form.Item>
              <Form.Item
                label="password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password!',
                  },
                ]}
              >
                <Input.Password size="middle" placeholder="password" prefix={<KeyOutlined />} />       
              </Form.Item>
              <Form.Item wrapperCol={{
                offset: 8,
                span: 16,
               }}>
                     <Link href="/sign/signIn/forgetPassword" >
                        Forgrt Password
                        </Link> 
             </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
           
                {loading?<CircularProgress size={24} color="success"/>: <Button type="primary" htmlType="submit">Submit </Button>}
               
              </Form.Item>
            </Form>
            <div>
                <Link href='/signUp'>Sign up</Link>
            </div>
         </section>
      
    </div>
  )
}
