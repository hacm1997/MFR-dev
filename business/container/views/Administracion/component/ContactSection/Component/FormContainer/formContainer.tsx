import styles from "./styles.module.css";
import Title from "./title/title";
import Formulario from "./formulario/formulario";
import * as React from "react";

export default function FormContainer(props:any) {
    return (
        <>
            <div className={styles.container_form} id='#form'>
                <div className={styles.card_form}>

                    <Title title={props.translate('form.row2.title')}
                           content={props.translate('form.row2.content')}/>
                    <Formulario translate={props.translate} lang={props.lang}/>
                </div>
            </div>
        </>
    )
}
