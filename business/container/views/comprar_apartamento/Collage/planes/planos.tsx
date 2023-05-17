import styles from "./styles.module.css";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper";
import Image from "next/image";
import * as React from "react";

export default function Planos(props:any){

    const dataPlans = props.plans ? props.plans.map((item:any, index:any)=>(
        <SwiperSlide key={index}>
            <img width={640} height={500} style={{objectFit:"cover"}}  sizes={"100%"} src={item.data} alt="apartamento-para-compra"/>
        </SwiperSlide>
    )): null
    return(
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                breakpoints={
                    {
                        320: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1001: {
                            slidesPerView: 3,
                        }
                    }
                }
                modules={[Navigation]}
                className="mySwiper"
            >
                {dataPlans}
            </Swiper>
        </>
    )
}
