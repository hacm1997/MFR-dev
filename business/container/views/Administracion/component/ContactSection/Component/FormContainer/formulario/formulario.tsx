import styles from "./styles.module.css";
import ItemInput from "./itenImput/itemInput";
import BtnSend from "../btnSend/btnSend";
import {useState} from "react";

export default function Formulario(props:any){
    const [form, setForm] = useState({name:'',email:'',phone:''});
    const wspSpa = `https://api.whatsapp.com/send?phone=573012164363&text=Hola%20MFR%20%F0%9F%92%9C%E2%9C%A8%2C%20vengo%20de%20su%20sitio%20web.%20Quisiera%20obtener%20m%C3%A1s%20informaci%C3%B3n%2Cmi%20nombre%20es%3A%20${form.name}%2C%20Celular%20${form.phone}%20mi%20correo%20es%20${form.email}`
    const wspEng = `https://api.whatsapp.com/send?phone=573012164363&text=Hello%20MFR%20%F0%9F%92%9C%E2%9C%A8%2C%20I%20come%20from%20your%20website.%20I%20would%20like%20more%20information%2C%20my%20name%20is%3A%20${form.name}%2C%20cell%20${form.phone}%20and%20my%20email%20is%20${form.email}`

    const handlerForm = async (e:any) => {
        const value = e.target.value;
        setForm({
            ...form,
            [e.target.name] : value
        })
    }

    return(
        <>

                <div className={styles.form_group}>
                    <ItemInput placeholder={props.translate('form.row2.name')} name="name" onChange={handlerForm}/>
                    <ItemInput placeholder={props.translate('form.row2.email')} name="email" onChange={handlerForm}/>
                    <ItemInput placeholder={props.translate('form.row2.cel')} name="phone" onChange={handlerForm}/>
                </div>

            <BtnSend translate={props.translate} name="Enviar" href={props.lang === 'es' ? wspSpa : wspEng} target="_blank"/>

        </>
    )
}
