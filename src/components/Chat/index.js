import React from 'react'
import { Row, Col } from 'antd'
import Sibar from './Sibar'
import ChatMess from './ChatMess'
export default function Chat() {
    return (
        <Row>
            <Col span={6}><Sibar/></Col>
            <Col span={18}><ChatMess/></Col>
        </Row>
    )
}
