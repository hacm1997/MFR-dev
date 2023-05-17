import styles from "./styles.module.css";
import {deleteImage, s3Service, s3ServiceMultiple, updateResource} from "../../../../../../../../../service/api/api";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import SpinnerView from "../../../../../../../../content/spinner/spinner";

export default function BtnUpdate(props:any) {

    const [chars, setChars] = useState<any>({});
    const [showSpinner, setShowSpinner] = useState(false);

    // console.log("data img principal => ",props.values.imagePrincipal)
    // console.log("data img principal => ",props.values.imgPrincipal)
    // console.log("data plansDelete => ", props.plansDelete)
    const saveFile = () => {
        console.log("data update => ", props.addGallery)
        const data = new FormData();
        props.addGallery.forEach((file:any, i:number) => {
            //console.log("files => ",file)
            data.append(`files`, file);
        });
        if(props.imgPrincipal){
            s3Service(data).then(( res ) => {
                console.log("res img => ", res);
                chars.imagePrincipal = (
                    res.data.data
                )
                if(res.status === 200){
                    deleteImage(props.values.imagePrincipal ? props.values.imagePrincipal.split(/(\\|\/)/g).pop() : null).then((r)=>{
                        console.log(r)
                    }).catch((e)=>console.log(e));
                }
            }).catch(( err ) => {
                console.log(err)

            })
        }

        s3ServiceMultiple(data).then(( res ) => {
            console.log("res multiple => ", res);
            if(res.data){
                console.log("res multiple entré aquí => ", res);
                res.data.data.map((item:any)=>{
                    chars.gallery.data.push(item)
                })
            }
            if(res.status === 200){
                if(props.galleryDelete.length > 1){
                    props.galleryDelete.map((item:any)=>{
                        deleteImage(item.data.split(/(\\|\/)/g).pop()).then((r)=>{
                            console.log(r)
                        }).catch((e)=>console.log(e));
                    })
                }
            }
        }).catch(( err ) => {
           /* responseSimulated.data.map((item)=>{
                chars.gallery.data.push(item)
            }) */
            // console.log(`Cantidad de archivos en FormData: ${data.getAll('files')}`);
            console.log(err)
        })
    }
    console.log('chars => ', chars);
    const savePlans = () =>{
        const data = new FormData();
        props.addPlans.forEach((file:any) => {
            //console.log("files => ",file)
            data.append(`files`, file);
        });
        s3ServiceMultiple(data).then(( res ) => {
            console.log(res);
            if(res.data){
                res.data.data.map((item:any)=>{
                    chars.plans.data.push(item)
                })
            }
            if(res.status === 200){
                if(props.plansDelete.length > 1){
                    props.plansDelete.map((item:any)=>{
                        deleteImage(item.data.split(/(\\|\/)/g).pop()).then((r)=>{
                            console.log(r)
                        }).catch((e)=>console.log(e));
                    })
                }
            }
        }).catch(( err ) => {
            /* responseSimulated2.data.map((item)=>{
                chars.plans.data.push(item)
            }) */
            console.log(err)
        })
    }

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
    //console.log(props.imgPrincipalIn)
    console.log("update data => ",initUpdateData);
    const handleSubmit = (ev:any) => {

        window.location.href = '#spinner';
        saveFile();

        if(props.addPlans.length > 1){
            savePlans();
        }

        setShowSpinner(true);
        ev.preventDefault();
        window.setTimeout(function() {
            console.log("INIT SAVE => ",initUpdateData);
            const data = initUpdateData
            updateResource(props.data.resource_id, data).then(res => {
                if(res.status === 200){
                    setShowSpinner(false);
                    console.log("¡Success Update! code status: "+res.status);
                    Swal.fire(
                        {
                            title: 'Recurso Actualizado',
                            text: 'Se ha actualizado el recurso correctamente',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                    // ).then((result) => {
                    //     if (result.isConfirmed) {
                    //         window.location.href = '/dashboard';
                    //     }
                    // })
                }
            }).catch(err => {
                console.log(err);
                setShowSpinner(false);
                Swal.fire(
                    {
                        title: '!No se ha podido actualizar el recurso!',
                        text: 'Por favor intentelo nuevamente o más tarde',
                        icon: 'error'
                    }
                )
                //window.location.reload();
            })

            console.log(data)
            ev.preventDefault();
        },8000)

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
                : <button onClick={handleSubmit} className={styles.btn}>Actualizar</button>}
        </>
    )
}
