import React from 'react';
import { Typography, Row, Col } from 'antd';

const { Title } = Typography;

function MyPage(props) {
    const dStyle = { background: '#0092ff', paddingLeft: '8px' };
    const wrapperStyles = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '1rem',
        minHeight: '600px',
        backgroundColor: '#808080'
    }
    const item={
        backgroundColor:"#ffffffff",
        margin: '1rem'
    }
    return (
        <div style={wrapperStyles}>
            <div style={item}>
                <Title level={2} style={{margin:'2rem'}}>프로필
                </Title>
                <Row gutter={[16,16]}>
                    <Col lg={12} xs={24} >
                        <div style={dStyle}>col-6</div>
                    </Col>
                    <Col lg={12} xs={24} >
                        <div style={dStyle}>col-6</div>
                    </Col>
                </Row>
            </div>
            <div style={item}>연락처 및 알림</div>
            <div style={item}>지역설정</div>
        </div>

    );
}

export default MyPage;