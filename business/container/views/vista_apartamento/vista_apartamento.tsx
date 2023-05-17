import styles from './styles.module.css';
import * as React from "react";
import 'antd/dist/reset.css';
import {useEffect, useState} from "react";
import 'swiper/css';
import BodyCopy from "./component/card_room_booking/header/body_copy/body_copy";
import Images from "./component/card_room_booking/collage/images/images";
import FeaturesRoom from "./component/card_room_booking/body_card/features_room/features_room";
import BookingCard from "./component/card_room_booking/booking_card/booking_card";
import ReviewsSection from "./component/reviews_section/reviews";
import LocationSection from "./component/location_section/location_section";
import {Cookies} from "react-cookie";
import {getResource} from "../../../../service/api/api";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import useAnalyticsEventTracker from "../../../../service/analytics/useAnalyticsEventTracker";

export default function VistaApartamento() {

    const gaEventTracker = useAnalyticsEventTracker('Hospedaje');
    const [dataApto, setDataApto] = useState([]);
    const {t, lang} = useTranslation("details");
    const cookies = new Cookies();
    const [chars, setChars] = useState([]);
    const router = useRouter();
    const {
        query: { code },
    } = router

    function getResoruceCode(code: string) {
        getResource(code)
            .then((response: any) => {
                setDataApto(
                    response.data.data[0],
                );
                setChars(response.data.data[0].characteristics)

            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    useEffect(() => {

        // @ts-ignore
        getResoruceCode(code.toString())

    }, []);

    return (
        <>
            <section className={styles.section}>
                <div className={styles.general}>
                    <BodyCopy data={dataApto} chars={chars} translate={t}/>
                    <Images
                        translate={t}
                        data={chars}
                        info={dataApto}
                        gaEventTracker={gaEventTracker}
                        code={code}
                    />
                    <div className={styles.info_general} id="booking">
                        <FeaturesRoom data={dataApto} chars={chars} translate={t} lang={lang}/>
                        <BookingCard data={dataApto} chars={chars} translate={t} lang={lang} gaEventTracker={gaEventTracker}/>
                    </div>
                    <ReviewsSection />
                    <LocationSection data={chars} nameApto={dataApto} translate={t}/>
                </div>
            </section>
        </>
    )
}
