import React from 'react';
import MaxWidth from "components/_ui/MaxWidth/MaxWidth";
import Link from "components/_ui/Link/Link";
import Logo from "components/_ui/Logo/Logo";
import './Header.scss';


const Header = () => {
    return (
        <div className="Header__container">
            <MaxWidth size="m" className="Header">
                <Link className="Header__logo" to="/">
                    <Logo />
                </Link>
            </MaxWidth>
        </div>
    );
};

Header.propTypes = {

};

export default Header;