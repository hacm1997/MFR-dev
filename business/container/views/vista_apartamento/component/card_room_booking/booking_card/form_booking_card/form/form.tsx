import styles from './styles.module.css';
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {DatePicker, ConfigProvider} from "antd";
import useMouseUp from "../../../../../../../../../hooks/useMouseUp";
import BtnBooking from "../btn_booking/btn_booking";
import {RangePickerProps} from "antd/es/date-picker";
import 'dayjs/locale/es';
import { CronJob } from 'cron'
import dayjs from "dayjs";
import {
    getAccessToken,
    getAllBooking,
    getBookingAvailable,
    getCalendarEvents, googleAuthConfig
} from "../../../../../../../../../service/api/api";
import esES from 'antd/lib/locale/es_ES';
import enEN from 'antd/lib/locale/en_US';
import Moment from "moment";
import {EventAuthContext} from "../../../../../../../../content/contexts/eventAuthContext";

const {RangePicker} = DatePicker;
Moment.locale("es");
export default function Form({date_block, chars, price, data, getNubmerDays, loc, idCalendar, translate, lang, gaEventTracker}:any) {
    const {currency, setCurrency} = useContext(EventAuthContext);
    const now = Moment.utc().local().add(-1, 'day');
    const [date, setDate] = React.useState([]);
    const [resource, setResource] = useState()
    const [viewButton, setViewButton] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const persona = () => {
        setSubMenuPersonas(!subMenuPersonas)
    }
    const refsubMenuPersonas = React.useRef<HTMLDivElement>(null);
    useMouseUp(refsubMenuPersonas, () => {
        setSubMenuPersonas(false)
    })
    const [subMenuPersonas, setSubMenuPersonas] = useState(false)
    const [adultos, setAdultos] = useState(1)
    const [ninos, setNinos] = useState(0)
    const [slotDate, setSlotDates] = useState<any>([])
    const [slotDateGoogle, setSlotDatesGoogle] = useState([])
    const [accessToken, setAccessToken] = useState('');
    const [countDateStatus, setCountDateStatus] = useState(true);
    const [refresh, setRefresh] = useState('')

    const getToken = () => {
        // getAccessToken().then((res)=>{
        //     // console.log(res)
        //     setAccessToken(res.data.accessToken);
        // }).catch((e: Error) => {
        //     console.log(e);
        // });
        let sum = 0;
        const job = new CronJob(
            '*/1 * * * * *',
            function () {
                sum += 1;
                googleAuthConfig().then((res)=>{
                    setAccessToken(res.data.accessToken);
                    job.stop()
                }).catch((e: Error) => {
                    console.log(e);
                });
                if (slotDateGoogle.length > 0) {
                    job.stop()
                }
                if(sum > 60){
                    job.stop()
                }
            },
            null,
            true,
            'America/Los_Angeles'
        );
        job.start();
    }

    function getSlotDates(){
        getCalendarEvents(accessToken, idCalendar).then((res)=>{
            setSlotDatesGoogle(res.data.items);
        }).catch((e: Error) => {
            setRefresh('refresh')
            console.log(e);
        });

        getAllBooking().then((response:any)=>{
            setSlotDates(response.data?.data.filter((item:any) => item._props.resource.code === data.resource_id as string && (item._props.state === 'paid' || item._props.state === 'pending')));
        }).catch((e: Error) => {
            console.log(e);
        });
    }
    const [statusButton, setStatusButton] = useState(false);
    console.log("status button => ", statusButton);
    console.log("slotDate => ",date_block ? date_block : "none");

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        const selectedStart = dayjs(date[0], 'DD/MM/YYYY');
        const selectedEnd = dayjs(date[1], 'DD/MM/YYYY');
        const isBlockedDate = date_block ? date_block?.some((date:any) => dayjs(date).isSame(dayjs(current), 'day')) : null;
        if (isBlockedDate) {
            setStatusButton(false);
            return true;
        }
        if(date_block){
            date_block?.some((date:any)=> {
                if(selectedStart && selectedEnd && dayjs(date) >= selectedStart && dayjs(date) <= selectedEnd){
                    setStatusButton(true)
                }
            })
        }


        if (slotDateGoogle.length > 0) {
            setEnableButton(false)
            return slotDateGoogle.some((item:any)=> {
                if(selectedStart && selectedEnd && dayjs(item.start.date) >= selectedStart && dayjs(item.end.date) <= selectedEnd){
                    setStatusButton(true)
                }
                return (current && current < dayjs().endOf('day')) || (current >= dayjs(item.start.date).endOf('day').add(-1, 'day') && current <= dayjs(item.end.date).endOf('day')) || slotDate.some((slotItem:any) => {
                    return (current && current < dayjs().endOf('day')) || (current >= dayjs(slotItem._props.date_from).endOf('day').add(-1, 'day') && current <= dayjs(slotItem._props.date_to).endOf('day')) || isBlockedDate;
                });
            });
        } else if (slotDate.length > 0) {
            return slotDate.some((item:any)=> {
                if(selectedStart && selectedEnd && dayjs(item._props.date_from) >= selectedStart && dayjs(item._props.date_to) <= selectedEnd){
                    setStatusButton(true)
                }
                return (current && current < dayjs().endOf('day')) || (current >= dayjs(item._props.date_from).endOf('day').add(-1, 'day') && current <= dayjs(item._props.date_to).endOf('day')) || isBlockedDate;
            });
        } else {
            return current && current < dayjs().endOf('day') || isBlockedDate;
        }

    };

    const getOnChange = (value:any, dateString:any) => {
        setDate(dateString);0
    }
    const enableBtn = () => {
        const fechaInicio = new Date(Moment(date[0],'DD/MM/YYYY').format('YYYY-MM-DD')).getTime();
        const fechaFin    = new Date(Moment(date[1],'DD/MM/YYYY').format('YYYY-MM-DD')).getTime();
        const diff = (fechaFin - fechaInicio) / (1000*60*60*24);
        if(!date[0] || !date[1] || diff >= Number(chars('durationAvailable').toString())){
            setViewButton(true)
            setCountDateStatus(true)
        }else{
            setViewButton(false)
            setCountDateStatus(false)
        }
    }

    useEffect(() => {
        enableBtn()
        getNubmerDays(date)
        setResource(data.resource_id)

    }, [date])

    useEffect(()=>{
        if(refresh === 'refresh'){
            window.location.href === window.location.href;
        }
    }, [refresh])

    useEffect(() => {
        getToken();
    }, [currency])

    useEffect(()=>{
        getSlotDates();
    }, [data.resource_id])

    const disableSpanAdults = {
        pointerEvents: adultos >= Number(chars('capacity_adults').toString())+Number(chars('capacity_kids').toString()) || adultos+ninos >= Number(chars('capacity_adults').toString())+Number(chars('capacity_kids').toString()) ? 'none' : 'auto'
    } as any
    const disableSpanKids = {
        pointerEvents: ninos >= Number(chars('capacity_kids').toString())+Number(chars('capacity_adults').toString()) || adultos+ninos >= Number(chars('capacity_adults').toString())+Number(chars('capacity_kids').toString()) ? 'none' : 'auto'
    } as any

    return(
        <>
            <ConfigProvider locale={lang === 'es' ? esES: enEN}>
                <RangePicker
                    className={styles.fecha}
                    format={'DD/MM/YYYY'}
                    placeholder={['Check-in', 'Check-out']}
                    disabledDate={disabledDate}
                    onChange={getOnChange}
                />
            </ConfigProvider>

            <div onClick={persona} className={styles.cantidad_personas}>
                <h2><strong>{translate('form.guests')}</strong></h2>
                <p> {adultos} {translate('form.adults')}
                    | {ninos} {translate('form.kids')}</p>
            </div>
            {subMenuPersonas ?
                <div ref={refsubMenuPersonas} className={styles.sub_menu_persona}>
                    <div className={styles.adulto}>
                        <p><strong>{translate('form.adults')} </strong>({translate('form.description_adults')})</p>
                        <div className={styles.calculo}>
                                        <span
                                            onClick={() => setAdultos(adultos > 0 ? adultos - 1 : adultos)}
                                            className={styles.neg}>-</span>
                            <span onClick={() => setAdultos(adultos + 1)}
                                  className={styles.mas} aria-disabled={true} style={disableSpanAdults}>+</span>
                        </div>
                    </div>
                    <div className={styles.ninos}>
                        <p><strong>{translate('form.kids')} </strong>({translate('form.description_kids')})</p>
                        <div className={styles.calculo}>
                                        <span onClick={() => setNinos(ninos > 0 ? ninos - 1 : ninos)}
                                              className={styles.neg}>-</span>
                            <span onClick={() => setNinos(ninos + 1)}
                                  className={styles.mas} style={disableSpanKids}>+</span>
                        </div>
                    </div>
                </div> : null}

            {statusButton ?
                <div className={styles.info_alert}>
                    <p style={{textAlign: 'center', fontSize: '14px', fontWeight: 'bold'}}>{translate('form.info_alert1')}<br/>
                        {translate('form.info_alert2')}</p>
                </div>
                :
                <BtnBooking
                    translate={translate}
                    code={data.resource_id}
                    adultos={adultos}
                    ninos={ninos}
                    title={data.name || "hola"}
                    price={price}
                    date={date}
                    viewButton={viewButton}
                    loc={loc}
                    currency={currency}
                    idCalendar={idCalendar}
                    enableButton={enableButton}
                    gaEventTracker={gaEventTracker}
                    accessToken={accessToken}
                />
            }
            {countDateStatus ?
                <p style={{textAlign:"center"}}>{`${translate('form.adverting')} (${chars('durationAvailable').toString()})`}</p>
            : null}


        </>
    );
}
