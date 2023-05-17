import styles from "./styles.module.css";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import GalleryImages from "../../../gallery/gallery";

export default function BtnSeeMore(props:any) {
    const [newShow, setNewShow] = useState(false);
    const btn_click = () => {
        props.gaEventTracker("Galeria "+props.code)
        setNewShow(true);
    }
    const btn_close = () => {
        setNewShow(false);
    }

    const handleCloseModal = () => {
        setNewShow(false);
    };
    return(
        <>
            <div className={styles.ver_mas}>
                <a onClick={btn_click}><span>{props.text} <i className='bx bxs-grid'></i></span></a>
            </div>

            <Modal size={"xl"} show={newShow} className={styles.bodyModal} onHide={handleCloseModal}>
                <Modal.Body>
                    <div className={styles.modal_body}>

                        <GalleryImages
                            imgBanner={props.imgBanner}
                            gallery={props.gallery}
                        />
                        <div className={styles.btn_close}>
                            <button onClick={btn_close}>Cerrar galería</button>
                        </div>

                    </div>

                </Modal.Body>
            </Modal>

        </>
    );
}
