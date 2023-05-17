import Image from "next/image";

export default function Logo(props: any) {
    return(
        <>
            <Image width={139} height={139} src={props.img} alt={props.alt} title="Inmobiliaria MFR"/>
        </>
    )
}