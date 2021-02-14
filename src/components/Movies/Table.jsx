import React, { useState } from 'react'
import classNames from "classnames"
import * as d3 from "d3"
// import PropTypes from 'prop-types'
import './Table.scss'

let headers = [
    "date",
    "title",
    "genre",
    "rating",
    "rewatch",
]

const formatDates = d3.timeFormat("%M, %D")

const Table = ({ data, ...props }) => {
    return (
        <div className="Table">
            <div className="TableHeader">
                {headers.map((label, i) => (
                    <div key={i}>
                        {label}
                    </div>
                ))}
            </div>

            {Object.keys(data).reverse().map((row, i) => (
                <TableRow
                    data={data[row]}
                    key={i}
                    props={props}
                />
            ))}
        </div>
    );
};

export default Table;

const TableRow = ({ data, order, props }) => {
    //let genreColor = props.colorGenres[data[label]];

    let getGenreColor = d => props.colorGenres[data[d]];

    return (
        <div className="TableRow">
            {headers.map((label, i) => (
                <>
                    {label == 'date' ? (
                        <div key={i}>
                            <div className={classNames("TableItem", `TableItem--${label}`,)}>
                                {data[label]}
                            </div>
                        </div>
                    ) : label == 'genre' ? (
                        <div key={i} className="TableLabel label-tab">
                            <div
                                style={{
                                    background: `${getGenreColor(label)}`
                                }}
                                className="TableLabel__plate"></div>
                            <div
                                style={{
                                    color: `${getGenreColor(label)}`
                                }}
                                className={classNames("TableLabel__genre", `TableLabel__genre-${data[label]}`)}>
                                {data[label]}
                            </div>
                        </div>
                    ) : (
                        <div key={i}>
                            <div
                                style={{
                                    background: `${props.colorGenres[data[label]]}`
                                }}
                                className={classNames("TableItem", `TableItem--${label}`, (
                                    label.indexOf('genre') > -1 ? `label-tab TableItem--genre-${data[label]}` : ""
                                ))}>
                                {data[label]}
                            </div>
                        </div>
                    )}
                </>
            ))}
        </div>
    );
};
