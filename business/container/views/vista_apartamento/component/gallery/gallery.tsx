import styles from "./styles.module.css";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, {Swiper as SwiperType, Pagination, Navigation } from "swiper";

SwiperCore.use([Navigation]);
export default function GalleryImages(props:any) {
    const swiperRef = React.useRef<SwiperType>();

    const list_images = props.gallery ? props.gallery.map((item:any, index:any)=>(
            <SwiperSlide key={index} className={styles.images}>
                <img width={'100%'} height={'550px'} src={item.data} alt="vista-detalles" title="Galeria"/>
            </SwiperSlide>
    )): null

    return(
        <>
            <div className={styles.galleryCenter}>
                <div className={styles.prev_btn}>
                    <a type="button" onClick={() => swiperRef.current?.slidePrev()}><i className='bx bx-chevron-left'></i></a>
                </div>
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={20}
                    modules={[Pagination]}
                    className="mySwiper"
                    >

                    <SwiperSlide><img width={'100%'} height={'550px'} src={props.imgBanner} title="Galeria"/></SwiperSlide>
                    {list_images}

                </Swiper>
                <div className={styles.next_btn}>
                    <a type="button" onClick={() => swiperRef.current?.slideNext()}><i className='bx bx-chevron-right'></i></a>
                </div>
            </div>
        </>
    )
}
