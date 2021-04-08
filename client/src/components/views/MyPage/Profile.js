import React, {useEffect, useState} from 'react';
import {Typography,Row, Col, Button, Input} from 'antd';

const {Title, Text} = Typography;

function Profile(props) {
    const [NickName, setNickName] = useState('');

    useEffect(() => {
        if (props.user.userData && props.user.userData.nickName) {
            console.log('nickName: ', props.user.userData.nickName);
            setNickName(props.user.userData.nickName);
        }
    }, [props.user.userData]);


    const wrapperStyles={
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gridGap: '0rem',
        minHeight: '400px',
        maxWidth: '800px',
        backgroundColor: '#ffffffff',
        marginLeft:'10rem',

    }
    const itemCol1 = {
        backgroundColor: "#9f9c9c",
        margin: '0rem 0rem 0rem 1rem',
        padding: '2rem 1rem 1rem 2rem',
        border:'1px solid',
        // maxHeight:'300px',
    }
    const itemCol2 = {
        backgroundColor: "#ffffffff",
        margin: '0rem 1rem 0rem 0rem',
        padding: '2rem 1rem 1rem 2rem',
        border:'1px solid',
    }
    const itemCol2Grid = {
        display:'grid',
        gridTemplateColumns: '1fr',
        gridGap: '1rem',
        backgroundColor: "#ffffffff",
        margin: '0rem 1rem 0rem 0rem',
        padding: '2rem 1rem 1rem 2rem',
        border:'1px solid',
    }

    const buttonMargin = {
        margin : '0.5rem',
    }


    return (

        <div>
            <div>
                <div>
                    <Title level={4} style={{margin: '2rem'}}>
                        프로필 수정
                    </Title>
                </div>
                <div style={{marginLeft:'2rem'}}>프로필과 별명을 수정할 수 있습니다</div>
            </div>

            <div style={wrapperStyles}>
                <div style={itemCol1}>
                    프로필사진
                </div>
                <div style={itemCol2Grid}>
                    <div>
                        {props.user.userData &&
                        <img style={{maxWidth: '80px', width: '80px', height: '80px'}}
                             src={`http://localhost:5000/${props.user.userData.profileImage}`}/>
                        }
                    </div>
                    <div>
                        <Button style={buttonMargin}>사진 변경</Button>
                        <Button style={buttonMargin}>캐릭터 만들기</Button>
                        <Button style={buttonMargin}>삭제</Button>
                    </div>
                </div>
                <div style={itemCol1}>
                    별명
                </div>
                <div style={itemCol2}>
                    <Input value={NickName}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;