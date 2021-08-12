import React, { useState,useMemo, useEffect } from 'react'
import { Button, Input, Row, Col, Form} from 'antd'
import useFirestore from '../firebase/useFirestore';
import { useHistory } from 'react-router-dom';
import { addDocument } from '../firebase/services';
import { AppContext } from '../Context/AppProvider'
export default function Registration(props) {
    const [form] = Form.useForm();
    const [userName, setUserName]= useState('');
    const history = useHistory();
    const user = React.useContext(AppContext);
    const format = /^[a-zA-Z0-9]*$/;
    const handleRegistration = ()=>{
        if(!form.getFieldValue().userName 
        || !form.getFieldValue().password 
        || !form.getFieldValue().checkpassword 
        ||!format.test(form.getFieldsValue().userName)
        ||!format.test(form.getFieldsValue().password)
        || !(form.getFieldValue().password.length >=6 && form.getFieldValue().password.length <=30)
        ||!(form.getFieldValue().userName.length >=6 && form.getFieldValue().userName.length <=30))
            return ;
        if(form.getFieldValue().password !== form.getFieldValue().checkpassword)
            return form.setFieldsValue({
                checkpassword: ''
            })
        setUserName(form.getFieldValue().userName);
    }

    const userNameCondition = useMemo(()=>
    {
        return {
            fieldName: 'userName',
            operator: '==',
            compareValue: userName,
        }
    },[userName]);
    const data = useFirestore('users',userNameCondition);
    useEffect(()=>{
        if(data.length){
            alert('Tài khoản đã tồn tại')
        }
        else{
            if(userName)
            {
                addDocument('users',{ 
                    userName: form.getFieldValue().userName,
                    password: form.getFieldValue().password
                 });
                user.setUserName(userName);
                history.push('./');
            }
        }
    },[data])
    // isLogin, setIsLogin, isRegistration, setIsRegistration
    const handleLogin= () => {
        props.setLogin.setIsRegistration(false);
        props.setLogin.setIsLogin(true);
    }
    return (
        <Row style={{ paddingTop: '100px'}}>
            <Col span={8} offset={8} style={{ padding: '20px' ,border: '1px solid lightgray', borderRadius: '5px',display: props.setLogin.isRegistration?'inline':'none' }}>
                <Form layout='vertical' form={form}>
                    <Form.Item 
                        label='Tài khoản' 
                        name='userName'
                        rules={[
                            { required: true, message: 'Hãy nhập tài khoản' },
                            ()=>({
                                validator(_, value){
                                    const format = /^[a-zA-Z0-9]*$/;
                                    if(format.test(value) && (value.length >=6 && value.length <=30)){
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Tài khoản phải có 6-30 ký tự và không chứa ký tự đặc biệt'));
                                }
                            })
                        ]}
                    >
                        <Input placeholder='Nhập tài khoản'/>
                    </Form.Item>
                    <Form.Item 
                        label='Mật khẩu' 
                        name='password'
                        rules={[{ required: true, message: 'Hãy nhập mật khẩu' },
                            ()=>({
                                validator(_, value){
                                    const format = /^[a-zA-Z0-9]*$/;
                                    if(format.test(value) && (value.length >=6 && value.length <=30)){
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu phải có 6-30 ký tự và không chứa ký tự đặc biệt'));
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Nhập mật khẩu' />
                    </Form.Item>
                    <Form.Item 
                        label='Xác nhận mật khẩu' 
                        name='checkpassword'
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Hãy xác nhận mật khẩu'
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                    
                                  return Promise.reject(new Error('Không chính xác'));
                                },
                              }),
                        ]}
                    >
                        <Input.Password placeholder='Xác nhận mật khẩu' />
                    </Form.Item>
                    <Form.Item>
                        <Button block type='primary' htmlType='submit' onClick={handleRegistration}>Đăng ký</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button block type='primary' onClick={handleLogin}>Đăng nhập</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
