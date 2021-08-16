import React, { useState } from 'react';
import MaxWidth from "components/_ui/MaxWidth/MaxWidth";
import Link from "components/_ui/Link/Link";
import Tooltip from "components/_ui/Tooltip/Tooltip";
import './Footer.scss';


const Footer = () => {
    return (
        <div className="Footer__container">
            <MaxWidth size="m" className="Footer">
                <div className="Footer__col">
                    <div className="p-style">
                        Marguerite Roth is an interdisciplinary designer and developer specializing
                        analytics dashboards. With a background in <Tooltip
                            gradientUnderline
                            className="FilterBar__tooltip">
                            print design
                            <div>
                                ack empac
                            </div>
                        </Tooltip>,
                        she now works at the intersection of design, software development, and data visuliazation.
                    </div>
                    <p>
                        Marguerite currently works on the Frontend Engineering
                        team at Parse.ly and WordPress VIP.
                    </p>
                </div>
                <div className="Footer__col">
                    <div className="Footer__links">
                        <Link doOpenInNewTab to="https://github.com/margueriteroth">
                            Github
                        </Link>
                        <Link doOpenInNewTab to="https://www.instagram.com/marguer.ite/">
                            Instagram
                        </Link>
                        <Link doOpenInNewTab to="https://dribbble.com/marrrguerite">
                            Dribbble
                        </Link>
                        <Link to="">
                            Contact
                        </Link>
                    </div>
                </div>
            </MaxWidth>
        </div>
    );
};

Footer.propTypes = {

};

export default Footer;