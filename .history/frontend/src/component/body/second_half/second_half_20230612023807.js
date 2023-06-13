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
                  label=""
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your username!',
                    },
                  ]}
                >
              </Form.Item>
              <Form.Item
                  label=""
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your username!',
                    },
                  ]}
                >
                <Input size="middle" placeholder='username' prefix={<UserOutlined />} />
              </Form.Item>
  
              <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                 {circularProgress?<CircularProgress/>:  <Button type="primary" htmlType="submit">
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
