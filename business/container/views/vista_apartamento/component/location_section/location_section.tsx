import styles from './styles.module.css';
import * as React from "react";
import Mapa from "../../../../../content/shared/mapa/mapa";
import {DevHospedaje} from "../../../../../../service/service";

export default function LocationSection({data, nameApto, translate}:any) {

    return (
        <>
            <Mapa
                translate={translate}
                title={translate('location.title')}
                data={data}
                nameApto={nameApto}
            />
        </>
    )
}
