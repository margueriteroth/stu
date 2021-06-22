import React, { useState, useEffect } from 'react';
import { navigate } from "gatsby";
import PropTypes from "prop-types"
import queryString from 'query-string';
import classNames from "classnames"
import './FilterBar.scss'


const FilterBar = ({ filters, sectionColors, changeQueryParams, parsedQueryParams }) => {


    return (
        <div className="FilterBar">
            <div className="FilterBar__main">
                {filters.map((filter, i) => (
                    <button className={classNames("FilterBar__button", { "FilterBar__button--active": parsedQueryParams.category && parsedQueryParams.category.includes(filter.toLowerCase().split(' ')[0]) })}
                        key={i} onClick={(e) => { changeQueryParams(filter, 'category') }}>
                        {filter}
                    </button>
                ))}
            </div>
            <div className="FilterBar__extra">
                <button className={classNames("FilterBar__button", { "FilterBar__button--active": parsedQueryParams.extra && parsedQueryParams.extra.includes('voronoi') })}
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
