import styles from "./styles.module.css";
import {useEffect, useState} from "react";
import {getAllBooking} from "../../../../../../service/api/api";
import ListBooking from "./listBooking/list_booking";
import SearchBooking from "./search/search";

export default function Booking() {
    const [dataBooking, setDataBooking] = useState([]);
    const [search, setSearch] = useState("");
    const [dataFilter, setDataFilter] = useState<any>(dataBooking);

    const getBooking = () => {
        getAllBooking()
            .then((response: any) => {
                // console.log(response.data.data);
                setDataBooking(response.data.data)
            })

            .catch((e: Error) => {
                console.log(e);
        });
    };

    // console.log("data filter => ",dataFilter)

    useEffect(()=>{
        setDataFilter(dataBooking)
    }, [dataBooking])
    // console.log(dataBooking)
    useEffect(()=>{
        getBooking();
    }, []);

    return (
        <>
            <section className={styles.section}>
                <div className={styles.abrir}>
                    <SearchBooking earch={search} setSearch={setSearch} dataJson={dataBooking} setDataFilter={setDataFilter}/>
                </div>

                <div className={styles.general_apartamentos}>
                    <ListBooking data={dataFilter}/>
                </div>

            </section>
        </>
    )
}
