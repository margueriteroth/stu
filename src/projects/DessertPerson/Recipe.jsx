import React from 'react';
import classNames from "classnames"
import PropTypes from "prop-types"
import Button from "components/_ui/Button/Button";
import Link from "components/_ui/Link/Link";
import './Recipe.scss'

const Recipe = ({ className, currentLockedData }) => {
    let { recipe, difficulty, page, section, minutes } = {...currentLockedData}


    return (
        <div className={classNames("Recipe", className)}>
            <div className="Recipe__header">
                <div className="Recipe__title">
                    {recipe}
                </div>
                <div className="Recipe__section">
                    {section}
                </div>
            </div>
            <div className="Recipe__info">
                <div className="Recipe__time">
                   {minutes}
                </div>
                <div className="Recipe__page">
                    p.{page}
                </div>
            </div>
            <div className="Recipe__scrape">
                Youtube infos mby
            </div>
        </div>
    )
}


Recipe.propTypes = {

}

export default Recipe