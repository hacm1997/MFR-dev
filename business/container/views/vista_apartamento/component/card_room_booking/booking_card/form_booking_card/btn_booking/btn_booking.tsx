import styles from './styles.module.css';
import * as React from "react";
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";
import ModalBooking from "../../../../../../../../content/modalBooking/modalBooking";

export default function BtnBooking(props:any) {
    const [newShow, setNewShow] = useState(false);
    const btn_click = () => {
        props.gaEventTracker('Abrió form. reservación '+props.code)
        setNewShow(true);
    }
    const btn_close = () => {
        props.gaEventTracker('Canceló form. reservación '+props.code)
        setNewShow(false);
    }
    return(
        <>
            <button disabled={props.viewButton || props.enableButton} onClick={btn_click} className={"btn " + styles.btn_reservar_2}>{props.translate('section1.button')}</button>

            {newShow ?
                <Modal size={"lg"} show={true}>
                    <Modal.Body>
                        <div className={styles.modal_body}>

                            <ModalBooking
                                gaEventTracker={props.gaEventTracker}
                                translate={props.translate}
                                code={props.code}
                                adultos={props.adultos}
                                ninos={props.ninos}
                                title={props.title}
                                price={props.price}
                                date={props.date}
                                loc={props.loc}
                                currency={props.currency}
                                idCalendar={props.idCalendar}
                                accessToken={props.accessToken}
                            />
                            <div className={styles.btn_close}>
                                <button onClick={btn_close}>Cancelar</button>
                            </div>

                        </div>

                    </Modal.Body>
                </Modal>
            :null}

        </>
    );
}
