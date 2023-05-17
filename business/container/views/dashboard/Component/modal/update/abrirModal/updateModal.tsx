import styles from "./styles.module.css";
import Modal from "react-bootstrap/Modal";
import * as React from "react";
import {useState} from "react";
import UpdateApto from "../form/formUpdate";
import {deleteResource, useAllResources} from "../../../../../../../../service/api/api";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function ModalUpdate(props:any, setStatusModal:any){
    const [newShow, setNewShow] = useState(false);
    const [dataJson, getAll] = useAllResources();

    const btn_click = () => {
        setNewShow(true);
        props.setStatusModal(true);
    }
    const closeModal = (dataChild:any) => {
        setNewShow(dataChild);
        props.setStatusModal(dataChild)
    }
    const confirmationPopUp = () => {
        confirmAlert({
            title: 'Eliminar Apartamento',
            message: `¿Desea eliminar el recurso: ${props.name}?`,
            buttons: [
                {
                    label: 'Sí',
                    onClick: deleteApto
                },
                {
                    label: 'No',
                }
            ]
        });
    }
    function deleteApto() {
        deleteResource(props.code).then((response: any) => {
            if(response.status === 200){
                //getAll();
                window.location.reload();
                //props.setDataReload={dataJson}
            }
            console.log(response);
        })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    return(
        <>
            <div className={styles.botones}>
                <button className={styles.btn_editar} onClick={btn_click} >
                    <i className='bx bx-edit-alt'></i>
                </button>
                <button onClick={confirmationPopUp} className={styles.btn_eliminar}>
                    <i className='bx bx-x'></i>
                </button>
            </div>

            <Modal size={"xl"} show={newShow}>
                <Modal.Body>
                    <div className={styles.modal_body}>
                        <UpdateApto data={[props.data]} code_apto={props.code} closeModal={closeModal} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
