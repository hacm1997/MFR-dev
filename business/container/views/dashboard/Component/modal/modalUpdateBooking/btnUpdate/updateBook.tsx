import styles from "./styles.module.css";
import React from "react";
import config from "../../../../../../../../infrastructure/config";
import {putBooking} from "../../../../../../../../service/api/api";

export default function SaveUpdateBooking(props:any) {

    const initSave = {
        tenant: config.TENANT as string,
        user: props.user,
        booking: props.booking
    }

    //console.log("INIT SAVE => ", initSave);
    console.log("resource code => ", props.resource_code)
    const update = () => {
        putBooking(props.start_date, props.state === 'Pagado' ? 'canceled' : 'paid', props.resource_code)
            .then(res => {
                    if(res.status === 200){
                        console.log("¡Success Update! code status: "+res.status);
                        alert("Actualizado correctamente");
                        window.location.reload();
                    }
            }

            ).catch((error:any) => {
                console.log(error);
        })
    }

    return(
        <>
            <div>
                <button type="button" onClick={update} className="btn btn-sm btn-primary" >{props.state === 'Pagado' ? 'Cancelar reservación' : 'Cambiar a Pagado'}</button>
            </div>
        </>
    )
}
