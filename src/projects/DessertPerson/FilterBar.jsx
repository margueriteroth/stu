import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import Link from "components/_ui/Link/Link";
import Tooltip from "components/_ui/Tooltip/Tooltip";
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
                                <button className={classNames("FilterBar__button", { "FilterBar__button--active": parsedQueryParams.chapter && parsedQueryParams.chapter.includes(filter.toLowerCase().split(' ')[0]) })}
                                    key={i} onClick={(e) => { changeQueryParams(filter, 'chapter') }}>
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
                        <div className="FilterBar__item">
                            <button className={classNames("FilterBar__button", { "FilterBar__button--active": parsedQueryParams.extra && parsedQueryParams.extra.includes('voronoi') })}
                                onClick={(e) => { changeQueryParams('voronoi', 'extra') }}>
                                Voronoi Diagram
                            </button>
                            <Tooltip className="FilterBar__tooltip">
                                <FontAwesomeIcon className="FilterBar__item__icon" icon={faQuestionCircle} />
                                <div>
                                    <Link doOpenInNewTab to="https://en.wikipedia.org/wiki/Voronoi_diagram">From wikipedia:</Link>
                                    <p>
                                        A Voronoi diagram is a partition of a plane into
                                        regions close to each of a given set of objects.
                                    </p>
                                    <p>
                                        I'm using this figure out the tooltip data!
                                    </p>
                                    <p>
                                        <Link doOpenInNewTab to="https://github.com/d3/d3-voronoi">d3-voronoi</Link>
                                    </p>
                                </div>
                            </Tooltip>
                        </div>
                    )}
                </div>
            </div>


        </div >
    )
}


FilterBar.propTypes = {
    data: PropTypes.array,

}

FilterBar.defaultProps = {

}

export default FilterBar
