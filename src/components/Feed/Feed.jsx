import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import { globalHistory } from '@reach/router'
import queryString from 'query-string';
//import Img from 'gatsby-image';
import Link from "components/_ui/Link/Link";
import './Feed.scss';

import cardImg from './card-img.png';

let windowGlobal = typeof window !== 'undefined' && window;
let getQueryParams = (params) => {
    Object.keys(params).forEach(key => {
        if (!Array.isArray(params[key])) {
            params[key] = params[key].split(" ");
        }
    })
    return params
}

let feedSections = ["work & writing", "about", "contact"]
let workSections = [["data viz", "viz"], ["web development", "development"], ["tutorial"], ["beginner"], ["other"]]

let projectData = [
    {
        slug: "dessert-person",
        title: "Dessert Person viz",
        intro: "test test",
        section: "data-viz",
        date: "2021-08-28",
        status: "active",
        updates: ["2021-08-18", "2021-08-18"]
    },
    {
        slug: "movies",
        title: "Movies Consumed",
        intro: "test test",
        section: "data-viz",
        date: "2021-08-18",
        status: "active",
        updates: ["2021-08-18", "2021-08-18"]
    }
]

const Feed = ({ blogData }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [parsedQueryParams, setParsedQueryParams] = useState({})
    const [sortedFeedData, setSortedFeedData] = useState([])

    let flattenBlogData = (data) => {
        let flatData = [];
        data.forEach(item => {
            item = item.node;
            let itemObj = {};
            ["date", "title", "updates", "section", "isFeatured", "slug"].forEach(key => {
                itemObj[key] = item.frontmatter[key];
            })
            itemObj.slug = `blog/${itemObj.slug}`;
            flatData.push(itemObj);
        });
        return flatData;
    }

    let combineFeedDataSources = () => {
        let flatBlogData = flattenBlogData(blogData);
        return [...flatBlogData, ...projectData];
    }

    let sortByDate = (data, sort) => {
        if (sort == "ascending") {
            return data.sort((d1, d2) => {
                return new Date(d1.date).getTime() - new Date(d2.date).getTime()
            })
        } else {
            // descending
            return data.sort((d1, d2) => {
                return new Date(d2.date).getTime() - new Date(d1.date).getTime()
            })
        }
    }

    let defaultSort = "descending";
    let setFeed = () => {
        let feed = combineFeedDataSources();
        feed = sortByDate(feed, defaultSort)
        console.table(feed)
        setSortedFeedData(feed);
    }

    useEffect(() => {
        setFeed();
    }, [])



    let changeQueryParams = (filter, key, evt) => {
        let value = filter;
        let params = { ...parsedQueryParams } || {};

        if (Array.isArray(params[key])) {
            // multiple filter params
            if (params[key].includes(value) && params[key].length == 1) {
                // destroy
                delete params[key];
            } else if (params[key].includes(value) && params[key].length > 1) {
                // remove
                let idx = params[key].indexOf(value);
                params[key].splice(idx, 1);
            } else {
                // add
                params[key].push(value);
            }
        } else if (!Array.isArray(params[key])) {
            // one filter param
            // create arr
            let paramArr = value.split(" ");
            params[key] = paramArr;
        } else {
            params[key] = value;
        }

        params = queryString.stringify(params);
        navigate(`/` + params ? `?${params}` : "");
    };

    useEffect(() => {
        let paramObj = getQueryParams(queryString.parse(windowGlobal.location.search));
        setParsedQueryParams(paramObj);
    }, [])

    useEffect(() => {
        return globalHistory.listen(({ location }) => {
            let paramObj = getQueryParams(queryString.parse(location.search));
            setParsedQueryParams(paramObj);
        })
    }, [])

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
                                            name={label[0]}
                                            value={label[0]}
                                            type="checkbox"
                                            defaultChecked={parsedQueryParams.category?.includes(label[1] ? label[1] : label[0])}
                                            onChange={evt => changeQueryParams(label[1] ? label[1] : label[0], 'category', evt)}
                                        /> {label[0]}
                                    </label>
                                ))}
                            </div>
                        )}

                    </div>
                ))}
            </div>
            <div className="Feed__content">
                {sortedFeedData.map((item, i) => (
                    <Link key={i} className="FeedCard" to={`/${item.slug}`}>
                        <div className="FeedCard__metas">
                            <div className="FeedCard__title">
                                {item.title}
                            </div>
                            <div className="FeedCard__category">
                                {item.section}
                            </div>
                        </div>
                        <img src={cardImg} alt="" />
                        {/* {(item.node.featuredImage) && (
                            <div className="FeedCard__image">
                                <Img fluid={item.node.featuredImage.node.localFile.childImageSharp.fluid} />
                            </div>
                        )} */}
                        <div className="FeedCard__description">
                            https://github.com/margueriteroth/stu/tree/master/python
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

Feed.propTypes = {

};

export default Feed;