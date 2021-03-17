import React, {useEffect, useState} from 'react';
import ImageGallery from "react-image-gallery";

function ProductImage(props) {

    const [Images, setImages] = useState([]);

    useEffect(()=>{
        if(props.detail.image && props.detail.image.length){
            let images=[]
            props.detail.image.map((item)=>{
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setImages(images);
        }
    }, [props.detail])
    //props.detail이 변경될때마다 life cycle을 다시 돌린다

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    );
}

export default ProductImage;