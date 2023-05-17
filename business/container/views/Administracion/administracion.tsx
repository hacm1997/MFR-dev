import Hero from "./component/Hero/hero";
import Experiencia from "./component/experience/experiencia";
import ReviewsSection from "./component/reviewsSection/reviewsSection";
import ContactSection from "./component/ContactSection/contactSection";
export default function Administracion(props:any) {
    return(
        <>
            <Hero translate={props.translate}/>
            <Experiencia translate={props.translate}/>
            <ReviewsSection translate={props.translate}/>
            <div id="form">
                <ContactSection translate={props.translate} lang={props.lang}/>
            </div>

        </>
    )
}
