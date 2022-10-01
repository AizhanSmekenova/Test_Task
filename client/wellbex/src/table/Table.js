import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "../arrows/Arrows";



const Table = ({ data, sortData, isSortedByAsc, sortNumData, onSearch }) => {

    const [fieldData, setField] = useState('');
    const Arrow = () => {
        return isSortedByAsc ? <ArrowDown /> : <ArrowUp />
    }
    const fieldSortData = (field) => {
        if (field === "name") {
            sortData(field);
            setField(field)
        }

        else {
            sortNumData(field);
            setField(field);
        }
    }
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Дата</th>
                    <th onClick={() => fieldSortData("name")} scope="col">
                        Название
                        {fieldData === "name" ? < Arrow /> : null}

                    </th>
                    <th onClick={() => fieldSortData("qty")} scope="col">Количество
                        {fieldData === "qty" ? < Arrow /> : null}</th>
                    <th onClick={() => fieldSortData("distance")} scope="col">Расстояние
                        {fieldData === "distance" ? < Arrow /> : null}</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{item.distance}</td>
                    </tr>
                ))}

            </tbody>

        </table >
    )
}


export default Table;