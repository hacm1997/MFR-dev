import styles from './styles.module.css';
import * as React from "react";
import BtnSeeMore from "../btn_seemore/btn_seemore";
import Image from "next/image";
import {useEffect, useState} from "react";
import {prop} from "dom7";

export default function Images({data, info, translate, gaEventTracker, code}:any) {

    const [gallery, setGallery] = useState<any>([])

    const characteristics = (img:string) => {
        if(img === "imagePrincipal"){
            return data.filter(((char: any) => char.code === img)).map((obj: any) => obj.value)
        }
        if(img === "gallery"){
            data.filter(((char:any) => char.code === img)).map((obj:any, index:any) => {

                obj.value.map((item:any, i:number)=>{

                    return <img key={i} src={item.data} alt="Apartamento para reserva" title="vistas"/>
                })
            })
        }else{
            console.log("error")
        }
    }
    useEffect(()=>{
        data.filter(((char:any) => char.code === "gallery")).map((obj:any, index:any) => {
            setGallery(
                obj.value.data
            )
        })

    }, [data]);

    const content = (
        <div className={styles.card_general}>

            <div className={styles.container_portada}>
                <img src={characteristics("imagePrincipal")} alt={info.name} title={info.name}/>
            </div>
            <div className={styles.container_galeria}>

                {gallery ? gallery.slice(0,4).map((item:any, index:any)=>(
                    <img key={index} src={item.data} alt={info.name} title={info.name}/>
                )): null}

                <BtnSeeMore
                    imgBanner={characteristics("imagePrincipal")}
                    gallery={gallery}
                    text={translate('gallery.button')}
                    gaEventTracker={gaEventTracker}
                />
            </div>
        </div>
    )

    return(
        <>
            {content}
        </>
    );
}
