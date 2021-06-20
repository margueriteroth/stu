import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import PropTypes from "prop-types"
import queryString from 'query-string';
import classNames from "classnames"
import './FilterBar.scss'

let windowGlobal = typeof window !== 'undefined' && window;
let parsedParams = queryString.parse(windowGlobal.location.search);

const FilterBar = ({ filters, sectionColors, setParsedQueryParams }) => {
    const [filterQuery, setFilterQuery] = useState(parsedParams || '');

    let changeQueryParams = (filter, key) => {
        let value = filter.toLowerCase().split(' ')[0];
        // Using only first word

        let params = { ...filterQuery } || {};

        if (Array.isArray(params[key])) {
            // multiple filter params
            if (params[key].includes(value)) {
                let idx = params[key].indexOf(value);
                params[key].splice(idx, 1);
            } else {
                params[key].push(value);
            }
        } else if (!Array.isArray(params[key])) {
            // one filter param
            if (params[key] == value) {
                params = []
            } else {
                params[key] = [params[key], value];
                console.log(params[key])
            }
        } else {
            params[key] = value;
        }

        setFilterQuery(params)
    }

    useEffect(() => {
        let newParams = queryString.stringify(filterQuery)
        navigate(`/dessert-person/?${newParams}`)
        setParsedQueryParams(filterQuery);
    }, [filterQuery]);

    return (
        <div className="FilterBar">
            <div className="FilterBar__main">
                {filters.map((filter, i) => (
                    <button className={classNames("FilterBar__button", { "FilterBar__button--active": filterQuery.category && filterQuery.category.includes(filter.toLowerCase().split(' ')[0]) })}
                        key={i} onClick={(e) => { changeQueryParams(filter, 'category') }}>
                        {filter}
                    </button>
                ))}
            </div>
            <div className="FilterBar__extra">
                <button className={classNames("FilterBar__button", { "FilterBar__button--active": filterQuery.extra && filterQuery.extra.includes('voronoi') })}
                    onClick={(e) => { changeQueryParams('voronoi', 'extra') }}>
                    Voronoi
                </button>
            </div>
        </div>
    )
}


FilterBar.propTypes = {
    data: PropTypes.array,

}

FilterBar.defaultProps = {

}

export default FilterBar
