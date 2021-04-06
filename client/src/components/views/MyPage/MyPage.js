import React from 'react';
import { Typography, Row, Col, Button } from 'antd';

const { Title } = Typography;

function MyPage(props) {
    console.log('mypage : ', props.user.userData);
    const wrapperStyles = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '1rem',
        minHeight: '600px',
        backgroundColor: '#808080'
    }
    const innerDivGrid = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        backgroundColor:"#ffffffff",
        margin: '1rem'
    }

    const item={
        backgroundColor:"#ffffffff",
        margin: '1rem'
    }
    const bottom = {
        verticalAlign:'bottom'
    }
    return (
        <div style={wrapperStyles}>
            <div style={innerDivGrid}>
                <div style={{gridColumn:'1/3', maxHeight:'1em', alignSelf:'start'}}>
                    <Title level={4} style={{margin:'2rem'}}>프로필
                    </Title>
                </div>
                <div>
                    <Button>이미지업로드</Button>
                </div>
                <div>
                    별명:
                </div>
                <div style={{alignSelf:'end', padding:'1em'}}>
                    <Button>수정</Button>
                </div>
                {/*<div>*/}
                {/*    <Title level={2} style={{margin:'2rem'}}>프로필*/}
                {/*    </Title>*/}
                {/*    <Row gutter={[16,16]}>*/}
                {/*        <Col lg={12} xs={24} >*/}
                {/*            <div style={dStyle}>col-6</div>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</div>*/}
                {/*<div style={bottom}>*/}
                {/*    <Button>Default Button</Button>*/}
                {/*</div>*/}
            </div>

            <div style={item}>연락처 및 알림</div>
            <div style={item}>지역설정</div>
        </div>

    );
}

export default MyPage;