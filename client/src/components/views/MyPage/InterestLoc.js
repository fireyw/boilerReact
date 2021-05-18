import React, {useEffect, useState} from 'react';
import {Typography, Row, Col, Button, Input, Form} from 'antd';
import {changeUserInfo} from "../../../_actions/user_actions";
import {useDispatch} from "react-redux";
import Axios from "axios";
import {Fragment} from "react";

const {Title, Text} = Typography;

function InterestLoc(props) {

    const [inputs, setInputs] = useState({
        userName: '',
        userPhone: '',
        userEmail: ''
    })

    const {userName, userPhone, userEmail} = inputs;

    const changeInput = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const [ActiveButton, setActiveButton] = useState('');

    //status: s->저장, a->추가
    const [existLoc, setExistLoc] = useState([
            {
                id: 1,
                title: "관심지1",
                locSi: "1",
                locGu: "1",
                locDong: "1",
                status: "s"
            },
            {
                id:2,
                title: "관심지2",
                locSi: "2",
                locGu: "2",
                locDong: "2",
                status: "s"
            },
        ]
    );
    const [displayForm, setDisplayForm] = useState(false);
    const [newLoc, setNewLoc] = useState({
        id:existLoc.length+1,
        title: "관심지"+(existLoc.length+1),
        locSi: "1",
        locGu: "2",
        locDong: "3",
    })

    const addLoc = ()=>{
        // setExistLoc([...existLoc, {id:existLoc.length+1, ...newLoc}])
        setNewLoc({...newLoc, status:"a"})
    }
    useEffect(()=>{
        console.log("newLoc:", newLoc);
    },[newLoc])
    // useEffect(()=>console.log(SearchTerm), [SearchTerm]);

    const saveLoc = (value)=>{
        //console.log('submitHanlder call');

        // if(!Title || !Description || !Price || !Continent || !Image){
        //     return alert('모든 값을 채워주세요');
        // }
        console.log("saveLoc: ", value);
        return;
        const body={
            //로그인된 사람의 ID 부모 auth.js 에서 가져옴
            id: props.user.userData._id,
            locSi: value.locSi,
            locGu: value.locGu,
            locDong: value.locDong,
        }
        console.log("body:", body);
        Axios.post('/api/loc/saveLoc', body)
            .then(response=>{
                console.log(response);
            });
    }

    const locSiChangeHandler = (event)=>{
        setNewLoc({...newLoc, locSi:event.currentTarget.value});
        console.log("newLoc:", newLoc);
    }

    const locGuChangeHandler = (event)=>{
        setNewLoc({...newLoc, locGu:event.currentTarget.value});
    }

    const locDongChangeHandler = (event)=>{
        setNewLoc({...newLoc, locDong:event.currentTarget.value});
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.user.userData) {
            setInputs({
                ...inputs,
                userName: props.user.userData.name,
                userPhone: props.user.userData.phone,
                userEmail: props.user.userData.email
            });
        }
    }, [props.user.userData]);

    const flexTitle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        marginLeft: '9rem',
        marginBottom: '1rem'
    }

    const flexTitle2 = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', //축방향으로 진행
        // marginRight: '9rem',
        marginBottom: '1rem'
    }
    const wrapperStyles = {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gridGap: '0rem',
        minHeight: '50px',
        maxWidth: '850px',
        backgroundColor: '#ffffffff',
        marginLeft: '10rem',

    }
    const itemCol1 = {
        backgroundColor: "#FFF5F5DC",
        // margin: '0rem 0rem 0rem 1rem',
        padding: '1rem',
        border: '1px solid',
        // maxHeight:'300px',
    }
    const itemCol2 = {
        backgroundColor: "#ffffffff",
        margin: '0rem 1rem 0rem 0rem',
        padding: '1rem 1rem 1rem 1rem',
        border: '1px solid',
    }
    const itemCol2Grid = {
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        gridGap: '1rem',
        backgroundColor: "#ffffffff",
        margin: '0rem 1rem 0rem 0rem',
        padding: '1rem 1rem 1rem 1rem',
        border: '1px solid',
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
                console.log('payload: ', response.payload);
                console.log('payload length: ', response.length);


                if (response.payload) {
                    props.history.push("/myPage");
                }
            })
    }

    const submitHandler = (value)=>{
    }

    const cancelProfile = () => {
        props.history.push("/myPage");
    }


    let getCodeSi= (value)=>{
        switch(value) {
            case "1":
                return "서울특별시";
            case "2":
                return "부산광역시";
            case "3":
                return "울산광역시";
            case "4":
                return "광주광역시"
        }
    }

    let getCodeGu= (value)=>{
        switch(value) {
            case "1":
                return "송파구";
            case "2":
                return "광진구";
            case "3":
                return "강남구";
            case "4":
                return "노원구"
        }
    }

    let getCodeDong= (value)=>{
        switch(value) {
            case "1":
                return "광장동";
            case "2":
                return "구의동";
            case "3":
                return "방배동";
        }
    }

    return (
        <div>
            <Form onSubmit={submitHandler}>
                <div style={flexTitle}>
                    <div>
                        <Title level={4} style={{margin: '2rem'}}>
                            지역설정
                        </Title>
                    </div>
                    <div style={{marginLeft: '2rem'}}>공통으로 사용하고 있는 지역 목록입니다.</div>
                </div>
                <div style={flexTitle2}>
                    <div>
                        <Button onClick={addLoc}>지역추가</Button>
                    </div>
                </div>

                <div style={wrapperStyles}>
                    {existLoc.map((row) => (
                        <Fragment key={row.id}>
                            <div style={itemCol1}>
                                {row.title}
                            </div>
                            <div style={itemCol2Grid}>
                                <div>
                                    {getCodeSi(row.locSi)} &nbsp; &nbsp;
                                    {getCodeGu(row.locGu)} &nbsp; &nbsp;
                                    {getCodeDong(row.locDong)} &nbsp; &nbsp;
                                </div>
                                <div>
                                    <Button onClick={() => setDisplayForm(!displayForm)}>변경</Button>
                                    <Button>삭제</Button>
                                </div>
                            </div>
                        </Fragment>
                    ))}

                    {newLoc.status=="a" ?
                        <Fragment key={newLoc.id}>
                            <div style={itemCol1}>
                                <Input name="userName" onChange={changeInput} value={newLoc.title}/>
                            </div>
                            <div style={itemCol2Grid}>
                                <div>
                                    <select onChange={locSiChangeHandler} value={newLoc.locSi}>
                                        <option value="1">서울특별시</option>
                                        <option value="2">부산광역시</option>
                                        <option value="3">울산광역시</option>
                                        <option value="4">광주광역시</option>
                                    </select> &nbsp;&nbsp;
                                    <select onChange={locGuChangeHandler} value={newLoc.locGu}>
                                        <option value="1">송파구</option>
                                        <option value="2">광진구</option>
                                        <option value="3">강남구</option>
                                        <option value="4">노원구</option>
                                    </select> &nbsp;&nbsp;
                                    <select onChange={locDongChangeHandler} value={newLoc.locDong}>
                                        <option value="1">광장동</option>
                                        <option value="2">구의동</option>
                                        <option value="3">방배동</option>
                                        <option value="4">서초동</option>
                                    </select> &nbsp;&nbsp;
                                </div>
                                <div>
                                    {/*<Button onClick={saveLoc(newLoc)}>저장</Button>*/}
                                    <Button>취소</Button>
                                </div>
                            </div>
                        </Fragment>
                        : ""
                    }
                </div>
            </Form>

        </div>
    );
}

export default InterestLoc;
