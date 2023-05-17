import styles from "../../footer.module.css";
import Logo from "./Logo/logo";
import Title from "./title/title";
import Content from "./content/content";

export default function AboutUs(props: any) {
    return (
        <>
            <div className="col-md-4">
                <Logo img="/images/logos/logo-mfr-footer.png" alt="Logo | MFR"/>
                <br/>
                <Title title={props.translate('footer.about.title')}/>
                <div className={styles.contentFooter}>

                    <div>
                        <Content
                            content={props.translate('footer.about.description')}/>
                    </div>


                </div>
            </div>
        </>
    )
}
