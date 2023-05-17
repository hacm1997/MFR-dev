import styles from "./styles.module.css";
import {useState} from "react";
import Image from "next/image";

export default function Experiencia() {
    //mostrar ejeX  y ejeY del div del id "experiencia" y borrarlo
    const [ejeX, setEjeX] = useState(0);
    const [ejeY, setEjeY] = useState(0);

    const handleMouseMove = (e: any) => {
        const {offsetX, offsetY} = e.nativeEvent;
        setEjeX(offsetX);
        setEjeY(offsetY);
    }

    const estilo = {

        left: ejeX - 50,
        top: ejeY - 50
    }
    return(
        <>
            <div className={styles.video}>
                <a title="Video">
                    <div onMouseMove={handleMouseMove} className={styles.espejo}>

                    </div>
                </a>
                {/*<a style={estilo} data-aos="zoom-in-up" className={styles.imgPlay}*/}
                {/*   href="#" title="Play button">*/}
                {/*    <Image width={98} height={103} src="/images/Play-buttom.png" alt="Boton play" title="Boton play"/>*/}
                {/*</a>*/}
            </div>
        </>
    )
}
