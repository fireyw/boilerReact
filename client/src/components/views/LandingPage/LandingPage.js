import React, {useEffect, useState} from 'react'
import {FaCode} from "react-icons/fa";
import axios from 'axios'
import {Icon, Col, Card, Row, Carousel, Collapse} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from "./Section/CheckBox";
import RadioBox from "./Section/RadioBox";
import {continents, price} from "./Section/Datas";

function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] =useState(0);
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    });

    useEffect(() => {

        let body={
            skip: Skip,
            limit: Limit
        }

        getProducts(body);
    }, [])

    const getProducts = (body)=>{
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data);
                    if(body.loadMore) {
                        //배열추가
                        //setProducts(Products.concat(response.data.productInfo));
                        setProducts([...Products, ...response.data.productInfo]);
                    }
                    else {
                        setProducts(response.data.productInfo);
                    }
                    setPostSize(response.data.postSize);

                } else {
                    alert("상품들을 가져오는데 실패");
                }
            })
    }

    const loadMoreHandler = ()=>{
        let skip= Skip+Limit;
        let body={
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body);
        setSkip(skip);
    }

    const renderCards = Products.map((product, index) => {
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

    const showFilteredResults = (filters) => {
        //console.log("showFilteredResults :", filters);
        let body={
            skip:0,
            limit:Limit,
            filters: filters
        }
        getProducts(body);
        setSkip(0);
    }

    const handleFilters = (filters, category)=>{

        const newFilters= {...Filters};
        newFilters[category]= filters;
        showFilteredResults(newFilters);
    }

    return (
        <div style={{width: '75%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2>Let's travel anywhere<Icon type="rocket"></Icon></h2>
            </div>
            {/*filter*/}
            <Row gutter={[16,16]}>
                {/*반응형이 되도록 창이 클땐 2개 작을땐 1개씩 나오도록 설정 (창 24가 맥스)*/}
                <Col lg={12} xs={24}>
                    {/*checkbox*/}
                    <CheckBox list={continents} handleFilters={(filters)=>handleFilters(filters, "continents")}/>
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={price} handleFilters={(filters)=>handleFilters(filters, "price")}/>
                </Col>
            </Row>
            {/*search*/}

            {/*cards*/}
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
            <br/>

            {PostSize >= Limit && <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>
            }


        </div>
    )
}

export default LandingPage
