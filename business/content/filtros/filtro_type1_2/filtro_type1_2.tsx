import styles from "./styles.module.css";
import * as React from 'react';
import {Range, getTrackBackground} from 'react-range';
import {useEffect, useState} from "react";
import useMouseUp from "../../../../hooks/useMouseUp";
import {formatNumber} from "../../../../service/service";

const STEP_type1 = 50000000;
const MIN_type1 = 100000000;
const MAX_type1 = 800000000;

const STEP_type2 = 10;
const MIN_type2 = 0;
const MAX_type2 = 200;

const Filtro: React.FC<{ min: any, max: any, rtl: boolean, data:any, hijoAPadre:any, lang:any, getDollar:any, currency:any, translate:any }> =
    ({ rtl, data, hijoAPadre, lang, getDollar, currency, translate }) => {
    const STEP_USD = Math.round(500000000/getDollar);
    const MIN_USD = 21568;
    const MAX_USD = 172551;
    const [valueUsd, setValuesUsd] = useState([21568, 172551]);
    const [values_type1, setValues_type1] = React.useState([100000000, 800000000]);
    const [values_type2, setValues_type2] = React.useState([0, 200]);
    const refsubMenuPrecio = React.useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        SentToFather( );
    }, [listUpdate]);

    //Valor Min y Max parseado
    const min = lang ==='en' || currency=== 'USD' ? valueUsd[0] :values_type1[0];
    const max = lang ==='en' || currency=== 'USD' ? valueUsd[1] :values_type1[1];
    const minArea = values_type2[0];
    const maxArea = values_type2[1];
    let updateList = data.filter((r:any) => (r.characteristics.filter(((char:any) => char.code === "type")).map((obj:any) => obj.value) == "Compra"));

    const applyFilter = () => {
        updateList = updateList.filter(
            (item:any) => Number((lang==='en' || currency==='USD' ? item.price/getDollar : item.price)) >= min && (lang==='en' || currency==='USD' ? item.price/getDollar : item.price) <= max
        );
        updateList = updateList.filter(
            (item:any) => Number(item.area) >= minArea && item.area <= maxArea
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
        applyFilter();
    }, [values_type1, values_type2, amenities.beds, amenities.bedrooms]);

    useEffect(() => {
        if(lang === 'en' || currency === 'USD'){
            applyFilterEng();
        }
    }, [valueUsd, amenities.beds, amenities.bedrooms]);

    return (
        <>
            <div className={styles.general}>
                <div className={styles.content_1}>
                    <h2>{translate('filter2.title')}</h2>
                    <p>{translate('filter2.price')}</p>

                    <div className={styles.range}>
                        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <Range
                                values={currency === 'USD' || lang === 'en' ? valueUsd : values_type1}
                                step={lang === 'en' || currency === 'USD' ? STEP_USD : STEP_type1}
                                min={lang === 'en' || currency === 'USD' ? MIN_USD : MIN_type1}
                                max={lang === 'en' || currency === 'USD' ? MAX_USD : MAX_type1}
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
                                                min: valueUsd ? lang === 'en' || currency === 'USD' ? MIN_USD : MIN_type1 : MIN_type1,
                                                max: valueUsd ? lang === 'en' || currency === 'USD' ? MAX_USD : MAX_type1 : MAX_type1,
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
                                <p><span>$</span> {lang === 'en' ? min : formatNumber(min)}</p>
                            </div>
                            <div>
                                <p><span>$</span> {lang === 'en' ? max : formatNumber(max)}</p>
                            </div>
                        </div>

                    </div>
                    <br/>
                    {/*<p>Área</p>*/}
                    {/*<div className={styles.range}>*/}
                    {/*    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>*/}
                    {/*        <Range*/}
                    {/*            values={values_type2}*/}
                    {/*            step={STEP_type2}*/}
                    {/*            min={MIN_type2}*/}
                    {/*            max={MAX_type2}*/}
                    {/*            rtl={rtl}*/}
                    {/*            onChange={(values2) => setValues_type2(values2)}*/}
                    {/*            renderTrack={({props, children}) => (*/}
                    {/*                <div*/}
                    {/*                    onMouseDown={props.onMouseDown}*/}
                    {/*                    onTouchStart={props.onTouchStart}*/}
                    {/*                    style={{...props.style, height: '36px', display: 'flex', width: '100%'}}>*/}
                    {/*                    <div ref={props.ref} style={{*/}
                    {/*                        height: '5px',*/}
                    {/*                        width: '100%',*/}
                    {/*                        borderRadius: '4px',*/}
                    {/*                        background: getTrackBackground({*/}
                    {/*                            values: values_type2,*/}
                    {/*                            colors: ['#ccc', '#8C15E4', '#ccc'],*/}
                    {/*                            min: MIN_type2,*/}
                    {/*                            max: MAX_type2,*/}
                    {/*                            rtl*/}
                    {/*                        }),*/}
                    {/*                        alignSelf: 'center'*/}
                    {/*                    }}*/}
                    {/*                    >*/}
                    {/*                        {children}*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            )}*/}
                    {/*            renderThumb={({index, props, isDragged}) => (*/}
                    {/*                <div*/}
                    {/*                    {...props}*/}
                    {/*                    style={{*/}
                    {/*                        ...props.style,*/}
                    {/*                        height: '16px',*/}
                    {/*                        width: '16px',*/}
                    {/*                        borderRadius: '50px',*/}
                    {/*                        backgroundColor: '#8C15E4',*/}
                    {/*                        display: 'flex',*/}
                    {/*                        justifyContent: 'center',*/}
                    {/*                        alignItems: 'center',*/}
                    {/*                        boxShadow: '0px 2px 6px #AAA'*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    <div*/}
                    {/*                        style={{*/}
                    {/*                            position: 'absolute',*/}
                    {/*                            top: '-28px',*/}
                    {/*                            color: '#fff',*/}
                    {/*                            fontWeight: '400',*/}
                    {/*                            fontSize: '14px',*/}
                    {/*                            padding: '4px',*/}
                    {/*                            borderRadius: '4px',*/}
                    {/*                            backgroundColor: '#8C15E4'*/}
                    {/*                        }}*/}
                    {/*                    >*/}
                    {/*                        {values_type2[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            )}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.content_range}>*/}
                    {/*        <div>*/}
                    {/*            <p>Min</p>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <p>Max</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.valor_filtro}>*/}
                    {/*        <div>*/}
                    {/*            <p>{values_type2[0]} <span> m<sup>2</sup></span></p>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <p>{values_type2[1]} <span> m<sup>2</sup></span></p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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

//enviar datos al padre

