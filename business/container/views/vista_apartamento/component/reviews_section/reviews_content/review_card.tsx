import styles from './styles.module.css';
import * as React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import Testimonio_Habitacion from "../../../../../../content/testimonio/testimonio_habitacion/testimonio_habitacion";
import {useRouter} from "next/router";

export default function ReviewsCard(props:any) {
    const router = useRouter();
    const code_apto = router.asPath.split('/')[2];

    const slider_content = props.comments
        .filter((i:any) => i.codeApto === code_apto)
        .flatMap((item:any) =>
            item.items.map((comment:any, id:number) => {
                console.log(comment.name)
                return (
                    <SwiperSlide key={id}>
                        <Testimonio_Habitacion item={comment}/>
                    </SwiperSlide>
                )
            })
        )

    return(
        <>

            <div className={styles.testimonio}>
                <div className={styles.card_testimonio}>
                    <Swiper
                        spaceBetween={15}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,

                            },
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            }
                        }}
                    >
                        {slider_content}
                    </Swiper>
                </div>
            </div>

        </>
    );
}
