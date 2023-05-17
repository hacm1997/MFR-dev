import styles from "./styles.module.css"
import {Calendar, momentLocalizer, DayPropGetter} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from "react-bootstrap/Modal";
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import {getAllBooking} from "../../../../../../service/api/api";
import Moment from "moment";
import Resources from "./resources/resources";
import BlockDate from "./modal/blockDate";
require('moment/locale/es.js')
const localizer = momentLocalizer(moment)

interface MyEvent {
    id: '';
    title: '';
    start: Date;
    end: Date;
    user: '';
    dni: '';
    email: '';
}

export default function MyCalendar() {
    const [showModal, setShowModal] = useState(false);
    const [statusModal, setStatusModal] = useState<any>();
    const [resourceCode, setResourceCode] = useState('');
    const [fechaSeleccionada, setFechaSeleccionada] = useState('');
    const [dataDpto, setDataDpto] = useState<any>()
    const [events, setEvents] = useState([{
        id: 0,
        title: '',
        start: new Date(),
        end: new Date(),
        user: '',
        dni: '',
        email:''
    }])

    const characteristics = (code: string) => {
        return dataDpto?.characteristics.filter(((char: any) => char.code === code)).map((obj: any) => obj.value)
    }

    const getBookingForCalendar = (resourceCode:string) => {
        setEvents([{id: 0, title: '', start: new Date(), end: new Date(), user: '', dni: '', email:''}])
        if(resourceCode !== ''){
            getAllBooking()
                .then((response: any) => {

                    response.data.data.filter((item:any) => item._props.resource.code === resourceCode && item._props.state === 'paid').map((it:any, index:number) => {
                        setEvents([{
                            id : index+1,
                            title: it._props.resource.code,
                            start: new Date(it._props.date_from),
                            end: new Date(it._props.date_to),
                            user: it._props.booker._cellphone,
                            dni: it._props.booker._id,
                            email: it._props.booker._name
                        }])
                    })

                })

                .catch((e: Error) => {
                    console.log(e);
                });
        }else{
            getAllBooking()
                .then((response: any) => {

                    const details = JSON.parse(response.data.data[0]._props.bookingDetails)

                    response.data.data.filter((item:any) => item._props.state === 'paid').map((it:any, index:number) => {

                        setEvents([{
                            id : index+1,
                            title: it._props.resource.code,
                            start: new Date(it._props.date_from),
                            end: new Date(it._props.date_to),
                            user: it._props.booker._name,
                            dni: details.dni,
                            email: it._props.booker._email
                        }])
                    })
                })

                .catch((e: Error) => {
                    console.log(e);
                });
        }
    };

    useEffect(()=>{
        getBookingForCalendar(resourceCode);
    }, [resourceCode]);
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const onSelectSlot = (slotInfo: { start: Date, slots: Date[], action: 'select' | 'click' | 'doubleClick' }) => {
        const fechaInicio = slotInfo.start;
        const fechaInicioFormateada = formatDate(fechaInicio);
        setFechaSeleccionada(fechaInicioFormateada);
        if(resourceCode !== ''){
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const eventStyleGetter = (event: any) => {
        const style = {
            backgroundColor: "#8C15E4",
            display: 'block'
        };
        return {
            style: style
        };
    };

    const dayPropGetter: DayPropGetter = (date: Date) => {
        const dateStr = moment(date).format('YYYY-MM-DD');
        if(dataDpto){
            if(characteristics('date_block')[0] !== undefined){
                if (characteristics('date_block')[0].includes(dateStr)) {
                    return {
                        className: styles.block_date,
                        style: {
                            pointerEvents: 'none',
                            color: '#ccc'
                        }
                    };
                } else {
                    return {};
                }
            }else{
                return {};
            }
        }else {
            return {};
        }

    };

    return (
        <>
            <div className={styles.content}>
                <Resources setResourceCode={setResourceCode} setDataDpto={setDataDpto} statusModal={statusModal}/>
                <div>
                    <Calendar
                        dayPropGetter={dayPropGetter}
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={events}
                        style={{height: "100vh", paddingLeft: "20px"}}
                        selectable={true}
                        onSelectSlot={onSelectSlot}
                        messages={{
                            next: "Siguiente",
                            previous: "Anterior",
                            today: "Hoy",
                            month: "Mes",
                            week: "Semana",
                            day: "Día",
                            showMore: total => `+ Ver más (${total})`,
                        }}

                        onSelectEvent={event => {
                            Swal.fire({
                                title: event.title,
                                html: `<p><strong>Usuario:</strong> ${event.user}</p>
                                <p><strong># Id:</strong> ${event.dni}</p>
                                <p><strong>E-mail:</strong> ${event.email}</p>
                                <p><strong>Fecha inicio:</strong> ${Moment(event.start).format('ddd DD MMMM YYYY')}</p>
                                <p><strong>Fecha fin:</strong> ${Moment(event.end).format('ddd DD MMMM YYYY')}</p>`,

                            } as any)
                        }}

                        eventPropGetter={eventStyleGetter}

                    />
                </div>
                <Modal size={"sm"} show={showModal} onHide={handleCloseModal}>
                    <Modal.Body>
                        <BlockDate resource_code={resourceCode} date={fechaSeleccionada} setShow={setShowModal} setStatusModal={setStatusModal}/>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
