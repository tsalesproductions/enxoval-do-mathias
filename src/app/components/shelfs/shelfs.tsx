"use client";


// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import {shelfs} from '../../database.json';
import ProductCard from './productCard';
import { useWidthSize } from '../hooks/useWidthSize';


export default function Shelfs(){
    const { isMobile } = useWidthSize();

    console.log(isMobile)

    return (
        <div className={`shelfs mt-10`}>
            {shelfs.map((shelf, index) => {
                return (
                    <div key={index} data-title={shelf.title} className={`shelf mb-20`}>
                        <h4 className={`text-2xl font-semibold text-center after-border`}>{shelf.title} <small className={`text-sx font-light`}>{shelf.description}</small></h4>
                        <div className={`products mt-5`}>
                        <Swiper
                            modules={[Navigation, A11y]}
                            spaceBetween={10}
                            slidesPerView={isMobile ? 2: 5}
                            navigation
                        >
                            
                            {shelf.products.map((product, indexProduct) => {
                                return <SwiperSlide><ProductCard product={product}  key={indexProduct} /></SwiperSlide>
                            })}
                            
                        </Swiper>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}