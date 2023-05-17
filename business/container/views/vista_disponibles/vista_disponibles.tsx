import styles from "./styles.module.css";
import React, {useContext, useEffect, useState} from "react";
import Pagination from "../../../content/pagination/pagination";
import Filtro_type1_2 from "../../../content/filtros/filtro_type1_2/filtro_type1_2";
import Apartamento_venta from "../../../content/card/apartamento_venta/apartamento_venta";
import ReviewsSectionSkin from "../../../content/shared/reviewsSectionSkin/reviewsSectionSkin";
import Image from "next/image";
import {getAllResourcesAvailable} from "../../../../service/api/api";
import SpinnerView from "../../../content/spinner/spinner";
import useTranslation from "next-translate/useTranslation";
import {EventAuthContext} from "../../../content/contexts/eventAuthContext";

function Vista_Disponible() {
    const [dataJson, setDataJson] = useState([]);
    const [dataChild, setDataChild] = useState<Array<any>>([]);
    const [cardPerPage, setCardPerPage] = useState(6);
    const [itemOffset, setItemOffset] = useState(0);
    const {t, lang} = useTranslation('buy');
    const {getDollar, currency} = useContext(EventAuthContext);

    function getResoruces() {
        getAllResourcesAvailable()
            .then((response: any) => {

                setDataJson(
                    response.data.data
                );
                setDataChild(
                    response.data.data
                )

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
        .map((salesAptos:any, index:any) =>(
            <Apartamento_venta data={[salesAptos]} key={index} translate={t} lang={lang} getDollar={getDollar} currency={currency}/>
        ))


    const pageCount = Math.ceil(dataChild.length / cardPerPage); //divide boats / boast per page
    const changePage = ({selected}: { selected: any }) => { /*selected or change page*/
        setItemOffset(selected);
    };
    return (

        <>
            <section className={styles.section}>

                <div className={styles.general_1}>
                    <div className={styles.filtro}>
                        <Filtro_type1_2 translate={t} rtl={false} max={1} min={2} data={dataJson} hijoAPadre={setDataChild} lang={lang} getDollar={getDollar} currency={currency}/>
                    </div>
                    <div className={styles.verApartamentos}>
                        <div className={styles.title}>
                            <h1>
                                <Image width={19} height={22} src="/images/elemento-grafico-flecha.png" alt=""/>
                                {t('subtitle')}
                            </h1>
                        </div>
                        <div className={styles.general_card} id="apartamento">

                            {listDisplay}

                        </div>
                    </div>
                </div>
                <div className={styles.pagination}>
                    <div className="tramado_izquierda">
                        <Image width={517} height={55} src="/images/elemento-grafico-flechas.png" alt="Elemento Grafico Flechas"/>
                    </div>
                    <Pagination
                        pageCount={pageCount}
                        changePage={changePage}
                    />
                    <div className={styles.tramado_derecha}>
                        <Image width={517} height={55} src="/images/elemento-grafico-flechas.png" alt="Elemento Grafico Flechas"/>
                    </div>
                </div>
                <ReviewsSectionSkin />
            </section>

        </>
    )

}

export default Vista_Disponible
