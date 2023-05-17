import styles from "./styles.module.css"
import SaveBooking from "../BtnBooking/booking_save";
import Col from 'react-bootstrap/Col';
import {Row} from "react-bootstrap";
import * as React from "react";
import useMouseUp from "../../../../../hooks/useMouseUp";
import {useEffect, useState} from "react";
import Moment from 'moment';

export default function FormReserv(props: any) {
    const [values, setValues] = React.useState({
        nameIn: "",
        dniIn: "",
        emailIn: "",
        cellphoneIn: "",
        descriptionIn: ""
    });
    const [viewButton, setViewButton] = useState(false);

    //Function handle, get de values input's
    const handleChange = async (evt:any) =>{
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value
        });

    }
    const validate = () =>{
        if(!values.nameIn || values.nameIn.length <= 2 ||
            !values.emailIn || values.emailIn.length <=7 ||
            !values.dniIn || values.dniIn.length <=6 ||
            !values.cellphoneIn || values.cellphoneIn.length <= 6){
            setViewButton(false)
        }else{
            setViewButton(true)
        }
    }
    const persona = () => {
        setSubMenuPersonas(!subMenuPersonas)
    }
    const refsubMenuPersonas = React.useRef<HTMLDivElement>(null);
    useMouseUp(refsubMenuPersonas, () => {
        setSubMenuPersonas(false)
    })
    const [subMenuPersonas, setSubMenuPersonas] = useState(false)
    const [adultos, setAdultos] = useState(1)
    const [ninos, setNinos] = useState(0)

    useEffect(() => {
        validate();
    }, [values])

    return (
        <>

            <div className={styles.inputs}>
                <input
                       id="nameIn"
                       name="nameIn"
                       type="text"
                       placeholder={props.translate('form_submit.name')}
                       value={values.nameIn}
                       onChange={handleChange}
                       required
                /><br/>
                <input type="number"
                       id="dniIn"
                       name="dniIn"
                       placeholder={props.translate('form_submit.dni')}
                       value={values.dniIn}
                       onChange={handleChange}
                       required
                /><br/>
                <input type="number" placeholder={props.translate('form_submit.phone')}
                       id="cellphoneIn"
                       name="cellphoneIn"
                       value={values.cellphoneIn}
                       onChange={handleChange}
                       required
                /><br/>
                <input type="email" placeholder={props.translate('form_submit.email')}
                       id="emailIn"
                       name="emailIn"
                       value={values.emailIn}
                       onChange={handleChange}
                       required
                /><br/>
                <Row>
                    <Col xs={6} md={6}>
                        <div className={styles.check_in}>
                            <p><strong>{props.translate('form_submit.arrival')}: </strong> {Moment(props.date[0],'DD/MM/YYYY').format('DD MMMM YYYY')}</p>
                        </div>
                    </Col>
                    <Col xs={6} md={6}>
                        <div className={styles.check_out}>
                            <p><strong>{props.translate('form_submit.exit')}: </strong> {Moment(props.date[1],'DD/MM/YYYY').format('DD MMMM YYYY')}</p>
                        </div>
                    </Col>
                </Row>

                <div onClick={persona} className={styles.cantidad_personas}>
                    <p><strong>{props.translate('form_submit.guests')}: </strong>
                     {props.adultos} {props.translate('form_submit.adults')}
                        | {props.ninos} {props.translate('form_submit.kids')}</p>
                </div>
                <textarea placeholder={props.translate('form_submit.comments')}
                    name="descriptionIn"
                    value={values.descriptionIn}
                    onChange={handleChange}
                >

                </textarea>
            </div>

            {viewButton ?
                <SaveBooking
                nameIn={values.nameIn}
                dniIn={values.dniIn}
                emailIn={values.emailIn}
                phoneIn={values.cellphoneIn}
                adultosIn={props.adultos}
                ninosIn={props.ninos}
                titleIn={props.title}
                priceIn={props.price}
                codeIn={props.code}
                descriptionIn={values.descriptionIn}
                dates={props.date}
                loc={props.loc}
                currency={props.currency}
                translate={props.translate}
                gaEventTracker={props.gaEventTracker}
                accessToken={props.accessToken}
                // idCalendar={props.idCalendar}
                />
                :<div className={styles.validate}>
                    <h4>{props.translate('form_submit.validation')}</h4>
                </div>
            }

        </>
    )
}
