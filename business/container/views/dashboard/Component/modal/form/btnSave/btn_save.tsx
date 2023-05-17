import styles from "./styles.module.css";
import {postResource, s3Service, s3ServiceMultiple} from "../../../../../../../../service/api/api";
import {useEffect, useState} from "react";
import SpinnerView from "../../../../../../../content/spinner/spinner";
import moment from "moment";
import Swal from "sweetalert2";

moment.locale("es");
export default function BtnSave(props:any) {

    const [chars, setChars] = useState<any>({});
    const [showSpinner, setShowSpinner] = useState(false);

    const saveFile = () => {
        const data = new FormData();
        props.gallery.forEach((file:any, i:number) => {

            data.append(`files`, file);
        });
        s3Service({'uploaded_file': props.imgPrincipal}).then(( res ) => {
            console.log(res);
            chars.imagePrincipal = (
                res.data.data
            )
        }).catch(( err ) => {
            console.log(err)
        })
        //console.log("data files => ", data)
        s3ServiceMultiple(data).then(( res ) => {
            console.log(res);
            chars.gallery = (
                res.data
            )
        }).catch(( err ) => {
            console.log(err)
        })

    }
    const savePlans = () =>{
        const data = new FormData();
        props.plans.forEach((file:any) => {
            //console.log("files => ",file)
            data.append(`files`, file);
        });
        s3ServiceMultiple(data).then(( res ) => {
            console.log(res);
            chars.plans = (
                res.data
            )
        }).catch(( err ) => {

            console.log(err)
        })
    }

    //console.log("Gallery => ", dataGallery)
    //console.log("values => ",chars)
    const initSavePostResource = {
        code: `MFR${props.p_values.name.trim().split(" ").join("")}`,
        name: props.p_values.name,
        description: props.p_values.description,
        characteristics: chars,
        owner: props.p_values.owner,
        durationAvailable: props.p_values.durationAvailable,
        rating: +props.p_values.rating,
        rating_count: 1,
        price: +props.values.price,
        currency: props.p_values.currency,
        state: props.p_values.status
    }
    console.log("Object => ", initSavePostResource);
    //console.log("count object => ",Object.entries(initSavePostResource.characteristics).length)
    const handleSubmit = (ev:any) => {
        ev.preventDefault();
        if(Object.entries(initSavePostResource.characteristics).length > 18){
            window.location.href = '#spinner';
            saveFile();
            if(props.plans.length > 1){
                savePlans();
            }
            setShowSpinner(true);

            window.setTimeout(function() {
                // console.log("INIT SAVE => ",initSavePostResource);
                const dt = initSavePostResource;
                //ServicesResource.createResource(dt)
                postResource(dt).then(res => {
                    if (res.status === 200) {
                        setShowSpinner(false);
                        console.log("¡Success! code status: " + res.status);
                        props.closeModal(false);
                        ev.preventDefault();
                        Swal.fire(
                            {
                                title: 'Recurso creado',
                                text: 'Se ha creado el recurso correctamente',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }
                        )

                    }
                }).catch(err => {
                    console.log(err);
                    setShowSpinner(false);
                    Swal.fire(
                        {
                            title: '!No se ha podido crear el recurso!',
                            text: 'Por favor intentelo nuevamente o más tarde',
                            icon: 'error'
                        }
                    )
                    //window.location.reload();

                })

                console.log(dt)
                ev.preventDefault();
            }, 7000);
        }else{
            Swal.fire(
                {
                    title: '!Datos incompletos!',
                    text: 'Por favor complete todos los campos',
                    icon: 'warning'
                }
            )
            ev.preventDefault();
        }

    };

    useEffect(()=>{
        setChars(
            props.values
        );
    },[props.values])

    return (
        <>
            {showSpinner ?
                <div id="spinner">
                    <SpinnerView/>
                </div>
            : <button onClick={handleSubmit} className={styles.btn}>Guardar</button>}
        </>
    )
}
