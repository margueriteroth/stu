import React from 'react';
import classNames from "classnames"
import PropTypes from "prop-types"
import Button from "components/_ui/Button/Button";
import Link from "components/_ui/Link/Link";
import './Recipe.scss'

const Recipe = ({ className }) => {
    return (
        <div className={classNames("Recipe", className)}>
            <div className="Recipe">
                Recipe
            </div>
        </div>
    )
}


Recipe.propTypes = {

}

export default Recipe