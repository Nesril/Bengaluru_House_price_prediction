import React, { useState } from 'react'
import { Button,message  ,Checkbox, Select,Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {  KeyOutlined} from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from '@mui/material';
import "../style/signUp.css"
export default function Signup() {
 
  const [loadWhileSigningUp,setLoadWhileSigningUp]=useState(false)
 
  const [errorMessage,setErrorMessage]=message.useMessage();
  const [messageApi, contextHolder] = message.useMessage();
  let navigate=useNavigate()

   //successfull message
  const success = () => {
   messageApi.open({
     type: 'success',
     content: 'successfuly registerd',
     duration: 3,
   });
   setTimeout(()=>{
     navigate("/sign/signIn")
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
    setLoadWhileSigningUp(true)
    console.log('Success:', values);
    let stringfyValue=JSON.stringify(values)
    axios.post('http://localhost:5000/api/user',stringfyValue, //proxy uri
    {
       headers: {
          authorization:`xxxxxxx` ,
          'Content-Type': 'application/json'
       } 
    }).then(function (response) {
       //alert(response.data.data.msg)
       setLoadWhileSigningUp(false)
       success()
    }).catch((error) => {
      setLoadWhileSigningUp(false)
      if (error.response) {
        console.log(error.response.data);
        Error(error.response.data.msg)
        console.log("server responded");
      } else if (error.request) {
        console.log("network error");
        Error("network error")
      } else {
        console.log(error);
        Error("network error")
      }
    });
 }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
 let [submitClicked,setSubmitClicked]=useState(false)
 function submitd(){
  setSubmitClicked(true)
 }

//bello 700px
let minimalWidth=useMediaQuery('(max-width:500px)')
  return (
    <div className={`signUp ${minimalWidth&&"minimumSignUpMessage"}`}>
      <div className='signUp-rigthtChild'>
         <h2>Sign up</h2>
         <section className='signUp-rightChild-form'>
            {contextHolder}
            <Form
              layout="vertical"
              name="basic"
              labelCol={{
                span: 23,
              }}
              wrapperCol={{
                span: 50,
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
                  label="Fullname"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter username!',
                    },
                  ]}
                >
                <Input size="middle"  prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type:"email",
                      message: 'Please enter valid email!',
                    },
                  ]}
                >
                <Input size="middle"  prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
          name="password"
          label="Password"
          
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password  size="middle"  prefix={<KeyOutlined />}/>
             </Form.Item>
             <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password  size="middle"  prefix={<KeyOutlined />}/>
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
               {loadWhileSigningUp?
                <CircularProgress size={20}/>
                  :
                 <Button type="primary" htmlType="submit" onClick={submitd}>
                   Create
                </Button>
               }
              </Form.Item>
           </Form>
           <div>
           
            {setErrorMessage}
              <Link href='/sign/signIn'>{!submitClicked?"already have an account":"Sign In"}</Link>
          </div>
       </section>
      </div>
    </div>
  )
}
