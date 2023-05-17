import styles from "./styles.module.css";
import Modal from "react-bootstrap/Modal";
import ModalBooking from "../../../../../../content/modalBooking/modalBooking";
import * as React from "react";
import {useState} from "react";
import CreateApto from "../form/form";

export default function abrirModal(props:any){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [newShow, setNewShow] = useState(false);

    const btn_click = () => {
        setNewShow(true);
    }
    const closeModal = (dataChild:any) => {
        setNewShow(dataChild);
        props.setStatusModal(dataChild)
    }
    return(
        <>
            <button type="button" className={styles.btn_abrir} onClick={btn_click}>
                <i className='bx bx-plus'></i>
            </button>

            <Modal size={"xl"} show={newShow}>
                <Modal.Body>
                    <div className={styles.modal_body}>
                        <CreateApto closeModal={closeModal} />
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )
}
