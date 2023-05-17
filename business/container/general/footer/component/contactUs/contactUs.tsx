import styles from "./styles.module.css";
import Title from "./title/title";
import ItemsContactUs from "./itemsContactUs/itemsContactUs";

export default function ContactUs(props:any) {
    return (
        <>
            <div className="col-md-4">
                <Title title={props.translate('footer.contact.title')}/>
                <ItemsContactUs href="#" icon="bx bx-map" >


                    {props.translate('footer.contact.address2')}
                </ItemsContactUs>
                <ItemsContactUs href="tel:+573012164363"  icon="bx bx-phone" >
                    (+57) 3012164363
                    <br/>
                </ItemsContactUs>

               <ItemsContactUs href="#horario" icon="bx bx-time" >
                   {props.translate('footer.contact.schedule_name')}
                   <br/>
                   {props.translate('footer.contact.schedule_hours')}
               </ItemsContactUs>
            </div>
        </>
    )
}
