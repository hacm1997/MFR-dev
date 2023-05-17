import styles from "./styles.module.css";
import Mapa from "../../../content/shared/mapa/mapa";
import Header from "./cardRoom/header/header"
import Collage from "./Collage/collage";
import BodyCardSale from "./bodyCardSale/bodyCardSale";
import {useRouter} from "next/router";
import {getResource} from "../../../../service/api/api";
import {useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import useTranslation from "next-translate/useTranslation";

export default function ComprarApartamento() {
    const router = useRouter();
    const {t, lang} = useTranslation('details');
    const [dataApto, setDataApto] = useState([]);
    const cookies = new Cookies();
    const [chars, setChars] = useState([]);
    const {
        query: { code },
    } = router

    function getResoruceCode(code: string) {
        getResource(code)
            .then((response: any) => {
                setDataApto(
                    response.data.data[0],
                );
                setChars(response.data.data[0].characteristics)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    useEffect(() => {
        // @ts-ignore
        getResoruceCode(code.toString())
    }, []);

    return (
        <>
            <section className={styles.section}>
                <Header data={dataApto} chars={chars} href="#" translate={t}/>
                <Collage chars={chars} translate={t}/>
                <BodyCardSale chars={chars} resource={dataApto} translate={t} lang={lang}/>
            </section>
            <Mapa data={chars} title={t('location.title')} translate={t}/>

        </>
    )
}
