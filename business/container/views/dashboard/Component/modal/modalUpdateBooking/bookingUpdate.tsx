import styles from "./styles.module.css";
import React, {useEffect, useState, useRef} from "react";
import {getBookingAvailable, putBooking} from "../../../../../../../service/api/api";
import Moment from "moment/moment";
import {updateBooking} from "../../../../../../../service/api/types";
import SaveUpdateBooking from "./btnUpdate/updateBook";

Moment.locale("es");
export default function UpdateBooking(props:any) {
    //const now = Moment.utc().local().add(1, 'day');
    //const currentDate = now.toJSON();
    const [details, setDetails] = useState({code: "comment", value: "comentario",
        description: props.data._props.booker._details.description})
    const [user, setUser] = useState({
        name: props.data._props.booker._cellphone, dni: props.data._props.booker._id,
        email: props.data._props.booker._name, cellphone: props.data._props.booker._email,
        details: {}
    });
    const date_from_format = Moment(props.data._props.date_from).format('YYYY-MM-DD');
    const date_to_format = Moment(props.data._props.date_to).format('YYYY-MM-DD');

    const [booking, setBooking] = useState({
        status:'paid', code:props.data._props.code, details: {}, resource_code: props.data._props.resource.code,
        start_date: date_from_format, end_date: date_to_format
    });
    const [detailsBooking, setDetailsBooking] = useState({
        adults:props.details.adults, kids:props.details.kids, description:'', price:props.details.price
    })

    const handleUserUpdate = (evt:any) =>{
        const value = evt.target.value;
        setUser({
            ...user,
            [evt.target.name]: value
        });
    }
    const handleComment = (evt:any) =>{
        const value = evt.target.value;
        setDetails({
            ...details,
            [evt.target.name]: value
        })
        user.details = ({
            ...details,
            [evt.target.name]: value
        })
    }
    const handleBookingUpdate = (evt:any) =>{
        const value = evt.target.value;
        setBooking({
            ...booking,
            [evt.target.name]: value
        });
    }
    const handleDetailsBookingUpdate = (evt:any) =>{
        const value = evt.target.value;
        setDetailsBooking({
            ...detailsBooking,
            [evt.target.name]: value
        });
        booking.details = ({
            ...detailsBooking,
            [evt.target.name]: value
        });
    }
    /*console.log("values => ", user);
    console.log("details user => ", details);
    console.log("Booking => ", booking);*/
    const btn_close = () =>{
        props.setNewShow(false);
    }

    return(
        <>
            <div className={"row "+ styles.header_body}>
                <div className={"col"}>
                    <h4>Editar reserva</h4>
                </div>
                <div className={"col " +styles.close}>
                    <a title="Salir" onClick={btn_close}>
                        <i className='bx bx-x'></i>
                    </a>
                </div>
            </div>

            <div>
                <div className="form-group">
                    <label>Código de Apto:</label>
                    <p><strong>{props.data._props.resource.code}</strong></p>
                </div>
                <hr/>
                <h5>Datos del Cliente</h5>
                <div className="form-group">
                    <label>Nombre: </label>
                    <label><strong>{user.email ? user.email : null}</strong></label>
                </div>
                <div className="form-group">
                    <label>Cédula o id:</label>
                    <label><strong>{user.dni ? user.dni : null}</strong></label>
                </div>
                <div className="form-group">
                    <label>E-mail:</label>
                    <label><strong>{user.cellphone ? user.cellphone : null} </strong> </label>
                </div>
                <div className="form-group">
                    <label>Teléfono: </label>
                    <label><strong>{user.name ? user.name : null}</strong></label>
                </div>
                {/*<div className="form-group">*/}
                {/*    <label>Comentario:</label>*/}
                {/*    <textarea className="form-control" name='description' onChange={handleComment} value={details.description} />*/}
                {/*</div>*/}
                <hr/>
                <h5>Datos de la reserva</h5>
                <div className="form-group">
                    <label>Fecha de llegada:</label>
                    <p><strong>{booking.start_date}</strong></p>
                </div>
                <div className="form-group">
                    <label>Fecha de salida:</label>
                    <p><strong>{booking.end_date}</strong></p>
                </div>
                <div className="form-group">
                    <label>Adultos:</label>
                    <label><strong>{detailsBooking.adults}</strong></label>
                </div>
                <div className="form-group">
                    <label>Niños:</label>
                    <label><strong>{detailsBooking.kids}</strong></label>
                    {/*<input type="number" className="form-control" name="kids" onChange={handleDetailsBookingUpdate} value={detailsBooking.kids} />*/}
                </div><br/>


                <div className="form-group">
                    <label>Estado de reserva: {props.state}</label>
                </div>


                <SaveUpdateBooking
                    user={user} booking={booking}
                    state={props.state}
                    code={props.data._props.code} resource_code={props.data._props.resource.code}
                    start_date={props.data._props.date_from}
                />

            </div>
        </>
    )
}
