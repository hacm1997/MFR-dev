import styles from "./styles.module.css";
import {useEffect, useState} from "react";
import Moment from "moment";
import {formatNumber} from "../../../../../../../service/service";
import {getPayments} from "../../../../../../../service/api/api";
import Modal from "react-bootstrap/Modal";
import * as React from "react";
import UpdateBooking from "../../modal/modalUpdateBooking/bookingUpdate";
import DetailsFacture from "../detailFacture/facture";
import ModalFacture from "../detailFacture/modalFacture/modalFacture";

export default function ListBooking(props:any) {
    const [newShow, setNewShow] = useState(false);
    const [newShow2, setNewShow2] = useState(false);
    const openModal = () => {
        setNewShow(true);
    }
    const openModal2 = () => {
        setNewShow2(true);
    }
    // console.log("Datos de booking => ",props.data)

    const displayBookings = props.data.map((item:any, index:any)=>{
        //console.log("Booking details => ",item._props)
        const detailBooked = JSON.parse(item._props.bookingDetails);
        const date_from_format = Moment(item._props.date_from).format('ddd DD MMMM YYYY');
        const date_to_format = Moment(item._props.date_to).format('ddd DD MMMM YYYY');
        return(
            <div key={index} className={styles.list_booking}>
                <a className={styles.editBtn} onClick={openModal}>Ver detalles</a> | <ModalFacture openModal2={openModal2} code={item._props.code} setNewShow2={setNewShow2} newShow2={newShow2} />
                <h4>Apto: {item._props.resource.code}</h4>
                <hr/>

                <label><h5>Cliente:</h5></label>
                <p><strong>Nombre: </strong> {item._props.booker._name}<br/>
                <strong>Cédula: </strong> {detailBooked.dni}</p>

                <label><h5>Datos de reserva:</h5></label>
                <p><strong>Precio total: </strong>${formatNumber(detailBooked.price)}</p>
                <p><strong>Adultos: </strong>{detailBooked.adults}<strong> Niños: </strong>{detailBooked.kids}</p>
                <p><strong>Fechas: </strong>{date_from_format} /<br/> {date_to_format}</p>
                <p><strong>Estado: </strong> <a className={item._props.state === "paid" ? styles.success : styles.cancel}>{item._props.state === "paid" ? "Pagado" : "Cancelado"}</a></p>
                <Modal size={"lg"} show={newShow}>
                    <Modal.Body>
                        <div className={styles.modal_body}>
                            <UpdateBooking
                                state={item._props.state === "paid" ? "Pagado" : "Cancelado"}
                                booking_code={item._props.code}
                                data={item}
                                details={detailBooked}
                                setNewShow={setNewShow}
                            />
                        </div>
                    </Modal.Body>
                </Modal>


            </div>


        )
    })

    return (
        <>
            <div className={styles.grid_container}>
                <div>

                </div>
                <div className={styles.grid_item}>

                </div>
                <div className={styles.grid_container}>

                    {displayBookings}

                </div>
            </div>

        </>
    )
}
