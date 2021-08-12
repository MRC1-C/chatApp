import React from 'react'
import { Avatar, Typography } from 'antd'
import styled from 'styled-components'
import { AppContext } from '../../../Context/AppProvider';
const FriendStyled = styled.div`
    width: 100%;
    margin-left: 5px;
    padding: 20px;
    border-radius: 10px;
    background-color: ${ props => props.set ? 'lightgray':'white'};
    .nameFriend {
        margin-left: 5px;
        font-size: 20px;
    }
    .avatarFriend {
        color: black;
        background-color: lightblue;
    }
    &:hover{
        background-color: lightgray;
    }
`;

export default function Friend(props) {
    const { setId, id } = React.useContext(AppContext);
    return (
        <FriendStyled onClick={()=> setId(props.id)} set={id===props.id}>
            <Avatar size='large' className='avatarFriend'>{props.friend.charAt(0)}</Avatar>
            <Typography.Text className='nameFriend'>{props.friend}</Typography.Text>
        </FriendStyled>
    )
}
