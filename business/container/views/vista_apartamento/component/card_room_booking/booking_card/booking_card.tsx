import styles from './styles.module.css';
import * as React from "react";
import Price from "./price/price";
import Stars from "./stars/stars";
import Form from "./form_booking_card/form/form";
import {DevHospedaje, formatNumber} from "../../../../../../../service/service";
import {useContext, useEffect, useState} from "react";
import Moment from "moment";
import {EventAuthContext} from "../../../../../../content/contexts/eventAuthContext";

export default function BookingCard({data, chars, dataApto, translate, lang, gaEventTracker}:any) {
    const {currency, setCurrency} = useContext(EventAuthContext);

    const handlerCurrency = (event:any) => {
        const value = event.target.value
        setCurrency(value)
    }
    const characteristics = (code: string) => {

        return chars.filter(((char: any) => char.code === code)).map((obj: any) => obj.value)

    }
    const [dates, setDates] = useState([])
    const dateStart = Moment(dates[0],'DD-MM-YYYY')
    const dateEnd = Moment(dates[1],'DD-MM-YYYY')
    const [price, setPrice] = useState('')
    const [days, setDays] = useState(1)
    const getNubmerDays = (dataChild:any) => {
        setDates(dataChild);
    }

    useEffect(()=>{

        const duration = dateStart.diff(dateEnd, 'days');
        setDays(duration*-1)

        const totalPrice = parseInt(characteristics("price"))*(days+1)
        setPrice(totalPrice.toString())

    }, )
    const [realPrice, setRealPrice] = useState(price);

    const content = (

        <div className={styles.formulario}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <Price translate={translate} setRealPrice={setRealPrice}
                           price={days ? formatNumber(parseInt(price)) : formatNumber(characteristics("price"))}
                           defaultPrice={price} noBlanckPrice={characteristics("price")}
                           lang={lang}
                    />
                    {lang === 'es' ?
                        <select className={styles.currency} onChange={handlerCurrency}>
                            <option value="COP" selected={currency === 'COP' || lang === 'es'}>COP</option>
                            <option value="USD" selected={currency === 'USD' || lang === 'en'}>USD</option>
                        </select>
                    :null}
                    {/*<Stars ratio={data.rating}/>*/}
                </div>
                <Form
                    date_block={characteristics("date_block")[0]}
                    lang={lang}
                    translate={translate}
                    price={currency === "USD" || lang === "en" ? realPrice : parseInt(price)}
                    ratio={"4.5"}
                    chars={characteristics}
                    data={data}
                    loc={characteristics("location")}
                    idCalendar={characteristics("id_calendar")}
                    getNubmerDays={getNubmerDays}
                    dataApto={dataApto}
                    gaEventTracker={gaEventTracker}
                />
            </div>
        </div>

    )

    return(
        <>
            {content}
        </>
    );
}
