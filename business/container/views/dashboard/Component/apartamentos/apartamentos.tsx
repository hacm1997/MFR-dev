import styles from "./styles.module.css";
import Image from "next/image";
import { formatNumber } from "../../../../../../service/service";
import ModalUpdate from "../modal/update/abrirModal/updateModal";
import {useEffect, useState} from "react";

export default function Apartamentos({ dataResources, setDataReload, setStatusModalUpdate }: any, props:any) {
    const [statusModal, setStatusModal] = useState<any>();

    useEffect(()=>{
        setStatusModalUpdate(statusModal);
    }, [statusModal])
    const aptos = dataResources.map((res: any, index: any) => {
        if(res.status === 'Available' || res.status === "Disabled"){

            const characteristics = (code: string) => {

                return res.characteristics.filter(((char: any) => char.code === code)).map((obj: any) => obj.value)

            }

            return (
                <div className={styles.general} key={index}>
                    <div className={styles.card_apartamento}>

                        <div className={styles.portada}>
                            <img width={325} height={220} src={characteristics("imagePrincipal")} alt="Apartamento" />

                        </div>
                        <div className={styles.info}>
                            <div className={styles.title}>
                                <h2>{res.name}</h2>
                                <p>{characteristics("location")}</p>
                            </div>
                            <div className={styles.caracteristicas}>
                                <p>{characteristics("bedrooms")} Alcoba</p>
                                <p>Máximo {Number(characteristics("capacity_adults")) + Number(characteristics("capacity_kids"))} personas</p>
                                <p>{characteristics("capacity_adults")} Adultos - {characteristics("capacity_kids")} Niños</p>
                                <p>{characteristics("beds")} Camas doble{/*, 2 sofá camas*/}</p>
                                <p>{characteristics("bathrooms")} Baños</p>

                            </div>
                            <div className={styles.precio}>
                                <p>{formatNumber(characteristics("price"))} COP / noche</p>
                            </div>
                            <div className={styles.status}>
                                <p style={{color: res.status === "Available" ? "green" : "red"}}>
                                    {res.status === "Available" ? "Disponible" : "No disponible"}
                                </p>
                            </div>
                            <ModalUpdate code={res.resource_id} data={res} name={res.name} setDataReload={setDataReload} setStatusModal={setStatusModal}/>
                        </div>

                    </div>
                </div>
            )
        }
    })

    return (
        <>

            {aptos}

        </>
    )
}
