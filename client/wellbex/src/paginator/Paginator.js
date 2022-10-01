import React from "react";




const Paginator = ({ pages, currentPage, onNextPage, onPrevPage, btnNextDisabled, btnPrevDisabled,
    curPageActive, currentPageNum }) => {

    return (
        <nav aria-label="Page navigation example" >
            <ul className="pagination">
                <li className={`page-item ${btnPrevDisabled}`} onClick={onPrevPage} >
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pages.map(page => (

                    <li className={page === currentPageNum ? `page-item ${curPageActive}` : 'page-item'} key={pages.indexOf(page)} onClick={() => currentPage(page)}> <a className="page-link" href="#">{page}</a></li>)
                )
                }
                <li className={`page-item ${btnNextDisabled}`} onClick={onNextPage} >
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>

            </ul>
        </nav >
    )
}


export default Paginator
