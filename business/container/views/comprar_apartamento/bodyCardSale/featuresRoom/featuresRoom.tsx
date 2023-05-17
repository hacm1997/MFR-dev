import styles from "./styles.module.css";
import * as React from "react";
import Image from "next/image";
import Amenities from "./amenities";

export default function FeaturesRoom(props: any) {

    const getExtraChars = (code: string) => {
        return(
            props.chars.filter(((char:any) => char.code === code)).map((obj:any, index:any) => {
                if(code === 'wifi' && obj.value === "1"){
                    return(<div key={index}><p><Image width={25} height={25} objectFit={"cover"} src={"/images/icono-caracteristicas/wifi.png"} alt="wifi"/> {props.translate('amenities.wifi')}</p></div>)
                }
                if(code === 'view_sea' && obj.value === "1"){
                    return(<div key={index}><p><Image width={25} height={25} objectFit={"cover"} src={"/images/icono-caracteristicas/vista-al-mar.png"} alt="mar"/> {props.translate('amenities.view_sea')}</p></div>)
                }
                if(code === 'parking' && obj.value === "1"){
                    return(<div key={index}><p><Image width={25} height={25} objectFit={"cover"} src={"/images/icono-caracteristicas/parqueadero.png"} alt="parqueadero"/> {props.translate('amenities.parking')}</p></div>)
                }
                if(code === 'pool' && obj.value === "1"){
                    return(<div key={index}><p><Image width={25} height={25} objectFit={"cover"} src={"/images/icono-caracteristicas/picsina.png"} alt="piscina"/> {props.translate('amenities.pool')}</p></div>)
                }
                if(code === 'kitchen' && obj.value === "1"){
                    return(<div key={index}><p><Image width={25} height={25} objectFit={"cover"} src={"/images/icono-caracteristicas/comidas.png"} alt="cocina"/> {props.translate('amenities.cooking')}</p></div>)
                }
                if(code === 'access_beach' && obj.value === "1"){
                    return(<div key={index}><p><Image width={25} height={25} objectFit={"cover"} src={"/images/icono-caracteristicas/playa.png"} alt="accesso a playa"/> {props.translate('amenities.access_beach')}</p></div>)
                }
                if(code === 'air_conditioning' && obj.value === "1"){
                    return(<div key={index}><p><Image width={25} height={25} objectFit={"cover"} src={"/images/icono-caracteristicas/aire-acondicionado.png"} alt="aire acondicionado"/> {props.translate('amenities.air')}</p></div>)
                }
                if(code === 'washer' && obj.value === "1"){
                    return(<div key={index}><p><Image width={25} height={25} objectFit={"cover"} src={"/images/icono-caracteristicas/lavadora.png"} alt="Lavadora"/> {props.translate('amenities.washer')}</p></div>)
                }
                if(code === 'tv' && obj.value === "1"){
                    return(<div key={index}><p><i className='bx bx-tv' style={{fontSize: '22px', color: '#8C15E4'}}></i> {props.translate('amenities.tv')}</p></div>)
                }
                if(code === 'heater' && obj.value === "1"){
                    return(<div key={index}><p><i className='bx bx-shower' style={{fontSize: '22px', color: '#8C15E4'}}></i> {props.translate('amenities.heater')}</p></div>)
                }
                if(code === 'jacuzzi' && obj.value === "1"){
                    return(<div key={index}><p><i className='bx bx-water' style={{fontSize: '22px', color: '#8C15E4'}}></i> {props.translate('amenities.jacuzzi')}</p></div>)
                }
                if(code === 'gym' && obj.value === "1"){
                    return(<div key={index}><p><i className='bx bx-dumbbell' style={{fontSize: '22px', color: '#8C15E4'}}></i> {props.translate('amenities.gym')}</p></div>)
                }
            })
        )

    }

    const content =  (
        <div className={styles.content_general}>
            <p>
                {props.lang === 'en' ? getExtraChars('description_english') : props.resource.description}
            </p>
            <hr/>
            <h3>{props.translate('for_buy.char_text')} <i className='bx bx-chevron-down'></i></h3>
            <div className={styles.caracteristicas}>
                {getExtraChars('wifi')}
                {getExtraChars('view_sea')}
                {getExtraChars('parking')}
                {getExtraChars('pool')}
                {getExtraChars('kitchen')}
                {getExtraChars('access_beach')}
                {getExtraChars('air_conditioning')}
                {getExtraChars('washer')}
                {getExtraChars('tv')}
                {getExtraChars('heater')}
                {getExtraChars('jacuzzi')}
                {getExtraChars('gym')}
            </div>
            <hr/>
            <h3>{props.translate('for_buy.amenities_text')} <i className='bx bx-chevron-down'></i></h3>
            <div className={styles.caracteristicas}>
                <Amenities amenities={props.chars} translate={props.translate}/>
            </div>
        </div>
    );

    return (
        <>
            {content}
        </>
    )
}
