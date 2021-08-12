import React from 'react'
import { Avatar, Button, Typography } from 'antd'
import {  LogoutOutlined, UserAddOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../Context/AppProvider'
const UserNameStyled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
`;

const TextNameStyled = styled(Typography.Text)`
    font-weight: bold;
    margin-left: 5px;
    font-size: 20px;
`;

export default function UserName() {
    const history = useHistory();
    const { userName, setVisibleAddFriend} = React.useContext(AppContext);
    const handleLogout = () => {
        history.push('./login');
    }
    const handleAdd = () => {
        setVisibleAddFriend(true);
    }
    return (
        <UserNameStyled>
            <div>
                <Avatar style={{ color: 'black', backgroundColor: 'lightblue' }} size='large'>{userName?.charAt(0)}</Avatar>
                <TextNameStyled>{userName}</TextNameStyled>
            </div>
            <div>
                <Button size='large' onClick={handleAdd} shape='circle' style={{marginRight: '10px'}}><UserAddOutlined/></Button>
                <Button size='large' onClick={handleLogout} shape='circle'><LogoutOutlined/></Button>
            </div>
        </UserNameStyled>
    )
}
