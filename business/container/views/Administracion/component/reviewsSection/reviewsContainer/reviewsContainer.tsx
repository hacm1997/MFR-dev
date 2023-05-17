import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ReviewCard from "./reviewCard/reviewCard";
import styles from "./styles.module.css";


export default function ReviewsContainer() {
    return (
        <>
            <div className={styles.card_general}>
                <Swiper
                    spaceBetween={30}
                    breakpoints={
                        {
                            320: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1200: {
                                slidesPerView: 3,
                            }
                        }
                    }
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <ReviewCard content="“Lorem ipsum dolor sit amet, consectetuer adipiscing
                             elit, sed diam nonummy nibh euismodtincidunt”."/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ReviewCard content="“Lorem ipsum dolor sit amet, consectetuer adipiscing
                             elit, sed diam nonummy nibh euismodtincidunt”."/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ReviewCard
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}