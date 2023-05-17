import styles from "./styles.module.css";
import Title from "./component/title/title";
import BtnContact from "./component/btnContant/btnContact";
import VideoContainer from "./component/videoContainer/videoContainer";
import * as React from "react";

export default function Experiencia(props:any) {

    return (
        <>
            <section className={styles.section}>
                <div className={styles.general_1}>
                    <div className={styles.content}>
                        <Title>
                            {props.translate('section2.titlep1')} <strong>{props.translate('section2.titlep2')}</strong> {props.translate('section2.titlep3')}
                        </Title>
                        <BtnContact name="Contactar" href="#form"/>
                    </div>
                </div>
                <VideoContainer/>
            </section>
        </>
    )
}
