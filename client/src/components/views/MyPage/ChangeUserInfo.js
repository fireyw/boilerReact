import React, {useEffect, useState} from 'react';
import {Typography, Row, Col, Button, Input, Form} from 'antd';
import Dropzone from 'react-dropzone'
import {changeUserInfo} from "../../../_actions/user_actions";
import {useDispatch} from "react-redux";
import Axios from "axios";


const {Title, Text} = Typography;

function ChangeUserInfo(props) {

    const [inputs, setInputs] = useState({
        userName:'',
        userPhone:'',
        userEmail:''
    })

    const {userName, userPhone, userEmail} = inputs;

    const changeInput = (e)=>{
        const {name ,value}= e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const [ActiveButton, setActiveButton] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.user.userData) {
            setInputs({
                ...inputs,
                userName:props.user.userData.name,
                userPhone:props.user.userData.phone,
                userEmail:props.user.userData.email
            });
        }
    }, [props.user.userData]);

    const flexTitle = {
        display:'flex',
        flexDirection:'column',
        alignItems: 'start',
        marginLeft: '9rem',
        marginBottom: '1rem'
    }
    const wrapperStyles = {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gridGap: '0rem',
        minHeight: '400px',
        maxWidth: '800px',
        backgroundColor: '#ffffffff',
        marginLeft: '10rem',

    }
    const itemCol1 = {
        backgroundColor: "#dcdcdc",
        margin: '0rem 0rem 0rem 1rem',
        padding: '2rem 1rem 1rem 2rem',
        border: '1px solid',
        // maxHeight:'300px',
    }
    const itemCol2 = {
        backgroundColor: "#ffffffff",
        margin: '0rem 1rem 0rem 0rem',
        padding: '2rem 1rem 1rem 2rem',
        border: '1px solid',
    }
    const itemCol2Grid = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '1rem',
        backgroundColor: "#ffffffff",
        margin: '0rem 1rem 0rem 0rem',
        padding: '2rem 1rem 1rem 2rem',
        border: '1px solid',
    }

    const buttonMargin = {
        margin: '0.5rem',
    }

    const reduxChangeUserInfo = () => {
        let body = {
            id: props.user.userData._id,
            name: userName,
            phone: userPhone,
            email: userEmail,
        }

        dispatch(changeUserInfo(body))
            .then(response => {
                console.log('payload: ',response.payload);
                console.log('payload length: ',response.length);


                if (response.payload) {
                    props.history.push("/myPage");
                }
            })
    }

    const submitHandler = (event)=>{
        event.preventDefault();
        reduxChangeUserInfo();
    }

    const cancelProfile = ()=>{
        props.history.push("/myPage");
    }

    return (
        <div>
            <Form onSubmit={submitHandler}>
                <div style={flexTitle}>
                    <div>
                        <Title level={4} style={{margin: '2rem'}}>
                            연락처 및 알림 설정
                        </Title>
                    </div>
                    <div style={{marginLeft: '2rem'}}>{props.user.userData && props.user.userData.nickName}님의 연락처 정보입니다.</div>
                </div>

                <div style={wrapperStyles}>
                    <div style={itemCol1}>
                        사용자이름
                    </div>
                    <div style={itemCol2Grid}>
                        <Input name="userName" onChange={changeInput} value={userName}/>
                    </div>

                    <div style={itemCol1}>
                        휴대전화
                    </div>
                    <div style={itemCol2}>
                        <Input name="userPhone" onChange={changeInput} value={userPhone}/>
                    </div>

                    <div style={itemCol1}>
                        이메일
                    </div>
                    <div style={itemCol2}>
                        <Input name="userEmail" onChange={changeInput} value={userEmail}/>
                    </div>

                    <div style={{gridColumn: '1/3', justifySelf: 'center'}}>
                        <Button htmlType="submit" type={ActiveButton} style={buttonMargin} >수정</Button>
                        <Button onClick={cancelProfile} style={buttonMargin}>취소</Button>
                    </div>
                </div>
            </Form>

        </div>
    );
}

export default ChangeUserInfo;