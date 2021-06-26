import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import classNames from "classnames";
import PropTypes from "prop-types";

import './FilterBar.scss'

const FilterBar = ({ className, filters, sectionColors, changeQueryParams, parsedQueryParams }) => {
    const [shouldShowChapters, setShouldShowChapters] = useState(true)
    const [shouldShowExtra, setShouldShowExtra] = useState(true)
    const [shouldShowColors, setShouldShowColors] = useState(false)

    let toggleColors = () => {
        changeQueryParams('colors', 'extra')
    }

    useEffect(() => {
        if (parsedQueryParams.extra && parsedQueryParams.extra.includes("colors")) {
            setShouldShowColors(true)
        } else {
            setShouldShowColors(false)
        }
    }, [parsedQueryParams])

    return (
        <div className={classNames("FilterBar", className)}>
            <div className="FilterBar__controls">
                <div className="FilterBar__controls--chapters">
                    <button className="FilterBar__toggle" onClick={() => setShouldShowChapters(!shouldShowChapters)}>
                        Chapters
                        <div className="FilterBar__toggle__icon">
                            {shouldShowChapters ? "—" : "+"}
                        </div>
                    </button>
                    <div className="FilterBar__switch__container">
                        Chapter colors
                        <label className="FilterBar__switch">
                            <input type="checkbox" value={shouldShowColors} className="checked" onChange={() => toggleColors()}
                                checked={shouldShowColors} />
                            <div className="FilterBar__slider round"></div>
                        </label>
                    </div>

                </div>
                <button className="FilterBar__toggle" onClick={() => setShouldShowExtra(!shouldShowExtra)}>
                    Extra
                    <div className="FilterBar__toggle__icon">
                        {shouldShowExtra ? "—" : "+"}
                    </div>
                </button>
            </div>
            <div className="FilterBar__content">
                <div className="FilterBar__main">
                    {shouldShowChapters && (
                        <>
                            {filters.map((filter, i) => (
                                <button className={classNames("FilterBar__button", { "FilterBar__button--active": parsedQueryParams.category && parsedQueryParams.category.includes(filter.toLowerCase().split(' ')[0]) })}
                                    key={i} onClick={(e) => { changeQueryParams(filter, 'category') }}>
                                    <div className="FilterBar__button__dot" style={{ background: sectionColors[i] }}></div>
                                    <div>
                                        {filter}
                                    </div>
                                </button>
                            ))}
                        </>
                    )}
                </div>
                <div className="FilterBar__extra">
                    {shouldShowExtra && (
                        <button className={classNames("FilterBar__button", { "FilterBar__button--active": parsedQueryParams.extra && parsedQueryParams.extra.includes('voronoi') })}
                            onClick={(e) => { changeQueryParams('voronoi', 'extra') }}>
                            Voronoi
                        </button>
                    )}
                </div>
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
