import Modal from "react-bootstrap/Modal";
import styles from "../../listBooking/styles.module.css";
import DetailsFacture from "../facture";
import * as React from "react";
import {useState} from "react";


export default function ModalFacture(props:any){

    const [newShow2, setNewShow2] = useState(false);


    return(
        <>
            <a className={styles.editBtn} onClick={() => setNewShow2(true)}>Ver factura</a>
            <Modal size={"lg"} show={newShow2}>
                <Modal.Body>
                    <div className={styles.modal_body2}>
                        <DetailsFacture
                            booking_code={props.code}
                            setNewShow2={setNewShow2}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
