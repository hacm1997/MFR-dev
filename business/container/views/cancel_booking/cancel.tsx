import styles from './styles.module.css'
import {useState} from "react";
import SaveButton from "./saveButton";
import useTranslation from "next-translate/useTranslation";

export default function CancelBooking(){
    const {t, lang} = useTranslation('notifications');

    const [dataForm, setDataForm] = useState<any>({
        email:process.env.NEXT_PUBLIC_MAILER_SENDER as string,
    })

    const handleForm = async (e: any) => {
        const value = e.target.value;
        setDataForm({...dataForm, [e.target.name]: value});
    }

    return(
        <>
            <div className={styles.general}>
                <div className={styles.content}>
                    <div className={styles.align_content}>

                        <h1>{t('cancel.title')} <br/>{t('cancel.title2')}</h1>

                        <div>
                            <input type="text" name="code" placeholder={t('cancel.form.code_booking')} onChange={handleForm}/>
                        </div>
                        <div className={styles.date}>
                            <label>{t('cancel.form.date')}</label>
                            <input type="date" name="date_from" onChange={handleForm}/>
                        </div>
                        <div>
                            <input type="number" name="dni" placeholder={t('cancel.form.dni')} onChange={handleForm}/>
                        </div>
                        <div>
                            <input type="text" name="name" placeholder={t('cancel.form.full_name')} onChange={handleForm}/>
                        </div>
                        <div>
                            <input type="email" name="email_user" placeholder={t('cancel.form.email')} onChange={handleForm}/>
                        </div>
                        <div>
                            <input type="number" name="phone" placeholder={t('cancel.form.phone')} onChange={handleForm}/>
                        </div>
                        <SaveButton formData={dataForm} translate={t}/>
                    </div>
                </div>
            </div>
        </>
    )
}
