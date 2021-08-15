import React from "react"
import classNames from "classnames"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter, faDribbble } from '@fortawesome/free-brands-svg-icons'
import Link from "components/_ui/Link/Link"
import "./PageAuthor.scss";

const PageAuthor = ({ postLocation, className }) => {
    return (
        <StaticQuery
            query={graphql`
                query HEADSHOT_QUERY {
                    headshot: file(relativePath: { regex: "/marg-oscar-01.jpg/" }) {
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            `}
            render={data => (
                <div className={classNames("PageAuthor", `PageAuthor--${postLocation}`, className)}>
                    <div className="PageAuthor__image__container">
                        {/* <Img fluid={data.headshot.childImageSharp.fluid} className="PageAuthor__image"/> */}
                    </div>
                    <div className="PageAuthor__info">
                        <h4 className="PageAuthor__info__title">
                            About Marguerite
                        </h4>
                        <div className="PageAuthor__info__description">
                            Marguerite Roth is an interdisciplinary designer and developer specializing
                            in the creation of analytics dashboards. With a background in print design,
                            she now works at the intersection of design, software dev, and data visuliazation.

                            Marguerite currently works on the Frontend Engineering team at Parse.ly + WordPress VIP.
                        </div>
                        <div className="PageAuthor__info__links">
                            <Link
                                className="PageAuthor__info__link"
                                doOpenInNewTab
                                to="https://github.com/margueriteroth">
                                <FontAwesomeIcon
                                    icon={faGithub}
                                />
                            </Link>
                            <Link
                                className="PageAuthor__info__link"
                                doOpenInNewTab
                                to="https://dribbble.com/marrrguerite">
                                <FontAwesomeIcon
                                    icon={faDribbble}
                                />
                            </Link>
                            <Link
                                className="PageAuthor__info__link"
                                doOpenInNewTab
                                to="https://twitter.com/marrrguerite">
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                />
                            </Link>
                            <Link
                                className="PageAuthor__info__link"
                                doOpenInNewTab
                                to="mailto:hello@marguerite.io">
                                Email
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        />
    )
};

export default PageAuthor