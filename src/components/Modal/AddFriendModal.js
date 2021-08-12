import React, { useState } from 'react'
import { Modal, Form, Input, Typography,Button } from 'antd'
import { AppContext } from '../Context/AppProvider'
import useFirestore from '../firebase/useFirestore';
import db from '../firebase/config';
export default function AddFriendModal() {
    const { visibleAddFriend, setVisibleAddFriend, friend, userName} = React.useContext(AppContext);
    const [namefriend, setnameFriend] = React.useState('');
    const [ form ] = Form.useForm();
    const [text, setText] = useState('');
    
    const addFriendCondition = React.useMemo(() => {
        return {
            fieldName: 'userName',
            operator: '==',
            compareValue: namefriend,
        }
    },[namefriend])
    const data = useFirestore('users', addFriendCondition);
    const member = friend.filter(mb => {
        return mb.member[0] === namefriend || mb.member[1] === namefriend;
    });
    React.useEffect(()=>{
        if(data.length){
            if(member.length){
                setText('Đã làm bạn bè');
            }
            else{
                db.collection('friends').add({
                    member: [userName,namefriend],
                    mess: [{text: 'Chào bạn',you:'A'}]
                });
                form.resetFields();
                setText('');
                setnameFriend('');
                setVisibleAddFriend(false);
            }
            }
        else{
            if(namefriend==='') setText('');
            else setText('Bạn không tồn tại');
        }
    },[data]); 
    const handleOK = () => {
        setnameFriend(form.getFieldValue().addFriend);
    }
    const handleCancel = () => {
        setnameFriend('');
        form.resetFields();
        setVisibleAddFriend(false);
    }
    return (
        <Modal 
            title='AddFriend' 
            visible={visibleAddFriend} 
            onOk={handleOK} 
            onCancel={handleCancel}
            footer={null}
        >
            <Typography.Text>{text}</Typography.Text>
            <Form form={form}>
                <Form.Item name='addFriend'>
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button block type='primary' onClick={handleOK} htmlType='submit'>Gửi</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
