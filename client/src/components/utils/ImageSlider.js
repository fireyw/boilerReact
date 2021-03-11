import {Carousel} from 'antd';

import React from 'react';

function ImageSlider(props) {


    function onChange(a, b, c) {
        console.log(a, b, c);
    }

    const couselImage = props.images.map((image, index)=>{
        return <div key={index}>
            <img style={{width:'100%', maxHeight:'150px'}} src={`http://localhost:5000/${image}`}/>
        </div>
    })

    return (

        <Carousel autoplay afterChange={onChange}>
            {couselImage}
        </Carousel>
    );
}

export default ImageSlider;