import styles from "./styles.module.css";
import ItenImput from "./itemInput/itenImput";
import {useState} from "react";

export default function FormSaleCard(props: any) {
    const [form, setForm] = useState({
        name:'',
        phone:'',
        email:''
    })

    const handleForm = async (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const sendLink = `https://api.whatsapp.com/send?phone=573158805685&text=Hola%20MFR!%%20Vengo%20de%20su%20sitio%20web.🌐%0AEstoy%20interesado%20en%20la%20compra💲del%20${props.name}.%0A%0AMis%20datos%20son%3A%0ANombre%3A%20${form.name}%0ATeléfono%3A%20${form.phone}%0AEmail%3A%20${form.email}%0A%0AMe%20gustaría%20tener%20mayor%20información.%20Gracias😊.`
    const sendLinkEng = `https://api.whatsapp.com/send?phone=573012164363&text=Hello%20MFR👋.%20I%20come%20from%20your%20website.%20I%20am%20interested%20in%20buying%20Apartment%20728.%20%0AMy%20information%20is%3A%20%0AName%3A%20${form.name}%20%0ATelephone%3A%20${form.phone}%20%0AEmail%3A%20${form.email}%20%0AI%20would%20like%20more%20information.%20Thank%20you.`
    return (
        <>
            <form className={styles.form}>
                <div className={styles.group_form}>
                    <ItenImput type="text" onChange={handleForm} name="name" placeholder={props.translate('for_buy.form.inputs.name')}/>
                    <ItenImput type="number" onChange={handleForm} name="phone" placeholder={props.translate('for_buy.form.inputs.phone')}/>
                    <ItenImput type="email" onChange={handleForm} name="email" placeholder={props.translate('for_buy.form.inputs.email')}/>
                </div>

                <a href={props.lang === 'en' ? sendLinkEng : sendLink} target="_blank" rel="noreferrer">
                    <button type="button" disabled={!(form.name !== '' && form.email !== '' && form.phone !== '')}
                            className={styles.btn}>{props.translate('for_buy.form.inputs.button')}</button>
                </a>
            </form>
        </>
    )
}
