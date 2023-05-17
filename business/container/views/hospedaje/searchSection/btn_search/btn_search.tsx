import styles from './styles.module.css';
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../../../../../infrastructure/config";
import Swal from "sweetalert2";

export default function BtnSearch({data, selectedPrice, type, adults, kids, applyFilter, hijoAPadre, translate, lang, getDollar, currency, gaEventTracker}:any) {

    const [click, setClick] = useState(false);
    // const [status, setStatus] = useState(0);
    const [resultsFound, setResultsFound] = useState(true);

    const [list, setList] = useState<any>();

    // const configuration = {
    //     method: 'get',
    //     url: `${config.API_URL}/api/v1/resource/search?status=Available&type=${type}&startprice=${minPrice}&endprice=${maxPrice}&capacity_adults=${adults}&capacity_kids=${kids}`,
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type':'application/json',
    //         xsrfCookie: `tenant=${config.TENANT as string}`,
    //     },
    //     withCredentials: true
    // }
    //
    // //console.log("hi"+updateList)
    // applyFilter = () => {
    //     // --- Price filter --- //
    //
    //     axios.request(configuration).then((response) => {
    //         console.log(response.data);
    //         setStatus(response.data.status);
    //         setList(response.data.data);
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    //
    //     console.log("Data filtrada: ")
    //     console.log(list)
    //
    //     hijoAPadre(list);
    //
    // }
    let updateList = data

    applyFilter = () => {
        gaEventTracker('Clic botón filtro')
        // --- Price filter --- //
        const minPrice = selectedPrice[0];
        const maxPrice = selectedPrice[1];

        updateList = updateList.filter(
            (item: { price: number; }) => (lang==='en' || currency==='USD' ? item.price/getDollar : item.price) >= minPrice && (lang==='en' || currency==='USD' ? item.price/getDollar : item.price) <= maxPrice
        );

        updateList = updateList.filter(
            (item: { type: string; }) => item.type === type
        );

        // --- Capacity Filter --- //

        updateList = updateList.filter(
            (item: { capacity_adults: number; }) => item.capacity_adults >= adults
        )
        updateList = updateList.filter(
            (item: { capacity_kids: number; }) => item.capacity_kids >= kids
        )

        setList(updateList);
        hijoAPadre(updateList)
        !updateList.length ?
            Swal.fire(
                {
                    title: 'No se encontraron resultados',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }
            ).then((result) => {
                setResultsFound(false)
            })
            :
            Swal.fire(
                {
                    title: 'Filtros aplicados',
                    text: `Se encontraron ${updateList.length} elementos`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }
            ).then((result) => {
                setResultsFound(true);
            })

    };

    const BtnClick = () => {
        applyFilter();
        setClick(true);
    }
    //btnToFilter(data);
    useEffect(() => {
        if(click){
            BtnClick();
        }else{
            hijoAPadre(data)
        }
    }, [click, data]);

    return (
        <>
            <button onClick={applyFilter} className={"btn " + styles.btn_buscar}>{translate('filter.button')}</button>
        </>
    )
}
