import styles from "./styles.module.css";
import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({changePage, pageCount}:any) {

    return (

        <>
            <div className={styles.paginado}>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={changePage}
                    pageCount={pageCount}
                    previousLabel="<"
                    containerClassName={styles.paginationsBtns}
                    previousClassName={styles.prevBtn}
                    nextClassName={styles.nextBtn}
                    disabledClassName={styles.paginationsDisable}
                    activeClassName={styles.paginationsActive}
                />
            </div>
        </>
    )

}

export default Pagination;
