import React from "react";
import styles from "./styles.module.css";
import Badge from "./badge/badge";
import Coin from "./coin/coin";
import NavBarItems from "./navbar_items/items";
import Language from "./language/language";

export default class Navbar extends React.Component<any, any> {
    render() {
        return (
            <>
                <nav className={"navbar navbar-expand-lg " + styles.navbar_general}>
                    <div className={"container " + styles.container}>
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <Badge image={"/images/logos/logo-inmobiliaria-mfr.jpg"} />
                        <div className={styles.currency}>
                            <Coin
                                coin1={"COP"}
                                flag1={"/images/banderas/colombia.png"}
                                coin2={"USD"}
                                flag2={"/images/banderas/estados-unidos.png"}
                            />
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <i className='bx bx-menu'></i>
                        </button>
                        <div className={"collapse navbar-collapse " + styles.right_navbar} id="navbarNav">
                            <NavBarItems
                                item1={"Hospedaje"}
                                item2={"Compra"}
                                item3={"Administración"}
                            />
                            <Language
                                lang1={"ESP"}
                                lang2={"ENG"}
                            />
                        </div>


                    </div>
                </nav>
            </>
        );
    }
}
