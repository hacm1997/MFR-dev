import { useEffect, useState } from "react";
import { updateResource } from "../../../../../../../../service/api/api";
import Swal from "sweetalert2";
import SpinnerView from "../../../../../../../content/spinner/spinner";

export default function UnlockDate(props: any) {
    const [chars, setChars] = useState<any>({});
    const [showSpinner, setShowSpinner] = useState(false);
    const [initSave, setInitSave] = useState<any>();
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

    // console.log("date to unlock => ", props.date);
    // console.log("chars => ", chars);
    // console.log("dates array => ", chars?.date_block)
    const handleUnlock = () => {
        const filteredDates = chars?.date_block?.filter((date: any) => date !== props.date);
        console.log('data filtered => ', filteredDates)

        if (filteredDates) {
            // setChars((prevChars: any) => ({ ...prevChars, date_block: filteredDates }));
            chars.date_block = filteredDates;
            handleSubmit();
        }

    };

    // console.log("finish save delete CHANGE => ", initUpdateData)

    const handleSubmit = async() => {
        const data = initUpdateData
        setShowSpinner(true);
        // console.log("initSave =>", initSave)
        await updateResource(props.data.resource_id, data).then(res => {
            if (res.status === 200) {
                setShowSpinner(false);
                console.log('res => ', res)
                console.log("¡Success! code status: " + res.status);
                Swal.fire(
                  {
                      title: `Se ha desbloqueada la fecha ${props.date}`,
                      icon: 'success',
                      confirmButtonText: 'Aceptar'
                  }
                ).then((result) => {
                    if (result.isConfirmed) {
                        props.closeModal(false);
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

    useEffect(() => {
        setChars(
            props.values
        );
    }, [props.values])

    return (
        <>
            {showSpinner ?
                <div id="spinner">
                    <SpinnerView/>
                </div>
                :
                <button onClick={handleUnlock}>Desbloquear</button>
            }
        </>
    )
}
