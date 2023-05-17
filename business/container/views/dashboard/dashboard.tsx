import Search from "./Component/apartamentos/search/search";
import Apartamentos from "./Component/apartamentos/apartamentos";
import AbrirModal from "./Component/modal/abrirModal/abrirModal";
import ModalAgregar from "./Component/modal/modalAgregar/modalAgregar";
import styles from "./styles.module.css";
import {useEffect, useState} from "react";
import {allResources, useAllResources} from "../../../../service/api/api";

export default function Dashboard() {
    const [dataReload, setDataReload] = useState<any>([])
    // const [dataJson, getAll] = useAllResources();
    const [dataJson, setDataJson] = useState<any>([]);
    const [search, setSearch] = useState("");
    const [dataFilter, setDataFilter] = useState<any>(dataJson);
    const [statusModal, setStatusModal] = useState<any>();

    useEffect(()=>{
        setDataFilter(dataJson)
    }, [dataJson])

    useEffect(()=>{

        // getAll();
        allResources().then((res:any)=>{
            setDataJson(res.data.data)
        }).catch((err: Error)=>{
            console.log(err);
        })

    }, [statusModal]);

    return (
        <>
            <section className={styles.section}>
                <div className={styles.abrir}>
                    <AbrirModal setStatusModal={setStatusModal}/>
                    <Search search={search} setSearch={setSearch} dataJson={dataJson} setDataFilter={setDataFilter}/>
                </div>

                <div className={styles.general_apartamentos}>
                    <Apartamentos
                        dataResources={dataFilter}
                        setDataReload={setDataReload}
                        setStatusModalUpdate={setStatusModal}
                    />
                </div>
                <ModalAgregar/>
            </section>
        </>
    )
}
