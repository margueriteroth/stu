import React, { useState, useEffect } from 'react'
import { globalHistory } from '@reach/router'
import Note from "projects/DessertPerson/Note"
import ScatterPlot from 'projects/DessertPerson/Scatterplot'
import data from 'projects/DessertPerson/recipes.csv'

let minutesAccessor = d => d["Minutes"]
let difficultyAccessor = d => d["Difficulty"]

let chapterList = data.map(recipe => recipe["Section"])
chapterList = [...new Set(chapterList)]

const DessertPerson = () => {
    const [parsedQueryParams, setParsedQueryParams] = useState({ category: [], extra: [], note: [] })
    const [shouldDisplayNote, setShouldDisplayNote] = useState(true);

    useEffect(() => {
        return globalHistory.listen(({ location }) => {
            if (location.search.includes("note=credits")) {
                setShouldDisplayNote(true);
            } else {
                setShouldDisplayNote(false);
            }
        })
      }, [setShouldDisplayNote])

    return (
        <div>
            {shouldDisplayNote && (
                <Note />
            )}
            <ScatterPlot
                data={data}
                parsedQueryParams={parsedQueryParams}
                setParsedQueryParams={setParsedQueryParams}
                xAccessor={minutesAccessor}
                yAccessor={difficultyAccessor}
                label="TBD"
                className="DessertPerson__plot"
            />
        </div>
    );
};

export default DessertPerson;