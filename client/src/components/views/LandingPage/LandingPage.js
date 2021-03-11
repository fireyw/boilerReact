import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios'
import {Icon, Col, Card, Row, Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider'

function LandingPage() {
    const [Products, setProducts] = useState([]);

    useEffect(()=>{
        axios.post('/api/product/products')
            .then(response =>{
                if(response.data.success){
                    // console.log(response.data);
                    setProducts(response.data.productInfo);
                }else{
                    alert("상품들을 가져오는데 실패");
                }
            })
    },[])


    const renderCards = Products.map((product, index)=>{
        // console.log(product);
        // {<img style={{width:'100%', maxHeight:'150px'}} src={`http://localhost:5000/${product.image[0]}`}/>}
        // 전체 24로 가정 최대4개 최소3개 가장작아질경우 1개
        return <Col lg={6} sm={8} xs={24} key={index}>
            <Card
                  cover={<ImageSlider images={product.image}/>}
            >
                <Meta
                    title={product.title}
                    description={product.price}
                />
            </Card>
        </Col>
    })

    return (
      <div style={{width:'75%', margin:'3rem auto'}}>
          <div style={{textAlign:'center'}}>
              <h2>Let's travel anywhere<Icon type="rocket"></Icon></h2>
          </div>
        {/*filter*/}

        {/*search*/}

        {/*cards*/}
        <Row gutter={[16,15]}>
          {renderCards}
        </Row>
      </div>
    )
}

export default LandingPage
