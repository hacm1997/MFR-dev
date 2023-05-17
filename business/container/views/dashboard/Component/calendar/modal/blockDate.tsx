import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import config from "../../../../../../../infrastructure/config";
import axios from "axios";
import SaveBlock from "./saveButton/saveBlock";
import UnlockDate from "./unlock/unlockDate";

export default function BlockDate(props:any){
    const [values, setValues] = useState<any>({tenant:config.TENANT, date_block: []});
    const [dataDelete, setDataDelete] = useState<any>();
    const [dpto, setDpto] = useState({
        resource_id: "", name:"", description: "", owner: "", status: "", characteristics: [{}]
    })
    const [dataPerBlock, setDataPerBlock] = useState('');
    const characteristics = (code: string) => {
        return dpto.characteristics.filter(((char: any) => char.code === code)).map((obj: any) => obj.value)
    }
    const getRcode = () => {
        const configuration = {
            method: 'get',
            headers: {
                xsrfCookie: `tenant=${config.TENANT as string}`,
            },
            url: config.API_URL+'/api/v1/resource/search?resource_id='+props.resource_code,
            withCredentials: true
        }

        axios.request(configuration).then((response) => {
            console.log("Response => ",response.data.data[0]);
            setDpto(response.data.data[0]);
        }).catch((error) => {
            console.log(error);
        })
    }
    // console.log("resource code => ", props.resource_code)
    useEffect(() => {
        getRcode();
        values.description = dpto?.description;
        values.beds = characteristics("beds").toString();
        values.type = characteristics("type").toString();
        values.bathrooms = characteristics("bathrooms").toString();
        values.bedrooms = characteristics("bathrooms").toString();
        values.rooms = characteristics("bathrooms").toString();
        values.capacity_adults = characteristics("capacity_adults").toString();
        values.capacity_kids = characteristics("capacity_kids").toString();
        values.location = characteristics("location").toString();
        values.price = characteristics("price").toString();
        values.currency = characteristics("currency").toString();
        values.wifi = characteristics('wifi').toString();
        values.view_sea = characteristics('view_sea').toString();
        values.parking =characteristics('parking').toString();
        values.pool=characteristics('pool').toString();
        values.access_beach=characteristics('access_beach').toString();
        values.washer=characteristics('washer').toString();
        values.air_conditioning=characteristics('air_conditioning').toString();
        values.kitchen=characteristics('kitchen').toString();
        values.airport=characteristics('airport').toString();
        values.pets=characteristics('pets').toString();
        values.historic_center=characteristics('historic_center').toString();
        values.smoke=characteristics('smoke').toString();
        values.calendar=characteristics('calendar').toString();
        values.entry_time=characteristics('entry_time').toString();
        values.departure_time=characteristics('departure_time').toString();
        values.sofa_bed=characteristics('sofa_bed').toString();
        values.durationAvailable=characteristics('durationAvailable').toString();
        values.location_map=characteristics('location_map').toString();
        values.id_calendar=characteristics('id_calendar').toString();
        values.imagePrincipal=characteristics('imagePrincipal').toString();
        values.gallery= characteristics("gallery")[0];
        values.plans=characteristics("plans")[0];
        values.description_english=characteristics('description_english').toString();
        values.tv=characteristics('tv').toString();
        values.heater=characteristics('heater').toString();
        values.jacuzzi=characteristics('jacuzzi').toString();
        values.gym=characteristics('gym').toString();
        values.date_block=characteristics('date_block')[0];
    }, [dpto.resource_id])

    // console.log("to father data => ", dataDelete)
    // console.log("value date block => ", values?.date_block)
    // console.log("data dataPerBlock => ", dataPerBlock)
    useEffect(()=>{
        

        if (values.date_block?.includes(props.date)) {
            setDataPerBlock(props.date);
        }else{
            setDataPerBlock('')
        }

        if(values.date_block === undefined){
            values.date_block = [props.date]
        }

    }, [values.date_block])

    return(
        <>
            {dataPerBlock !== '' && values.date_block !== undefined ?
                <div>
                    <h4>Desbloquear la fecha:</h4>
                    <h3>{props.date}</h3>
                    <div>
                        <UnlockDate
                            data={dpto}
                            values={values}
                            date={props.date}
                            setDataDelete={setDataDelete}
                            dataDelete={dataDelete}
                            closeModal={props.setShow}
                            setStatusModal={props.setStatusModal}
                        />
                        <button onClick={() => props.setShow(false)}>Cancelar</button>
                    </div>
                </div>
                :
                <div>
                    <h4>Bloquear la fecha:</h4>
                    <h3>{props.date}</h3>
                    <div>
                        <SaveBlock
                            data={dpto}
                            values={values}
                            date={props.date}
                            dataPerBlock={dataPerBlock}
                            closeModal={props.setShow}
                            setStatusModal={props.setStatusModal}
                        />
                        <button onClick={() => props.setShow(false)}>Cancelar</button>
                    </div>
                </div>
            }
        </>
    )
}
