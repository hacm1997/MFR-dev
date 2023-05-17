import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import {allResources} from "../../../../../../../service/api/api";

export default function Resources(props:any) {
    const [dataJson, setDataJson] = useState<any>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    useEffect(()=>{

        allResources().then((res:any)=>{
            console.log("res dataJson => ", res)
            setDataJson(res.data.data)
        }).catch((err: Error)=>{
            console.log(err);
        })

    }, [props.statusModal]);
    // console.log("Data Json => ", dataJson.filter((dt:any)=> dt.status === 'Available' || dt.status === "Disabled"))
    const listResources = dataJson.filter((dt:any)=> dt.status === 'Available' || dt.status === "Disabled").map((item:any, index:number) => (
        <ul key={index} className={`${styles.list_resources} ${index === activeIndex ? styles.active : ''}`}>
            <li onClick={() => {
                props.setResourceCode(item.resource_id);
                setActiveIndex(index);
                props.setDataDpto(item)
            }}>
                {item.name}
            </li>
        </ul>
    ))

    return(
        <>
            <div>
                <h5>Apartamentos</h5>
                <hr style={{border: "1px solid #8c15e4"}}/>
                <div className={styles.resources_content}>
                    {listResources}
                </div>
            </div>
        </>
    )
}
