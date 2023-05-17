import styles from "./styles.module.css"
import ItemMenu from "./itemMenu/itemMenu";
import Logo from "./logo/logo";
import React from "react";
import Link from "next/link";
import {useCookies} from "react-cookie";

class MenuLeft extends React.Component {

    state = {
        menu: styles.menuLeftGeneral,
        icon: "bx bxs-chevron-right-circle"
    }

    menuLeftGeneral = () => {
        let menu = styles.menuLeftGeneral;
        let icon = "bx bxs-chevron-right-circle";
        menu !== this.state.menu ? this.setState({menu: menu}) : this.setState({menu: styles.menuLeftGeneralActive});
        icon !== this.state.icon ? this.setState({icon: icon}) : this.setState({icon: "bx bxs-chevron-left-circle"});
    }


    render() {
        const {menu} = this.state;
        const {icon} = this.state;
        return (
            <>
                <div className={menu}>
                    <div className={styles.logo}>
                        <Link href="/dashboard">
                            <a>
                                <Logo/>
                                <span className={styles.title}>MFR</span>
                            </a>
                        </Link>

                    </div>
                    <hr className={styles.hr}/>
                    <div onClick={this.menuLeftGeneral} className={styles.abrir}>
                        <i className={icon}></i>
                    </div>

                    <div className={styles.menu}>
                        <ItemMenu href="/dashboard">
                            <i className='bx bxs-building-house'></i> <span>Apartamentos</span>
                        </ItemMenu>
                        <ItemMenu href="/dashboard/calendar">
                            <i className='bx bx-calendar'></i> <span>Calendario</span>
                        </ItemMenu>
                        <ItemMenu href="/dashboard/booking">
                            <i className='bx bx-book-content'> </i> <span>Reservas</span>
                        </ItemMenu>

                    </div>

                    <div className={styles.go_to}>

                        <ItemMenu href="/login">
                            <i className='bx bxs-chevron-left-square'></i> <span>Salir</span>
                        </ItemMenu>

                    </div>
                </div>
            </>
        )
    }
}

export default MenuLeft;
