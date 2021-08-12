import React, { useState,useMemo, useEffect } from 'react'
import { Button, Input, Row, Col, Form} from 'antd'
import { useHistory } from 'react-router-dom'
import useFirestore from '../firebase/useFirestore'
import { AppContext } from '../Context/AppProvider'
export default function LoginApp(props) {
    const [form] = Form.useForm();
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const user = React.useContext(AppContext);
    const HandleLoginApp = () =>{
        if(!form.getFieldValue().username || !form.getFieldValue().password)
        return ;
        setUserName(form.getFieldValue().username);
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
            if(data[0].password === form.getFieldValue().password)
                {    
                    user.setUserName(userName);
                    return history.push('./');
                }
            else{
                setUserName('');
                return alert('Tài khoản mật khẩu không chính xác');
            }
        }
        else{
            if(userName)
            return alert('Tài khoản mật khẩu không chính xác');
        }
    },[data]);

    const handleRegistration = () => {
        props.setRegistration.setIsRegistration(true);
        props.setRegistration.setIsLogin(false);
    }
    return (
        <Row style={{ paddingTop: '-200px'}}>
            <Col span={8} offset={8} style={{ padding: '20px' ,border: '1px solid lightgray', borderRadius: '5px', display: props.setRegistration.isLogin?'inline':'none' }}>
                <Form layout='vertical' form={form}>
                    <Form.Item 
                        label='Tài khoản' 
                        name='username'
                        rules={[{ required: true, message: 'Hãy nhập tài khoản' }]}
                    >
                        <Input placeholder='Nhập tài khoản'/>
                    </Form.Item>
                    <Form.Item 
                        label='Mật khẩu' 
                        name='password'
                        rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Nhập mật khẩu' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' onClick={ HandleLoginApp } block type='primary'>Đăng nhập</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button block type='primary' onClick={ handleRegistration }>Đăng ký</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
