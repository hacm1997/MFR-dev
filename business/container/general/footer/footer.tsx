import styles from "./footer.module.css";
import Link from "next/link";
import AboutUs from "./component/aboutUs/aboutUs";
import ContactUs from "./component/contactUs/contactUs";
import SocialMedia from "./component/socialMedia/socialMedia";
import useTranslation from "next-translate/useTranslation";

export default function Footer({constants}: any) {
    const {t, lang} = useTranslation('common');

    return (
        <>
            <section className={styles.footer}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <AboutUs translate={t}/>
                        <ContactUs translate={t}/>
                        <SocialMedia/>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <br/>
                            <p className={styles.desarrollado}>
                                {t('footer.develop.text')}{" "}
                                <Link
                                    href="https://kru360.com/?utm_source=Pagina+web&utm_medium=Clic&utm_campaign=mfr&utm_id=mfr"
                                    passHref>
                                    <a className={styles.kru}
                                       target="_blank" title="KRU 360">
                                        KRU 🚀
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
