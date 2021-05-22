import React, { useState } from 'react'
import ScatterPlot from 'projects/DessertPerson/Scatterplot'

import data from 'projects/DessertPerson/recipes.csv'

let minutesAccessor = d => d["Minutes"]
let difficultyAccessor = d => d["Difficulty"]

let chapterList = data.map(recipe => recipe["Section"])
chapterList = [...new Set(chapterList)]

const DessertPerson = () => {
    return (
        <div>
            <ScatterPlot
                data={data}
                xAccessor={minutesAccessor}
                yAccessor={difficultyAccessor}
                label="TBD"
                className="DessertPerson__plot"
            />
        </div>
    );
};

export default DessertPerson;