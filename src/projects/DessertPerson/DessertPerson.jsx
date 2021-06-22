import React, { useState, useEffect } from 'react'
import { navigate } from "gatsby"
import { globalHistory } from '@reach/router'
import queryString from 'query-string';
import Note from "projects/DessertPerson/Note"
import ScatterPlot from 'projects/DessertPerson/Scatterplot'
import data from 'projects/DessertPerson/recipes.csv'

let minutesAccessor = d => d["Minutes"]
let difficultyAccessor = d => d["Difficulty"]

let chapterList = data.map(recipe => recipe["Section"])
chapterList = [...new Set(chapterList)]

let windowGlobal = typeof window !== 'undefined' && window

const DessertPerson = () => {
    //const [isLoading, setIsLoading] = useState(true);
    const [parsedQueryParams, setParsedQueryParams] = useState({})

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
                let newParams = {...params, note: "credits"}
                newParams = queryString.stringify(newParams)
                navigate(`/dessert-person/?${newParams}`);
            }
        }
    }

    let agreeToSeen = () => {
        let params = {...parsedQueryParams}
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
        <div>
            {parsedQueryParams.note && (
                <Note agreeToSeen={agreeToSeen} />
            )}

            <ScatterPlot
                data={data}
                parsedQueryParams={parsedQueryParams}
                changeQueryParams={changeQueryParams}
                xAccessor={minutesAccessor}
                yAccessor={difficultyAccessor}
                label="TBD"
                className="DessertPerson__plot"
            />

        </div>
    );
};

export default DessertPerson;