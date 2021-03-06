import React, {useState} from 'react';
import Dropzone from 'react-dropzone'
import {Icon} from 'antd';
import axios from 'axios';


function FileUpload(props) {

    const [Images, setImages] = useState([]);

    const dropHandler = (files)=>{
        let formData = new FormData();

        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0]);

        axios.post('/api/product/image', formData, config)
            .then(response=>{
                if(response.data.success){
                    // console.log(response.data)
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath]); //상위 컴포넌트에서 전송 시 Images 값 필요
                }else{
                    alert('파일 저장 실패');
                }
            })
        ;
    }

    const deleteHandler = (image)=>{
        const currentIndex = Images.indexOf(image);
        console.log(currentIndex);
        let newImages = [...Images];
        newImages.splice(currentIndex, 1); //current번째부터 1개 삭제
        setImages(newImages);
        props.refreshFunction(newImages); //상위 컴포넌트에서 전송 시 Images 값 필요
        // console.log(Images);
    }

    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <div style={{width:300, height:240, border:'1px solid lightgray', display:'flex',
                    alignItems:'center', justifyContent:'center'}}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type='plus' style={{fontSize:'3rem'}}/>
                        </div>
                    </div>
                )}
            </Dropzone>
            <div style={{display:'flex', width:'350px', height:'240px', overflowX:'scroll'}}>
                {Images.map((image,index)=>(
                    <div onClick={()=>deleteHandler(image)} key={index}>
                        <img style={{minWidth:'300px', width:'300px',height:'240px'}}
                        src={`http://localhost:5000/${image}`}/>

                    </div>
                ))}
            </div>

        </div>
    );
}

export default FileUpload;