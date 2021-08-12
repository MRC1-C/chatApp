import React from 'react'
import { Form, Input, Button } from 'antd'
import Mess from './Mess'
import styled from 'styled-components'
import { AppContext } from '../../../Context/AppProvider'
import db from '../../../firebase/config'

const WrapperStyled = styled.div`
    height: calc(100vh - 82px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow-y: auto;
`;

const ContentStyled = styled.div`
    overflow-y: auto;
`;

const FormStyled = styled(Form)`
    display: flex;
    flex-direction: row;
    padding: 10px;

`;

export default function MessList() {
    const { id, friend, userName, setUserNameFriend} = React.useContext(AppContext);
    const [form] = Form.useForm();
    const messageListRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const data = friend.filter(dt=>{
        return dt.id ===id;
    });
    React.useEffect(()=>{
        if(data[0]?.member)
            setUserNameFriend(data[0].member[0]===userName?data[0].member[1]:data[0].member[0]);
    },[data])
    const handleSent = () => {
        if(data[0])
        {db.collection('friends').doc(id).set({
            member: data[0].member,
            mess: [...data[0].mess,{
                you: userName,
                text: form.getFieldValue().text,
            }]
        })
        form.resetFields();}
        if (inputRef?.current) {
            setTimeout(() => {
              inputRef.current.focus();
            });
        }
    };
    React.useEffect(() => {
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [data]);
    return (
        <WrapperStyled>
            <ContentStyled ref={messageListRef}>
                {
                    data[0]?data[0].mess.map(dt => {
                        return <Mess you={dt.you===userName} text={dt.text} name={dt.you}/>
                    }):null
                }
            </ContentStyled>
            <FormStyled form={form}>
                <Form.Item name='text' style={{ width: '100%' }}>
                    <Input ref={inputRef}/>
                </Form.Item>
                <Form.Item>
                    <Button onClick={ handleSent } type='primary' htmlType='submit'>Gửi</Button>
                </Form.Item>
            </FormStyled>
        </WrapperStyled>
    )
}
