import styles from "./styles.module.css";
import {CancelBooked} from "../../../../service/notifier";

export default function SaveButton(props:any){

    const save = () => {
        CancelBooked(props.formData, props.translate)
    }
    return(
        <>
            <div className={styles.saveButton}>
                <button type="button" onClick={save}>{props.translate('cancel.form.button')}</button>
            </div>
        </>
    )
}
