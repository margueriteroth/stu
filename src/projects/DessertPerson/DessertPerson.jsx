import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import { navigate } from "gatsby"
import { globalHistory } from '@reach/router'
import Button from "components/_ui/Button/Button";
import FilterBar from 'projects/DessertPerson/FilterBar'
import Link from "components/_ui/Link/Link";
import Note from "projects/DessertPerson/Note"
import Recipe from "projects/DessertPerson/Recipe"
import ScatterPlot from 'projects/DessertPerson/Scatterplot'
import data from 'projects/DessertPerson/recipes.csv'
import './DessertPerson.scss'

let minutesAccessor = d => d["minutes"]
let difficultyAccessor = d => d["difficulty"]

let chapterList = data.map(recipe => recipe["section"])
chapterList = [...new Set(chapterList)]

let windowGlobal = typeof window !== 'undefined' && window

const DessertPerson = () => {
    //const [isLoading, setIsLoading] = useState(true);
    const [parsedQueryParams, setParsedQueryParams] = useState({})
    const [bookSections, setBookSections] = useState([])
    const [currentLockedData, setCurrentLockedData] = useState()

    let sectionColors = ["#84B5FF", "#FFCE9C", "#7BEFB5", "#A5A5F7", "#FFA5D6", "#FFEF8C", "#BDEFFF"]

    let getQueryParams = (params) => {
        Object.keys(params).forEach(key => {
            if (!Array.isArray(params[key])) {
                params[key] = params[key].split(" ");
            }
        })
        return params
    }

    let setDisplayNote = () => {
        let agreedData = JSON.parse(localStorage.getItem('dessertPersonCreditsSeen'))

        if (!agreedData || new Date() > new Date(agreedData.expire)) {
            // If not seen before or Agree'd has expired
            localStorage.removeItem("dessertPersonCreditsSeen")

            let params = getQueryParams(queryString.parse(windowGlobal.location.search));

            if (!params.note) {
                let newParams = { ...params, note: "credits" }
                newParams = queryString.stringify(newParams)
                navigate(`/dessert-person/?${newParams}`);
            }
        }
    }

    let agreeToSeen = () => {
        let params = { ...parsedQueryParams }
        if (params.note) delete params.note;

        let expire = new Date();
        expire.setDate(expire.getDate() + 15)

        let agreedObj = {
            hasSeenNote: true,
            expire
        }

        params = queryString.stringify(params)
        navigate(`/dessert-person/` + params ? `?${params}` : "");
        localStorage.setItem('dessertPersonCreditsSeen', JSON.stringify(agreedObj));
    }

    let changeQueryParams = (filter, key) => {
        let value = filter.toLowerCase().split(' ')[0];
        // Using only first word
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

        params = queryString.stringify(params)
        navigate(`/dessert-person/` + params ? `?${params}` : "");
    }

    useEffect(() => {
        if (!data.length) {
            setBookSections([]);
        }

        let sections = []
        data.forEach((row) => {
            sections.push(row.section)
        })

        sections = Array.from(new Set(sections))
        setBookSections(sections)
    }, [data]);

    useEffect(() => {
        let paramObj = getQueryParams(queryString.parse(windowGlobal.location.search));
        setParsedQueryParams(paramObj);
        setDisplayNote();
    }, [])

    useEffect(() => {
        return globalHistory.listen(({ location }) => {
            let paramObj = getQueryParams(queryString.parse(location.search));
            setParsedQueryParams(paramObj);
        })
    }, [])

    return (
        <div className="DessertPerson">
            {parsedQueryParams.note && (
                <Note agreeToSeen={agreeToSeen} />
            )}

            {/* <Button onClick={() => {changeQueryParams('credits', 'note')}}>
                Note
            </Button> */}

            <ScatterPlot
                data={data}
                parsedQueryParams={parsedQueryParams}
                changeQueryParams={changeQueryParams}
                xAccessor={minutesAccessor}
                yAccessor={difficultyAccessor}
                currentLockedData={currentLockedData}
                setCurrentLockedData={setCurrentLockedData}
                className="DessertPerson__plot"
                sectionColors={sectionColors}
                bookSections={bookSections}
            />

            <div className="DessertPerson__about">
                <h1>
                    Dessert Person Recipe Matrix
                </h1>
            </div>

            <Recipe className="DessertPerson__recipe" currentLockedData={currentLockedData}/>

            <FilterBar
                className="DessertPerson__filter"
                filters={bookSections}
                currentLockedData={currentLockedData}
                sectionColors={sectionColors}
                changeQueryParams={changeQueryParams}
                parsedQueryParams={parsedQueryParams}
            />

        </div>
    );
};

export default DessertPerson;