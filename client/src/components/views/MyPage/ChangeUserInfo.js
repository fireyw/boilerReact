import React, {useEffect, useState} from 'react';
import {Typography, Row, Col, Button, Input, Form} from 'antd';
import Dropzone from 'react-dropzone'
import {updateProfile} from "../../../_actions/user_actions";
import {useDispatch} from "react-redux";
import Axios from "axios";


const {Title, Text} = Typography;

function ChangeUserInfo(props) {

    const [inputs, setInputs] = useState({
        Name:'',
        Phone:'',
        Email:''
    })

    const {Name, Phone, Email} = inputs;

    const changeInput = (e)=>{
        console.log('타켓:', e.target);
        const {value, name}= e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    // const [Name, setName] = useState('');
    // const [Phone, setPhone] = useState('');
    // const [Email, setEmail] = useState('');

    const [ActiveButton, setActiveButton] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.user.userData && props.user.userData.name) {
            console.log('name call:',props.user.userData.name);
            setInputs({
                ...inputs,
                Name:props.user.userData.name
            });
        }
        if (props.user.userData && props.user.userData.phone) {
            console.log('name phone:',props.user.userData.phone);

            setInputs({
                ...inputs,
                Phone:props.user.userData.phone
            });
        }
        if (props.user.userData && props.user.userData.email) {
            setInputs({
                ...inputs,
                Email:props.user.userData.email
            });
        }
        console.log('input:', inputs);
    }, [props.user.userData]);

    // useEffect(() => {
    //     if (props.user.userData && (props.user.userData.name != Name)){
    //         setActiveButton('primary');
    //     }
    //     else if (props.user.userData && (props.user.userData.phone != Phone)){
    //         setActiveButton('primary');
    //     }
    //     else if (props.user.userData && (props.user.userData.email != Email)){
    //         setActiveButton('primary');
    //     }
    // }, [Name,Phone,Email]);

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

    const reduxUpdateProfile = () => {
        let body = {
            id: props.user.userData._id,
            name: Name,
            phone: Phone,
            email: Email,
        }

        dispatch(updateProfile(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push("/myPage");
                }
            })
    }

    const submitHandler = (event)=>{
        event.preventDefault();
        reduxUpdateProfile();
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
                        <Input name="Name" onChange={changeInput} value={Name}/>
                    </div>

                    <div style={itemCol1}>
                        휴대전화
                    </div>
                    <div style={itemCol2}>
                        <Input name="Phone" onChange={changeInput} value={Phone}/>
                    </div>

                    <div style={itemCol1}>
                        이메
                    </div>
                    <div style={itemCol2}>
                        <Input name="Email" onChange={changeInput} value={Email}/>
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