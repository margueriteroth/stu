import React, { useState } from 'react'
import * as d3 from "d3"
import ScatterPlot from 'projects/DessertPerson/Scatterplot'

import data from 'projects/DessertPerson/recipes.csv'
console.table(data)

let minutesAccessor = d => d["Minutes"]
let difficultyAccessor = d => d["Difficulty"]

let chapterList = data.map(recipe => recipe["Section"])
chapterList = [...new Set(chapterList)]

const DessertPerson = () => {
    return (
        <div>
            Dessert person
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