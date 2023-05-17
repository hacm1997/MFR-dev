import {useEffect, useState} from "react";
import {updateResource} from "../../../../../../../../service/api/api";
import Swal from "sweetalert2";
import SpinnerView from "../../../../../../../content/spinner/spinner";
import styles from "../../../modal/update/form/btnSave/styles.module.css";

export default function SaveBlock(props:any){
    const [chars, setChars] = useState<any>({});
    const [showSpinner, setShowSpinner] = useState(false);
    const initUpdateData = {
        code: props.data.resource_id,
        name: props.data.name,
        description: props.values.description,
        characteristics: chars,
        owner: props.data.owner,
        rating: props.data.rating,
        rating_count: 1,
        price: props.values.price,
        currency: props.data.currency,
        state: props.data.status
    }

    // console.log("initUpdateData for block => ", initUpdateData);
    // console.log("chars => ", props.date);
    // console.log("chars date_block => ", chars.date_block);
    useEffect(()=>{
        setChars(
            props.values
        );
    }, [props.values])

    // console.log("per blocks => ", props.dataPerBlock)
    useEffect(()=>{
        if(props.dataPerBlock === ''){
            if (chars.date_block && props.dataPerBlock === ''){
                chars.date_block.push(props.date)
                console.log("hago push")
            }else{
                console.log("hago push")
            }
        }        
    }, [chars.date_block]);
    // console.log("per blocks => ", props.dataPerBlock)

    const handleSubmit = (ev:any) => {
        const data = initUpdateData
        setShowSpinner(true);
        updateResource(props.data.resource_id, data).then(res => {
            if(res.status === 200) {
                setShowSpinner(false);
                console.log('res => ', res)
                console.log("¡Success! code status: " + res.status);
                Swal.fire(
                    {
                        title: 'Fecha bloqueada!',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            props.closeModal(false)
                            props.setStatusModal(false);
                            window.location.reload();
                        }
                    });
            }
        }).catch(err => {
            console.log(err);
            setShowSpinner(false);
            Swal.fire(
                {
                    title: '!No se ha realizar la acción!',
                    text: 'Por favor intentelo nuevamente o más tarde',
                    icon: 'error'
                }
            )
            //window.location.reload();
        })
    }

    return(
        <>
            {showSpinner ?
                <div id="spinner">
                    <SpinnerView/>
                </div>
                :
                <button onClick={handleSubmit} className={styles.btn}>Bloquear</button>
            }
        </>
    )
}
