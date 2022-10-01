import React, { useState } from "react";
import "./search.css"
const SearchForm = ({ onSearch, minMaxFilter }) => {
    const [searchValue, setSearchValue] = useState("")
    return (<>
        <div className="input-group mb-3 mt-3">
            <input type="text" className="form-control" aria-label="Text input with segmented dropdown button"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    onSearch(searchValue)
                }}
            />
            <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary"
                    onClick={() => { onSearch(searchValue) }}
                >Поиск</button>


            </div>
        </div >

    </>
    )
}

export default SearchForm