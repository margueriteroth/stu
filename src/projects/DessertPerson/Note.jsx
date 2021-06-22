import React, { useState, useEffect } from 'react';
import { navigate } from "gatsby";
import PropTypes from "prop-types"
import classNames from "classnames"
import Button from "components/_ui/Button/Button";
import Link from "components/_ui/Link/Link";
import './Note.scss'

const Note = ({ agreeToSeen }) => {
    return (
        <div className="DessertPersonNote__container">
            <div className="DessertPersonNote">
                <h1>
                    Hello! Quick note <span>:)</span>
                </h1>
                <h2>
                    The <i>Dessert Person</i> cookbook is created by Claire Saffitz and designed by Mia Johnson.
                </h2>
                <h4 className="DessertPersonNote__links">
                    <Link to="https://www.dessertperson.com/" doOpenInNewTab>
                        <i>Dessert Person</i> Site &#8594;
                    </Link>
                    <Link to="https://www.miaajohnson.com/" doOpenInNewTab>
                        Mia Johnson Site &#8594;
                    </Link>
                </h4>
                <h4>
                    I did not design this original scatter plot and have no affiliations with <i>Dessert Person</i> or
                    its design.
                    <br/>
                    <br/>
                    This chart appears at the beginning of the cookbook, showcasing the relationships
                    between recipe difficulty and recipe time.
                </h4>

                <Button onClick={agreeToSeen} color={'white'} className="DessertPersonNote__button">
                    Got it!
                </Button>
                <div className="DessertPersonNote__mute">
                    And mute note for 15 days
                </div>
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