import styles from "./styles.module.css";
import * as React from "react";
import Image from "next/image";

export default function Amenities(props: any) {
    const characteristics = (code: string) => {
        return props.amenities.filter(((char: any) => char.code === code)).map((obj: any) => obj.value)
    }
    const getAmenities = (code: string) => {
        return(
            props.amenities.filter(((char:any) => char.code === code)).map((obj:any, index:any) => {
                if(code === 'bedrooms'){
                    return(
                        <p key={index}>
                            <Image width={20} height={20} src={"/images/icono-caracteristicas/metros.png"} alt="área"/>
                            m2
                        </p>
                    )
                }
                if(code === 'view_sea' && obj.value === "1"){
                    return(
                        <p key={index}>
                            <Image width={20} height={20} src={"/images/icono-caracteristicas/vista-al-mar.png"} alt="evelador"/>
                            {props.translate('for_buy.amenities.view_sea')}
                        </p>
                    )
                }
                if(code === 'bathrooms'){
                    return(
                        <p key={index}>
                            <Image width={20} height={20} src={"/images/icono-caracteristicas/baños.png"} alt="evelador"/>
                            {props.translate('for_buy.amenities.bathrooms')}
                        </p>
                    )
                }
                if(code === 'garage' && obj.value === "1"){
                    return(
                        <p key={index}>
                            <Image width={20} height={20} src={"/images/icono-caracteristicas/garaje.png"} alt="evelador"/>
                            {props.translate('for_buy.amenities.garage')}
                        </p>
                    )
                }
                if(code === 'balcony' && obj.value === "1"){
                    return(
                        <p key={index}>
                            <Image width={20} height={20} src={"/images/icono-caracteristicas/balcon.png"} alt="evelador"/>
                            {props.translate('for_buy.amenities.balcony')}
                        </p>
                    )
                }
                if(code === 'air_conditioning' && obj.value === "1"){
                    return(
                        <p key={index}>
                            <Image width={20} height={20} src={"/images/icono-caracteristicas/aire-acondicionado.png"} alt="evelador"/>
                            {props.translate('for_buy.amenities.air')}
                        </p>
                    )
                }
                if(code === 'elevator' && obj.value === "1"){
                    return(
                        <p key={index}>
                            <Image width={20} height={20} src={"/images/icono-caracteristicas/elevador.png"} alt="evelador"/>
                            {props.translate('for_buy.amenities.elevator')}
                        </p>
                    )
                }
            })
        )

    }

    return(
        <>
            {getAmenities('bedrooms')}
            {getAmenities('elevator')}
            {getAmenities('garage')}
            {getAmenities('balcony')}
            {getAmenities('bathrooms')}
            {getAmenities('air_conditioning')}
            {getAmenities('view_sea')}
        </>
    )
}
