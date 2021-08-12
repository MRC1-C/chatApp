import React from 'react'
import { Avatar, Typography } from 'antd' 
import styled from 'styled-components'

const MessStyled = styled.div`
    padding: 10px 10px;
    display: flex;
    flex-direction: ${ props => props.you ? 'row-reverse' : 'row' };
    .message {
        margin: 0 10px;
        padding: 5px 10px;
        background-color: ${ props => props.you ? 'rgb(60,60,255)': 'lightgray'};
        color: ${ props => props.you ? 'white': 'black'};
        border-radius: 5px;
        max-width: 50%;
    }
`;


export default function Mess(props) {
    return (
        <MessStyled {...props}>
            <Avatar style={{ color: 'black', backgroundColor: 'lightblue' }}>{props.name.charAt(0)}</Avatar>
            <Typography className='message'>{props.text}</Typography>
        </MessStyled>
    )
}
