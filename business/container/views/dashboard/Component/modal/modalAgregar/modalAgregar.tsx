import styles from "./styles.module.css";
import Form from "../form/form";

export default function modalAgregar(props: any) {
    return (
        <>

            <div className="modal" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
