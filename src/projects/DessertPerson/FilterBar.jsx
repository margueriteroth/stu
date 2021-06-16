import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import PropTypes from "prop-types"
import queryString from 'query-string';
import classNames from "classnames"
import './FilterBar.scss'

let windowGlobal = typeof window !== 'undefined' && window;
let parsedParams = queryString.parse(windowGlobal.location.search);

const FilterBar = ({ filters, sectionColors }) => {
    const [filterQuery, setFilterQuery] = useState(parsedParams || '');

    const onChange = (event) => {
        let value = event.target.value;
        let params = { ...filterQuery } || {};
        let isCategoryString = (typeof params.category == 'string') ? true : false;
        let isCategoryArray = (Array.isArray(params.category)) ? true : false;

        if (isCategoryArray) {
            // Aka multiple filter params
            if (params.category.indexOf(value) > -1) {
                let idx = params.category.indexOf(value)
                params.category.splice(idx, 1);
            } else {
                params.category.push(value);
            }
        } else if (isCategoryString) {
            // Aka only one filter param
            if (params.category == value) {
                params = {}
            } else {
                params = { category: [params.category, value] }
            }
        } else {
            params = { category: value }
        }

        setFilterQuery(params)
    };

    let changeQueryParams = (filter) => {
        let value = filter.toLowerCase();
        let params = { ...filterQuery } || {};
        let isCategoryString = (typeof params.category == 'string') ? true : false;
        let isCategoryArray = (Array.isArray(params.category)) ? true : false;

        if (isCategoryArray) {
            // Aka multiple filter params
            if (params.category.indexOf(value) > -1) {
                let idx = params.category.indexOf(value)
                params.category.splice(idx, 1);
            } else {
                params.category.push(value);
            }
        } else if (isCategoryString) {
            // Aka only one filter param
            if (params.category == value) {
                params = {}
            } else {
                params = { category: [params.category, value] }
            }
        } else {
            params = { category: value }
        }

        setFilterQuery(params)
    }

    useEffect(() => {
        let newParams = queryString.stringify(filterQuery)
        navigate(`/dessert-person/?${newParams}`)
    }, [filterQuery]);

    return (
        <div className="FilterBar">
            <div className="FilterBar__main">
                {filters.map((filter, i) => (
                    <button className={classNames("FilterBar__button", { "FilterBar__button--active": filterQuery.category && filterQuery.category.includes(filter.toLowerCase()) })}
                        key={i} onClick={(e) => { changeQueryParams(filter) }}>
                        { filter}
                    </button>
                ))}
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
