import styles from "./styles.module.css";
import Apartamento_disponible from "./searchPanel/rooms_to_see/apartamento_disponible";
import Pagination from "../../../content/pagination/pagination";
import Filtro from "../../../content/filtros/filtro_type_2/filtro/filtro";
import FiltroPrincipal from "./searchSection/filtro_type_1/filtro/filtro";
import ReviewsSectionSkin from "../../../content/shared/reviewsSectionSkin/reviewsSectionSkin";
import React, {useContext, useEffect, useState} from "react";
import Image from "next/image";
import {getAllResourcesAvailable, getResource} from "../../../../service/api/api";
import SpinnerView from "../../../content/spinner/spinner";
import {EventAuthContext} from "../../../content/contexts/eventAuthContext";

export default function Hospedaje(props:any)  {

    const [cardPerPage, setCardPerPage] = useState(6);
    const [dataChild, setDataChild] = useState<Array<any>>([]);
    const [dataJson, setDataJson] = useState([])
    const [itemOffset, setItemOffset] = useState(0);
    const {getDollar, currency} = useContext(EventAuthContext);

    function getResoruces() {
        getAllResourcesAvailable()
            .then((response: any) => {

                setDataJson(
                    response.data.data,
                );

            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    useEffect(()=>{
        getResoruces();
    }, []);

    const PagesVisited = itemOffset * cardPerPage;

    const listDisplay = dataChild.slice(PagesVisited, PagesVisited + cardPerPage)
        .map((aptos:any, index:any) =>(
            <Apartamento_disponible data={[aptos]} key={index} lang={props.lang} getDollar={getDollar} currency={currency} translate={props.translate} gaEventTracker={props.gaEventTracker}/>
        ))

    const pageCount = Math.ceil(dataChild.length / cardPerPage); //divide boats / boast per page
    const changePage = ({selected}: { selected: any }) => { /*selected or change page*/
        setItemOffset(selected);
    };

    return (

        <>

            <FiltroPrincipal rtl={false} max={1} min={2} data={dataJson} hijoAPadre={setDataChild} gaEventTracker={props.gaEventTracker}
                             translate={props.translate} lang={props.lang} getDollar={getDollar} currency={currency}/>

            <section className={styles.section}>
                <div className={styles.general_1}>
                    <div className={styles.filtro}>
                        <Filtro translate={props.translate} rtl={false} max={1} min={2} data={dataJson} hijoAPadre={setDataChild} lang={props.lang} getDollar={getDollar} currency={currency}/>
                    </div>
                    <div className={styles.verApartamentos}>
                        <div className={styles.title}>
                            <h2>
                                <Image width={19} height={22} src="/images/elemento-grafico-flecha.png" alt="Arrows" title="Arrows"/>
                                {props.translate('subtitle')}
                            </h2>
                        </div>
                        <div className={styles.general_card} id="apartamento">
                            {listDisplay}
                        </div>
                    </div>
                </div>
                <div className={styles.pagination}>
                    <div className="tramado_izquierda">
                        <Image width={517} height={55} src="/images/elemento-grafico-flechas.png" alt="Arrows" title="Arrows"/>
                    </div>
                    <Pagination
                        pageCount={pageCount}
                        changePage={changePage}
                    />
                    <div className={styles.tramado_derecha}>
                        <Image width={517} height={55} src="/images/elemento-grafico-flechas.png" alt="Arrows" title="Arrows"/>
                    </div>
                </div>
                <ReviewsSectionSkin/>
            </section>

        </>
    )

}
