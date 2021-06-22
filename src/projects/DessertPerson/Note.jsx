import React, { useState, useEffect } from 'react';
import { navigate } from "gatsby";
import PropTypes from "prop-types"
import classNames from "classnames"
import Link from "components/_ui/Link/Link";
import './Note.scss'

const Note = ({ }) => {
    return (
        <div className="DessertPersonNote__container">
            <div className="DessertPersonNote">
                <h1>
                    Hello! Quick note <span>:)</span>
                </h1>
                <h2>
                    <i>Dessert Person</i> is created by Claire Saffitz and designed by Mia Johnson.
                </h2>
                <h4>
                    I did not design this original scatter plot and have no affiliations with <i>Dessert Person</i> or
                    its design. [maybe write how this noodle came to be? in a sentence or two]
                </h4>
                <h4 className="DessertPersonNote__links">
                    <Link to="https://www.dessertperson.com/" doOpenInNewTab>
                        <i>Dessert Person</i> Site &#8594;
                    </Link>
                    <Link to="https://www.miaajohnson.com/" doOpenInNewTab>
                        Mia Johnson Site &#8594;
                    </Link>
                </h4>
                <Link to={`/dessert-person/`} isButton buttonProps={{ color: 'white' }} className="DessertPersonNote__button">
                    Got it!
                </Link>
            </div>
        </div>
    )
}


Note.propTypes = {
    data: PropTypes.array,
}

Note.defaultProps = {
}

export default Note