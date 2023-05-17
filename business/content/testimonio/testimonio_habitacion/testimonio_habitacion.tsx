import styles from "./styles.module.css";

export default function Testimonio_Habitacion(props:any) {

    return (
        <>
            <div className={styles.card}>
                {/*<div className={styles.container_img}>*/}
                {/*    <img src="/images/testimonio/user-apartamento.jpg" alt="Default Profile" title="Default Profile"/>*/}
                {/*</div>*/}
                <div className={styles.content}>
                    <h2>{props.item.name}</h2>
                    <p>“{props.item.comment}”.</p>
                    <div className={styles.star}>
                        <i className='bx bxs-star'></i>
                        <i className='bx bxs-star'></i>
                        <i className='bx bxs-star'></i>
                        <i className='bx bxs-star'></i>
                        <i className='bx bxs-star'></i>
                    </div>
                </div>
            </div>
        </>
    )
}
