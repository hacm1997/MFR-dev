import styles from "./styles.module.css";

export default function SearchBooking(props: any) {

    const handleChange = (e:any) => {
        // console.log("search => ",e.target.value)
        props.setSearch(e.target.value);
        filter(e.target.value);
    }

    const filter=(finishSearch:any)=>{
        const result=props.dataJson.filter((element:any)=>{
            const detailBooked = JSON.parse(element._props.bookingDetails);
            // console.log(detailBooked)
            if(element._props.resource.code.toString().toLowerCase().includes(finishSearch.toLowerCase())
                || element._props.booker._id.toString().toLowerCase().includes(finishSearch.toLowerCase())
                || element._props.booker._cellphone.toString().toLowerCase().includes(finishSearch.toLowerCase())
                || element._props.code.toString().toLowerCase().includes(finishSearch.toLowerCase())
                || detailBooked.price.toString().toLowerCase().includes(finishSearch.toLowerCase())){
                return element;
            }
        })
        props.setDataFilter(result);
    }

    return (
        <>
            <div className={styles.search}>
                <div className={styles.search_input}>
                    <input onChange={handleChange} value={props.search} placeholder="Búsqueda por nombre, ubicación y precio mayor que..."/>
                    <button><i className='bx bx-search'></i></button>
                </div>
            </div>
        </>
    )
}
