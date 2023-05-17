import styles from "../styles.module.css";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";


export default function GalleryUpdate(props:any) {
    const [newData, setNewData] = useState<any>()

    const confirmation = (index:number) => {
        Swal.fire({
            icon: "warning",
            title: "¿Seguro quiere eliminar esta imagen?",
            text: `Si la elimina no podrá restaurarla`,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                props.deleteImageGallery(index);
            }
        });
    }

    useEffect(()=>{
        if(props.newGalleryDev.length < 1){
            // console.log("hola xd")
            setNewData(props.newGallery)
        }else{
            setNewData(props.newGalleryDev)
        }
    }, [props.newGallery])

    // console.log("new array List => ",newData)

    const listView = newData ? Array.isArray(newData.data) ? newData.data.map((item:any, index:number) => {
        return(
            <div key={index} className="col-4">
                <div className={styles.gallery}>
                    <i className='bx bx-x-circle' title={"Quitar imagen"} onClick={() => confirmation(index)}></i>
                    <img src={item.data ? item.data.toString(): ''} width={270} height={170} alt="apartamentos"/>
                </div><br/>
            </div>
        )
    }): console.log("not found images") : console.log("not found images");


    return(
        <>
            {listView}
        </>
    )
}
