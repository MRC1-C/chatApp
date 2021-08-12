import React from 'react'
import FriendList from './FriendList'
import UserName from './UserName'

export default function Sibar() {
    return (
        <div style={{ borderRight: '1px solid lightgray' }}>
            <UserName/>
            <FriendList/>
        </div>
    )
}
