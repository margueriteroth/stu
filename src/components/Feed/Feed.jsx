import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import { StaticQuery, graphql } from 'gatsby';
import queryString from 'query-string';
import Img from 'gatsby-image';
import Link from "components/_ui/Link/Link";
import './Feed.scss';

import cardImg from './card-img.png';
import { divide } from 'lodash';

let windowGlobal = typeof window !== 'undefined' && window;
let parsedParams = windowGlobal.location ? queryString.parse(windowGlobal.location.search) : {};

let feedSections = ["work & writing", "about", "contact"]
let workSections = ["data viz", "web development", "tutorial", "beginner", "other"]

const Feed = () => {
    const [feedQuery, setFeedQuery] = useState(parsedParams || '');

    const onChange = (event) => {
        let value = event.target.value;
        let params = { ...feedQuery } || {};
        let isCategoryString = (typeof params.category == 'string') ? true : false;
        let isCategoryArray = (Array.isArray(params.category)) ? true : false;

        if (isCategoryArray) {
            // Aka multiple filter params
            if (params.category.indexOf(value) > -1) {
                let idx = params.category.indexOf(value)
                params.category.splice(idx, 1);
            } else {
                params.category.push(value);
            }
        } else if (isCategoryString) {
            // Aka only one filter param
            if (params.category == value) {
                params = {}
            } else {
                params = { category: [params.category, value] }
            }
        } else {
            params = { category: value }
        }

        setFeedQuery(params)
    };

    useEffect(() => {
        let newParams = queryString.stringify(feedQuery)
        navigate(`/?${newParams}`)
    }, [feedQuery]);

    return (
        <StaticQuery

            render={(data) => {
                const content = data.allWpPost.edges;

                return (
                    <div className="Feed__container">
                        <div className="Feed__nav">
                            {feedSections.map((section, i) => (
                                <div className="Feed__nav__section" key={i}>
                                    <div className="Feed__nav__title">
                                        {section}
                                    </div>

                                    {section.indexOf("work") > -1 && (
                                        <div className="Feed__filters">
                                            {workSections.map((label, j) => (
                                                <label className="Feed__filter" key={j}>
                                                    <input
                                                        className="Feed__checkbox"
                                                        name={label}
                                                        type="checkbox"
                                                        value={label}
                                                        onChange={onChange}
                                                    /> { label}
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                        <div className="Feed__content">
                            {content.map((item, i) => (
                                <Link key={i} className="FeedCard" to="/movies">
                                    <div className="FeedCard__metas">
                                        <div className="FeedCard__title">
                                            {item.node.title}
                                        </div>
                                        <div className="FeedCard__category">
                                            {item.node.categories.nodes[0].name}

                                        </div>
                                    </div>
                                    {(item.node.featuredImage) && (
                                        <div className="FeedCard__image">
                                            <Img fluid={item.node.featuredImage.node.localFile.childImageSharp.fluid} />
                                        </div>
                                    )}
                                    <div className="FeedCard__description">
                                        https://github.com/margueriteroth/stu/tree/master/python
                                    </div>
                                </Link>
                            ))}

                            <Link className="FeedCard" to="/movies">
                                <div className="FeedCard__metas">
                                    <div className="FeedCard__title">
                                        Movies Consumed
                                    </div>
                                    <div className="FeedCard__category">
                                        Data Viz
                                    </div>
                                </div>
                                <div className="FeedCard__image">
                                    <img src={cardImg} alt="" />
                                </div>
                                <div className="FeedCard__description">
                                    https://github.com/margueriteroth/stu/tree/master/python
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            }}
        />
    );
};

Feed.propTypes = {

};

export default Feed;


// const WP_FEED_QUERY = graphql`
//     query WPFeedQuery {
//         allWpPost {
//             edges {
//                 node {
//                     guid
//                     slug
//                     title
//                     categories {
//                         nodes {
//                             name
//                         }
//                     }
//                     featuredImage {
//                         node {
//                             localFile {
//                                 childImageSharp {
//                                     fluid {
//                                         ...GatsbyImageSharpFluid
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `;