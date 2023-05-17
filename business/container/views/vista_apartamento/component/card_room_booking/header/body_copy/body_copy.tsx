import styles from "./styles.module.css";
import * as React from "react";
import Title from "../title/title";
import Location from "./location/location";
import Share from "./share/share";
import BtnBooking from "../btn_booking/btn_booking";
import Stars from "./stars/stars";
import {useEffect, useState} from "react";

export default function BodyCopy({chars, data, translate}:any) {

    //console.log(data)
    const characteristics = (code: string) => {

        return chars.filter(((char: any) => char.code === code)).map((obj: any) => obj.value)

    }
    const content = (

        <div className={styles.descripcion}>
            <div>
                <Title title={data.name} />
                {/*<p>{data.owner}</p>*/}
            </div>
            <div className={styles.content}>
                <Stars ratio={`${data.rating} (${data.rating_count})`} />
                <Location loc={characteristics("location")} />
                {/*char*/}
                <Share text={translate('section1.share')}/>
            </div>
        </div>

    )

    return(
        <>
            <div className={styles.content_1}>

                {content}
                <div >
                    <BtnBooking
                        btn_text={translate('section1.button')}
                    />
                </div>

            </div>

        </>
    );
}
