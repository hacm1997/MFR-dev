import styles from "./styles.module.css";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewCard from "./reviewCard/reviewCard";

export default function ReviewsContainer(props: any) {
    console.log(props.items)
    const list_card = props.items?.map((item:any, index:number) => (
        <SwiperSlide key={index}>
            <ReviewCard title={item.name} coment={item.comment}/>
        </SwiperSlide>
    ))
    return (
        <>
            <div className={styles.testimonio_general}>
                <Swiper
                    spaceBetween={50}
                    breakpoints={
                        {
                            500: {
                                slidesPerView: 1,
                            },
                            1301: {
                                slidesPerView: 2,
                            },

                        }
                    } modules={[Navigation]} className="mySwiper" autoplay={{delay: 3000, disableOnInteraction: false}}>
                    {list_card}
                </Swiper>
            </div>
        </>
    )
}
