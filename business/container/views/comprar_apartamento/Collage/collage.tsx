import styles from "./styles.module.css";
import Galery from "./galery/galery";
import Planos from "./planes/planos";
import * as React from "react";
import {useEffect, useState} from "react";

import SwitchCollage from "./switchCollage/switchCollage";

export default function Collage(props:any) {
    const [apartamento, setApartamento] = useState('block');
    const [plano, setPlano] = useState('none');
    const [activeBoton, setActiveBoton] = useState('#8C15E4');
    const [noActiveBoton, setNoActiveBoton] = useState('#fff');

    const handleApartamento = () => {
        setApartamento('block');
        setPlano('none');
        setActiveBoton('#8C15E4');
        setNoActiveBoton('#fff');

    }
    const handlePlano = () => {
        setApartamento('none');
        setPlano('block');
        setActiveBoton('#F2F2F2');
        setNoActiveBoton('#8C15E4');
    }
    const displayNone = {
        display: `${plano}`
    }
    const displayBlock = {
        display: `${apartamento}`
    }
    const active = {
        background: `${activeBoton}`,
        color: `${noActiveBoton}`,
    }
    const noActive = {
        background: `${noActiveBoton}`,
        color: `${activeBoton}`,
    }

    const [gallery, setGallery] = useState<any>([]);
    const [plans, setPlans] = useState<any>([]);

    const characteristics = (img:string) => {
        if(img === "imagePrincipal"){
            return props.chars.filter(((char: any) => char.code === img)).map((obj: any) => obj.value)
        }
    }
    useEffect(()=>{
        props.chars.filter(((char:any) => char.code === "gallery")).map((obj:any, index:any) => {
            setGallery(
                obj.value.data
            )
        })

        props.chars.filter(((char:any) => char.code === "plans")).map((obj:any, index:any) => {
            if(obj.value.data.length > 1){
                setPlans(
                    obj.value.data
                )
            }
        })

    }, [props.chars]);

    return (
        <>
            <div style={displayBlock} className={styles.apartamento}>
                <Galery
                    imgBanner={characteristics("imagePrincipal") as string}
                    gallery={gallery ? gallery : []}
                />
            </div>
            <div style={displayNone} className={styles.plano}>
                <Planos
                    plans={plans ? plans : []}
                />
            </div>
            <SwitchCollage active={active} noActive={noActive} handleApartamento={handleApartamento} handlePlano={handlePlano} translate={props.translate}/>
        </>
    )
}
