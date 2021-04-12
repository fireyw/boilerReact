import React, {useEffect, useState} from 'react';
import {Typography, Row, Col, Button, Input, Form} from 'antd';
import Dropzone from 'react-dropzone'
import {updateProfile} from "../../../_actions/user_actions";
import {useDispatch} from "react-redux";
import Axios from "axios";


const {Title, Text} = Typography;

function Profile(props) {
    const [NickName, setNickName] = useState('');
    const [ActiveButton, setActiveButton] = useState('');
    const [ProfileImage, setProfileImage] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.user.userData && props.user.userData.nickName) {
            console.log('nickName: ', props.user.userData.nickName);
            setNickName(props.user.userData.nickName);
        }
    }, [props.user.userData]);

    useEffect(() => {
        if (props.user.userData && (props.user.userData.nickName != NickName)){
            setActiveButton('primary');
        }
    }, [NickName]);

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
        backgroundColor: "#9f9c9c",
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

    const changeNickName = (event) => {
        setNickName(event.currentTarget.value);
    }

    const reduxUpdateProfile = () => {
        let body = {
            id: props.user.userData._id,
            profileImage: ProfileImage,
            nickName: NickName
        }

        // formData.append('profileImage', ProfileImage);
        // if(ActiveButton==='primary'){
        //     formData.append('nickName', NickName);
        // }

        dispatch(updateProfile(body))
            .then(response => {
                if (response.payload.success) {

                }
            })
    }

    const submitHandler = (event)=>{
        console.log('submitHanlder call: ', ProfileImage);
        event.preventDefault();
        reduxUpdateProfile();
        if(ProfileImage!=''){
            // reduxUpdateProfile();
            // let formData = new FormData();
            //
            // const config = {
            //     header: {'content-type': 'multipart/form-data'}
            // }
            // formData.append('file', ProfileImage[0]);
            // console.log('profileImage api call');
            // axios.post('/api/users/profileImage', formData, config)
            //     .then(response=>{
            //         if(response.data.success){
            //             setProfileImage(response.data.filePath);
            //             console.log('프로필 사진 저장 성공');
            //         }else{
            //             alert('파일 저장 실패');
            //         }
            //     });
        }
        //
        // const body={
        //     //로그인된 사람의 ID 부모 auth.js 에서 가져옴
        //     _id: props.user.userData._id,
        //     nickName: NickName,
        //     profileImage: ProfileImage
        // }
        // Axios.post('/api/users/updateProfile', body)
        //     .then(response=>{
        //         console.log(response);
        //         if(response.data.success){
        //             alert('상품업로드 성공');
        //             props.history.push('/profile');
        //         }else{
        //             alert('상품업로드 실패');
        //         }
        //     });
    }

    const dropHandler = files => {
        //파일 업로드 후 경로 반환
        console.log('files:', files);
        setProfileImage(files);
        let formData = new FormData();

        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0]);
        console.log('profileImage api call');
        Axios.post('/api/users/profileImage', formData, config)
            .then(response=>{
                if(response.data.success){
                    setProfileImage(response.data.filePath);
                    console.log('프로필 사진 저장 성공');
                }else{
                    alert('파일 저장 실패');
                }
            });
        // reduxUpdateProfile();
    }

    return (
        <div>
            <Form onSubmit={submitHandler}>
                <div>
                    <div>
                        <Title level={4} style={{margin: '2rem'}}>
                            프로필 수정
                        </Title>
                    </div>
                    <div style={{marginLeft: '2rem'}}>프로필과 별명을 수정할 수 있습니다</div>
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
                            <Button style={buttonMargin}>
                                {/*<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>*/}
                                <Dropzone onDrop={dropHandler}>

                                {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />사진변경
                                        </div>
                                    )}
                                </Dropzone>
                            </Button>
                            <Button style={buttonMargin}>캐릭터 만들기</Button>
                            <Button style={buttonMargin}>삭제</Button>
                        </div>
                    </div>
                    <div style={itemCol1}>
                        별명
                    </div>
                    <div style={itemCol2}>
                        <Input onChange={changeNickName} value={NickName}/>
                    </div>
                    <div style={{gridColumn: '1/3', justifySelf: 'center'}}>
                        <Button htmlType="submit" type={ActiveButton} style={buttonMargin} >수정</Button>
                        <Button style={buttonMargin}>취소</Button>
                    </div>
                </div>
            </Form>

        </div>
    );
}

export default Profile;