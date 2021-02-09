import React, { useState } from 'react'
// import classNames from "classnames"
// import PropTypes from 'prop-types'
import './Table.scss'

let headers =  [
    "date",
    "movie",
    "genre",
    "rating",
    "",
    "provider",
    "isfirstwatch",
    "cried",
]

const Table = ({ data }) => {
    let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    console.log(headers)

    return (
        <div>
            <div className="TableHeader">
                {headers.map((label, i) => (
                    <div key={i}>
                        {label}
                    </div>
                ))}
            </div>
            {rows.map((row, i) => (
                <TableRow
                    data={data[row]}
                    key={i}
                />
            ))}
        </div>
    );
};

export default Table;

const TableRow = ({ data }) => {
    console.log(data)
    return (
        <div className="TableRow">
            {headers.map((label, i) => (
                <div key={i}>
                    {data[label]}
                </div>
            ))}
        </div>
    );
};
