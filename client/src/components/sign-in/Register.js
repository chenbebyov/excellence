import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions/user.actions';

import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


const Register = (props) => {

    const dispatch = useDispatch();
    
    const save = (values) => {
        console.log('Success:', values); 
        dispatch(createUser(values));       
    }
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form {...layout} name="login" initialValues={{ remember: true }} onFinish={save} onFinishFailed={onFinishFailed} >
                <Form.Item
                    label="first name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            pattern:"(^[a-zA-Z]+$)",
                            min:2,
                            message: 'first name is required and must be at least 2 chars',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="last name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            pattern:"(^[a-zA-Z]+$)",
                            min:2,
                            message: 'first name is required and must be at least 2 chars',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                            type: 'email'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Register;