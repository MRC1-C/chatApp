import React from 'react'
import styled from 'styled-components'
import Friend from './Friend'
import { AppContext } from '../../../Context/AppProvider'

const FriendListStyled = styled.div`
    height: calc(100vh - 133px);
    overflow-y: auto;
    overflow-x: hidden;
`;

export default function FriendList() {
    const { friend, userName } = React.useContext(AppContext); 
    return (
        <div>
            <FriendListStyled>
                {
                    friend?.map((dt) => {
                        return <Friend key={dt.id} friend={dt.member[0]===userName?dt.member[1]:dt.member[0]} id={dt.id}/>
                    })
                }
            </FriendListStyled>
        </div>
    )
}
