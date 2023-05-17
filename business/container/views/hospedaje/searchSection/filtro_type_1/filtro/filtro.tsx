import styles from "./styles.module.css"
import Select from 'react-select'
import 'antd/dist/reset.css';
import { DatePicker } from 'antd';
import {useEffect, useState} from 'react';
import * as React from "react";
import { Range, getTrackBackground } from 'react-range';
import useMouseUp from "../../../../../../../hooks/useMouseUp";
import BtnSearch from "../../btn_search/btn_search";
import {formatNumber} from "../../../../../../../service/service";

const STEP = 100000;
const MIN = 100000;
const MAX = 2000000;

const { RangePicker } = DatePicker;


const options = [
    { id: 1, value: 'Vacaciones', label: 'Vacaciones' },
    { id: 2, value: 'Trabajo', label: 'Trabajo' }
]

const FiltroPrincipal: React.FC<{ min: any, max: any, rtl: boolean, data:any, hijoAPadre:any, translate:any, lang:any, getDollar:any, currency:any,gaEventTracker:any }> =
    ({ rtl, data, hijoAPadre, translate, lang, getDollar, currency, gaEventTracker }) => {
    const STEP_USD = Math.round(10000/getDollar);
    const MIN_USD = Math.round(22);
    const MAX_USD = Math.round(450);

    const [values, setValues] = React.useState([100000, 2000000]);
    const [valueUsd, setValuesUsd] = useState<any>();
    const [subMenuPrecio, setSubMenuPrecio] = useState(false);
    const [subMenuPersonas, setSubMenuPersonas] = useState(false);
    const refsubMenuPrecio = React.useRef<HTMLDivElement>(null);
    const refsubMenuPersonas = React.useRef<HTMLDivElement>(null);
    const [adultos, setAdultos] = useState(1);
    const [ninos, setNinos] = useState(0);
    const [type, setType] = useState('');

    const changeType = (e:any) => {
        setType(e.target.value);
    }

    const rangoPrecio = () => {
        setSubMenuPrecio(!subMenuPrecio);
    }
    const persona = () => {
        setSubMenuPersonas(!subMenuPersonas);
    }

    useMouseUp(refsubMenuPrecio, () => {
        setSubMenuPrecio(false);
    })
    useMouseUp(refsubMenuPersonas, () => {
        setSubMenuPersonas(false);
    })

    useEffect(()=>{
        setValuesUsd([MIN_USD, MAX_USD])
    }, [MIN_USD, MAX_USD])

    return (
        <>
            <div className={styles.general}>

                    <div className={styles.input_general}>
                        <div className={styles.input_group}>
                            <div>
                                <select id="select"
                                        onChange={changeType}
                                        className={styles.tipo_viaje}>
                                    <option value="">{translate('filter.type_text')}</option>
                                    <option value="Trabajo">{translate('filter.type1')}</option>
                                    <option value="Vacaciones">{translate('filter.type2')}</option>
                                </select>
                            </div>
                            {/*<RangePicker className={styles.fecha} format="DD/MM/YYYY"*/}
                            {/*             placeholder={['Check-in', 'Check-out']} />*/}
                            <div onClick={rangoPrecio} className={styles.rango_precio}>
                                <p>$ {valueUsd ? lang === 'en' || currency === 'USD' ? valueUsd[0] : formatNumber(values[0]) : values[0]} <span>{lang === 'en' || currency === 'USD' ? 'USD' : 'COP'} - </span> $ {valueUsd ? lang === 'en' || currency === 'USD' ? valueUsd[1] : formatNumber(values[1]) : values[1]}</p>
                            </div>

                            {subMenuPrecio ? <div ref={refsubMenuPrecio} className={styles.sub_menu_rango}>
                                <div className={styles.range}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <Range
                                            values={currency === 'USD' || lang === 'en' ? valueUsd : values}
                                            step={lang === 'en' || currency === 'USD' ? STEP_USD : STEP}
                                            min={lang === 'en' || currency === 'USD' ? MIN_USD : MIN}
                                            max={lang === 'en' || currency === 'USD' ? MAX_USD : MAX}
                                            rtl={rtl}
                                            onChange={(values) => currency === 'USD' || lang === 'en' ? setValuesUsd(values) : setValues(values)}
                                            renderTrack={({ props, children }) => (
                                                <div
                                                    onMouseDown={props.onMouseDown}
                                                    onTouchStart={props.onTouchStart}
                                                    style={{
                                                        ...props.style,
                                                        height: '36px',
                                                        display: 'flex',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <div
                                                        ref={props.ref}
                                                        style={{
                                                            height: '5px',
                                                            width: '100%',
                                                            borderRadius: '4px',
                                                            background: getTrackBackground({
                                                                values: currency === 'USD' || lang === 'en' ? valueUsd : values,
                                                                colors: ['#ccc', '#8C15E4', '#ccc'],
                                                                min: lang === 'en' || currency === 'USD' ? MIN_USD : MIN,
                                                                max: lang === 'en' || currency === 'USD' ? MAX_USD : MAX,
                                                                rtl
                                                            }),
                                                            alignSelf: 'center'
                                                        }}
                                                    >
                                                        {children}
                                                    </div>
                                                </div>
                                            )}
                                            renderThumb={({ index, props, isDragged }) => (
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

                                </div>
                            </div> : null}

                            <div onClick={persona} className={styles.rango_precio}>
                                <i className={'bx bxs-user ' + styles.ico_use}></i> <p>{adultos} {translate('filter.adults')} | {ninos} {translate('filter.kids')}</p>
                            </div>
                            {subMenuPersonas ? <div ref={refsubMenuPersonas} className={styles.sub_menu_persona}>
                                <div className={styles.adulto}>
                                    <p>{translate('filter.adults')}</p>
                                    <div className={styles.calculo}>
                                        <span onClick={() => setAdultos(adultos > 0 ? adultos - 1 : adultos)} className={styles.neg}>-</span>
                                        <span onClick={() => setAdultos(adultos + 1)} className={styles.mas}>+</span>
                                    </div>
                                </div>
                                <div className={styles.ninos}>
                                    <p>{translate('filter.kids')}</p>
                                    <div className={styles.calculo}>
                                        <span onClick={() => setNinos(ninos > 0 ? ninos - 1 : ninos)} className={styles.neg}>-</span>
                                        <span onClick={() => setNinos(ninos + 1)} className={styles.mas}>+</span>
                                    </div>
                                </div>
                            </div> : null}
                            <div>

                            </div>
                        </div>
                        <BtnSearch
                            type={type}
                            selectedPrice={lang === 'en' || currency === 'USD' ? valueUsd : values}
                            adults={adultos}
                            kids={ninos}
                            data={data}
                            hijoAPadre={hijoAPadre}
                            translate={translate}
                            getDollar={getDollar}
                            lang={lang}
                            currency={currency}
                            gaEventTracker={gaEventTracker}
                        />
                    </div>
                {/*</form>*/}

            </div>
        </>
    )
}
export default FiltroPrincipal;
