import React from 'react';
import {Typography,Row, Col, Button} from 'antd';

const {Title, Text} = Typography;

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
        backgroundColor: "#ffffffff",
        margin: '1rem'
    }

    const item = {
        backgroundColor: "#ffffffff",
        margin: '1rem'
    }

    return (
        <div style={wrapperStyles}>
            <div style={innerDivGrid}>
                <div style={{gridColumn: '1/3', maxHeight: '1em', alignSelf: 'start'}}>
                    <Title level={4} style={{margin: '2rem'}}>프로필
                    </Title>
                </div>
                <div style={{alignSelf: 'center', justifySelf: 'center'}}>
                    {props.user.userData &&
                    <img style={{maxWidth: '80px', width: '80px', height: '80px'}}
                         src={`http://localhost:5000/${props.user.userData.profileImage}`}/>
                    }
                </div>
                <div style={{alignSelf: 'center', justifySelf: 'start'}}>
                    별명: {props.user.userData && props.user.userData.nickName}

                </div>
                <div style={{alignSelf: 'end', padding: '1em'}}>
                    <Button>수정</Button>
                </div>
            </div>
            <div style={item}>
                <div>
                    <Title level={4} style={{margin: '2rem'}}>
                        연락처 및 알림
                    </Title>
                </div>
                <div>
                    <Text level={4} style={{margin: '2rem'}}>
                        전화번호 : {props.user.userData && props.user.userData.phone}
                    </Text>
                </div>
            </div>
            <div style={item}>지역설정</div>
        </div>

    );
}

export default MyPage;