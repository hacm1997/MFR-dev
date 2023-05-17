import styles from "./styles.module.css";
import Title from "./title/title";

export default function Header(){
    return(
        <>
            <div className={styles.general}>
                <Title>
                    Tu nuevo <strong>apartamento</strong> <span>te espera</span>
                </Title>
            </div>
        </>
    )
}