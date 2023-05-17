import styles from "./styles.module.css";

export default function ItemTestimonio() {
    return (
        <>
            <div className={styles.card}>
                <img src="/images/testimonio/user.jpg" />
                <div className={styles.content}>
                    <h2>Juan Amaya</h2>
                    <p>“Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt”.</p>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                </div>
            </div>
        </>
    )
}