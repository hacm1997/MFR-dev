import styles from "./styles.module.css";
import * as React from 'react';
import {Range, getTrackBackground} from 'react-range';
import {useEffect, useState} from "react";
import useMouseUp from "../../../../../hooks/useMouseUp";
import {formatNumber} from "../../../../../service/service";

const STEP = 100000;
const MIN = 100000;
const MAX = 2000000;

const Filtro: React.FC<{ min: any, max: any, rtl: boolean, data:any, hijoAPadre:any, lang:any, getDollar:any, currency:any, translate:any }> =
    ({ rtl, data, hijoAPadre, lang, getDollar, currency, translate }) => {
    const STEP_USD = Math.round(10000/getDollar);
    const MIN_USD = 22;
    const MAX_USD = 450;
    const [valueUsd, setValuesUsd] = useState([22, 450]);
    const [values_type1, setValues_type1] = React.useState([100000, 2000000]);
    const refsubMenuPrecio = React.useRef<HTMLDivElement>(null);
    const [subMenuPrecio, setSubMenuPrecio] = useState(false);
    const [amenities, setAmenities] = React.useState({
        beds: 0,
        bedrooms: 0
    });
    const handleChange = async (evt:any) =>{
        const value = evt.target.value;
        setAmenities({
            ...amenities,
            [evt.target.name]: value
        });

    }
    const [listUpdate, setListUpdate] = useState<Array<any>>([]);
    //Valor Min y Max parseado

    const SentToFather = () => {
        hijoAPadre(listUpdate);
    }

    useMouseUp(refsubMenuPrecio, () => {
        setSubMenuPrecio(false);
    })

    useEffect(() => {
        SentToFather( );
    }, [listUpdate]);

    //Valor Min y Max parseado
    const min = lang ==='en' || currency=== 'USD' ? valueUsd[0] :values_type1[0];
    const max = lang ==='en' || currency=== 'USD' ? valueUsd[1] :values_type1[1];

    let updateList = data.filter((r:any) => (r.characteristics.filter(((char:any) => char.code === "type")).map((obj:any) => obj.value) != "Compra"));

    const applyFilter = () => {
        updateList = updateList.filter(
            (item:any) => Number((lang==='en' || currency==='USD' ? item.price/getDollar : item.price)) >= min && (lang==='en' || currency==='USD' ? item.price/getDollar : item.price) <= max
        );
        updateList = updateList.filter(
            (item:any) => Number(item.beds) >= amenities.beds
        );
        updateList = updateList.filter(
            (item:any) => Number(item.bedrooms) >= amenities.bedrooms
        );

        hijoAPadre(updateList)
    }

        const applyFilterEng = () => {
            updateList = updateList.filter(
                (item:any) => Number((lang==='en' || currency==='USD' ? item.price/getDollar : item.price)) >= min && (lang==='en' || currency==='USD' ? item.price/getDollar : item.price) <= max
            );
            updateList = updateList.filter(
                (item:any) => Number(item.beds) >= amenities.beds
            );
            updateList = updateList.filter(
                (item:any) => Number(item.bedrooms) >= amenities.bedrooms
            );

            hijoAPadre(updateList)
        }

    useEffect(() => {
        if(lang !== 'en' || currency !== 'USD'){
            applyFilter();
        }

    }, [values_type1, amenities.beds, amenities.bedrooms]);

        useEffect(() => {
            if(lang === 'en' || currency === 'USD'){
                applyFilterEng();
            }
        }, [valueUsd, amenities.beds, amenities.bedrooms]);

    // useEffect(()=>{
    //     setValuesUsd([MIN_USD, MAX_USD])
    // }, [MIN_USD, MAX_USD])

    return (
        <>

            <div className={styles.general}>
                <div className={styles.content_1}>
                    <h2>{translate('filter2.title')}</h2>
                    <p>{translate('filter2.description')}</p>

                    <div className={styles.range}>
                        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <Range
                                values={currency === 'USD' || lang === 'en' ? valueUsd : values_type1}
                                step={lang === 'en' || currency === 'USD' ? STEP_USD : STEP}
                                min={lang === 'en' || currency === 'USD' ? MIN_USD : MIN}
                                max={lang === 'en' || currency === 'USD' ? MAX_USD : MAX}
                                rtl={rtl}
                                onChange={(values) => currency === 'USD' || lang === 'en' ? setValuesUsd(values) : setValues_type1(values)}
                                renderTrack={({props, children}) => (
                                    <div
                                        onMouseDown={props.onMouseDown}
                                        onTouchStart={props.onTouchStart}
                                        style={{...props.style, height: '36px', display: 'flex', width: '100%'}}>
                                        <div ref={props.ref} style={{
                                            height: '5px',
                                            width: '100%',
                                            borderRadius: '4px',
                                            background: getTrackBackground({
                                                values: valueUsd ? currency === 'USD' || lang === 'en' ? valueUsd : values_type1 : values_type1,
                                                colors: ['#ccc', '#8C15E4', '#ccc'],
                                                min: valueUsd ? lang === 'en' || currency === 'USD' ? MIN_USD : MIN : MIN,
                                                max: valueUsd ? lang === 'en' || currency === 'USD' ? MAX_USD : MAX : MAX,
                                                rtl
                                            }),
                                            alignSelf: 'center'
                                        }}
                                        >
                                            {children}
                                        </div>
                                    </div>
                                )}
                                renderThumb={({index, props, isDragged}) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '16px',
                                            width: '16px',
                                            borderRadius: '50px',
                                            backgroundColor: '#8C15E4',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0px 2px 6px #AAA'
                                        }}
                                    >
                                        {/*<div*/}
                                        {/*    style={{*/}
                                        {/*        position: 'absolute',*/}
                                        {/*        top: '-28px',*/}
                                        {/*        color: '#fff',*/}
                                        {/*        fontWeight: '400',*/}
                                        {/*        fontSize: '14px',*/}
                                        {/*        padding: '4px',*/}
                                        {/*        borderRadius: '4px',*/}
                                        {/*        backgroundColor: '#8C15E4'*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    ${valueUsd ? lang === 'en' || currency === 'USD' ? valueUsd[index] :(values_type1[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")):values_type1[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}*/}
                                        {/*</div>*/}
                                    </div>
                                )}
                            />
                        </div>
                        <div className={styles.content_range}>
                            <div>
                                <p>Min</p>
                            </div>
                            <div>
                                <p>Max</p>
                            </div>
                        </div>
                        <div className={styles.valor_filtro}>
                            <div>
                                <p><span>$</span> {lang === 'en' || currency === 'USD' ? min : formatNumber(min)}</p>
                            </div>
                            <div>
                                <p><span>$</span> {lang === 'en' || currency === 'USD' ? max : formatNumber(max)}</p>
                            </div>
                        </div>

                    </div>


                </div>
                <div className={styles.content_2}>
                    <h2>{translate('filter2.beds')}</h2>
                    <div className={styles.cantidad_camas}>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="beds"
                                   id="inlineRadio1" value={1} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="beds"
                                   id="inlineRadio2" value={2} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="beds"
                                   id="inlineRadio3" value={3} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="inlineRadio2">3</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="beds"
                                   id="inlineRadio4" value={4} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="inlineRadio2">4</label>
                        </div>

                    </div>
                </div>
                <div className={styles.content_3}>
                    <h2>{translate('filter2.bedrooms')}</h2>
                    <div className="cantiad_banos">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="bedrooms"
                                   id="baño1" value={1} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="bedrooms"
                                   id="baño2" value={2} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="bedrooms"
                                   id="baño3" value={3} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="inlineRadio2">3</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Filtro

