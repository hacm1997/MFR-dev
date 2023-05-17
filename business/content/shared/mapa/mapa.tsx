import styles from './styles.module.css';
import * as React from "react";

export default function Mapa(props:any) {

    //console.log(props.nameApto)
    const characteristics = (code: string) => {
        return props.data.filter(((char: any) => char.code === code)).map((obj: any) => obj.value)
    }
    const content = (code: string) => {
        return(

            props.data.filter(((char:any) => char.code === code)).map((obj:any, index:any) => {

                if(code === 'location'){
                    return(<div key={index}><p><img width={20} height={20} src={"/images/icono-caracteristicas/ubicacion.png"} alt="Ubicación" title="Ubicación"/> {characteristics('location')} </p></div>)
                }
                if(code === 'airport' && obj.value === "1"){
                    return(<div key={index}><p><img width={20} height={20} src={"/images/icono-caracteristicas/avion.png"} alt="Aereopuerto" title="Aereopuerto"/> {props.translate('extra_chars.airport')}</p></div>)
                }
                if(code === 'historic_center' && obj.value === "1"){
                    return(<div key={index}><p><img width={20} height={20} src={"/images/icono-caracteristicas/centro-historico.png"} alt="Centro-histórico" title="Centro-histórico"/> {props.translate('extra_chars.historic')}</p></div>)
                }
                if(code === 'access_beach' && obj.value === "1"){
                    return(<div key={index}><p><img width={20} height={20} src={"/images/icono-caracteristicas/playa.png"} alt="accesso a playa" title="playa"/> {props.translate('extra_chars.beach')}</p></div>)
                }
                if(code === 'entry_time'){
                    return(<div key={index}><p><img width={20} height={20} src={"/images/icono-caracteristicas/horario.png"} alt="Hora-entrada" title="Horario"/> {props.translate('extra_chars.h_entry')}: {characteristics('entry_time')}</p></div>)
                }
                if(code === 'departure_time'){
                    return(<div key={index}><p><img width={20} height={20} src={"/images/icono-caracteristicas/horario.png"} alt="Hora-salida" title="Horario"/> {props.translate('extra_chars.h_end')}: {characteristics('departure_time')}</p></div>)
                }
                if(code === 'pets' && obj.value === "1"){
                    return(<div key={index}><p><img width={20} height={20} src={"/images/icono-caracteristicas/mascota.png"} alt="Mascotas" title="Mascotas"/> {props.translate('extra_chars.pets')}</p></div>)
                }
                if(code === 'smoke' && obj.value === "1"){
                    return(<div key={index}><p><img width={20} height={20} src={"/images/icono-caracteristicas/no-fumar.png"} alt="Prohibido-fumar" title="Prohibido-fumar"/> {props.translate('extra_chars.smoke')}</p></div>)
                }
            })

        )

    }

    return (
        <>
            <div>
                <div className={styles.general_ubicacion}>
                    <div className={styles.container_title}>
                        <h2>{props.title}</h2>
                    </div>
                </div>
                <div className={styles.mapa}>
                    <iframe
                        src={"https://www.google.com/maps/"+characteristics('location_map').toString()}
                        width="100%" height="600"  loading="lazy"></iframe>
                </div>

                <div className={styles.info_ubicacion}>
                    {content('location')}
                    {content('access_beach')}
                    {content('historic_center')}
                    {content('entry_time')}
                    {content('pets')}
                    {content('departure_time')}
                    {content('smoke')}
                    {content('airport')}
                    <div className={styles.tramado_fechas}>
                        <img src="/images/elemento-grafico-flechas.png" alt="Arrows" title="Arrows element"/>
                    </div>
                </div>

            </div>



        </>
    )
}
