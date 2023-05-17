import {getFactureBooked} from "../../../../../../../service/api/api";
import {useEffect, useState} from "react";
import styles from "./styles.module.css"

export default function DetailsFacture(props:any){
    const [dataFacture, setDataFacture] = useState<any>();

    const getFacture = () =>{
        getFactureBooked(props.booking_code).then((res)=>{
            // console.log("res facture => ", res.data);
            setDataFacture(res.data);
        }).catch((e)=>{
            console.log(e);
        })
    }

    const btn_close = () =>{
        props.setNewShow2(false);
    }

    useEffect(()=>{
        getFacture();
    }, [props.booking_code])

    return(
        <>
            <div className={styles.container}>
                <div>
                    <div className={styles.title}>
                        <h3>Detalles de la factura</h3>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.details}>

                            <div>
                                <p># Referencia</p>
                            </div>
                            <div>
                                <strong>{dataFacture?.facture?.reference}</strong>
                            </div>

                            <div>
                                <p>Id de factura</p>
                            </div>
                            <div>
                                <strong>{dataFacture?.facture?.details?.id_facture}</strong>
                            </div>

                            <div>
                                <p>Código de Apto</p>
                            </div>
                            <div>
                                <strong>{dataFacture?.resourceCode}</strong>
                            </div>

                            <div>
                                <p>Fecha y hora de transacción</p>
                            </div>
                            <div>
                                <strong>{dataFacture?.facture?.details?.dateTransaction}</strong>
                            </div>

                            <div>
                                <p>Total</p>
                            </div>
                            <div>
                                <strong>{dataFacture?.facture?.total}</strong>
                            </div>

                            <div>
                                <p>Respuesta Epayco</p>
                            </div>
                            <div>
                                <strong>{dataFacture?.facture?.details?.reason}</strong>
                            </div>

                            <div>
                                <p>Método de pago</p>
                            </div>
                            <div>
                                <strong>{dataFacture?.method}</strong>
                            </div>

                            <div>
                                <p>Estado de factura</p>
                            </div>
                            <div>
                                <strong>{dataFacture?.facture?.details?.epaycoResponse}</strong>
                            </div>

                        </div>
                    </div>
                    <div className={styles.btn_close}>
                        <button type="button" onClick={btn_close}>Cerrar</button>
                    </div>
                </div>
            </div>
        </>
    );
}
