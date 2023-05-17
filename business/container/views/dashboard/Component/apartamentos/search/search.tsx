import styles from "./styles.module.css";

export default function Search(props: any) {

    const handleChange = (e:any) => {

        props.setSearch(e.target.value);
        filter(e.target.value);
    }

    const filter=(finishSearch:any)=>{
        const result=props.dataJson.filter((element:any)=>{
            if(element.name.toString().toLowerCase().includes(finishSearch.toLowerCase())
                || element.owner.toString().toLowerCase().includes(finishSearch.toLowerCase())
                || element.characteristics.filter(((char: any) => char.code === 'location')).map((obj: any) => obj.value).toString().toLowerCase().includes(finishSearch.toLowerCase())
                || element.characteristics.filter(((char: any) => char.code === 'price')).map((obj: any) => Number(obj.value)) >= Number(finishSearch)){
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
