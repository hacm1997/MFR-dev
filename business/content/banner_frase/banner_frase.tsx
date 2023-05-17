import styles from "./styles.module.css"

export default function BannerFrase({children}: any) {
    return (
        <>
            <div className={styles.general}>
                {children}
            </div>

        </>
    )
}