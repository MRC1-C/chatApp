import { Avatar, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { AppContext } from '../../Context/AppProvider';

const HeaderStyled = styled.div`
    border-bottom: 1px solid lightgray;
    padding: 20px;
    .nameFriend {
        margin-left: 10px;
        font-weight: bold;
        font-size: 20px;
    }
`;

export default function Header() {
    const { userNameFriend } = React.useContext(AppContext);
    return (
        <HeaderStyled>
              <Avatar style={{ color: 'black', backgroundColor: 'lightblue' }} size='large'>{userNameFriend?.charAt(0)}</Avatar>
              <Typography.Text className='nameFriend'>{userNameFriend}</Typography.Text>
        </HeaderStyled>
    )
}
