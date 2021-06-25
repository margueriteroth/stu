import React from 'react';
import classNames from "classnames"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faBook } from '@fortawesome/free-solid-svg-icons'
import Button from "components/_ui/Button/Button";
import Link from "components/_ui/Link/Link";
import './Recipe.scss'

const Recipe = ({ className, currentLockedData }) => {
    let { recipe, difficulty, page, section, minutes } = { ...currentLockedData }


    return (
        <div className={classNames("Recipe", className)}>
            <div className="Recipe__header">
                <h3 className="Recipe__title">
                    {recipe}
                </h3>
                <div className="Recipe__section">
                    {section}
                </div>
            </div>
            <div className="Recipe__info">
                <div className="Recipe__time">
                    <FontAwesomeIcon className="Recipe__icon" icon={faClock} /> {minutes}
                </div>
                <div className="Recipe__page">
                    <FontAwesomeIcon className="Recipe__icon" icon={faBook} /> p.{page}
                </div>
            </div>
            <p className="Recipe__scrape">
                Claire Saffitz Makes Rhubarb Cake | Dessert Person
                Let me tell you a story about rhubarb. It’s a vegetable -- a stalk more specifically -- that grows every spring and has a piercing tart flavor and pretty ruby red hue. Some people don’t like the flavor, but those people don’t get what a special flavor and texture it has! In this rhubarb cake, Claire uses it three ways -- placed in decorative rows on top, cooked down into mush and incorporated into the batter, and chopped and folded into the cake. It’s a celebration of rhubarb, a harbinger of warm weather and an inspiration to dessert people everywhere.

                #ClaireSaffitz​​ #Baking​​ #Cake

                Rhubarb Cake
                Special Equipment:
                4 1/2 x 8 1/2 inch loaf pan, measured from the top
            </p>
        </div>
    )
}


Recipe.propTypes = {

}

export default Recipe