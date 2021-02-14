import React, { useState } from 'react'
import * as d3 from "d3"
import GenreSparkline from 'components/Movies/GenreSparkline'
import Table from 'components/Movies/Table'
import Timeline from 'components/Movies/Timeline'
import "./MoviesContainer.scss"

import movieData from 'components/Movies/movies.json'
//import { update } from 'lodash'

// console.table(movieData)

const parseDate = d3.timeParse("%Y-%m-%d")
const dateAccessor = d => parseDate(d["date"])
const ratingAccessor = d => d["rating"]

let genreList = movieData.map(movie => movie.genre);
genreList = [...new Set(genreList)];

let genres = movieData.map(movie => movie.genre)
let genreCounts = {};
genres.forEach(genre => {
    if (!genreCounts[genre]) {
        genreCounts[genre] = 1
    } else {
        genreCounts[genre] += 1;
    }
})

let maxGenreCount = d3.max(Object.values(genreCounts))

let genreSorted = Object.fromEntries(
    Object.entries(genreCounts).sort(([, a], [, b]) => a - b).reverse()
);

const lengthAccessor = d => d.length
const genreFilterAccessor = (d, i) => {
    return d["genre"]
}

let colors = {
    "pastelgreen": "#72DB83",
    "pinkperfume": "#DAA0F4",
    "creamsicle": "#F5955E",
    "lilac": "#9391FA",
    "yellow": "#F5E86B",
    "skyblue": "#7CD4EB",
    "jordyblue": "#86ABF3",
    "peptopink": "#F56B8D",
    "sagegreen": "#75C19D",
    "oldrose": "#C18D75",
    "amaranth": "#EB2454",
    "mediumpurple": "#9A48EF",
    "pomegranate": "#F5292E",
    "salmon": "#FF8C6B",
    "watermelon": "#FF6B78",
    "orchid": "#DD8D94",
    "cornflower": "cornflowerblue",
    "mango": "#F9C358",
    "spaceblue": "#2b66ab",
    "puce": "#C17593",
    "chantilly": "#F5ADDE",
    "teagreen": "#C2ECC0",
}

let colorAssignments = {
    "fantasy": colors["mediumpurple"],
    "horror": colors["watermelon"],
    "action": colors["creamsicle"],
    "drama": colors["pastelgreen"],
    "documentary": colors["chantilly"],
    "thriller": colors["watermelon"],
    "adventure": colors["teagreen"],
    "crime": colors["cornflower"],
    "comedy": colors["yellow"],
    "mystery": colors["lilac"],
    "romance": colors["pinkperfume"],
    "western": colors["oldrose"],
    "animation": colors["cornflower"],
    "music": colors["mango"],
    "science fiction": colors["spaceblue"],
    "history": colors["puce"],
}


const MoviesContainer = () => {
    //const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(movieData)
    const [selection, setSelection] = useState({ start: "2018-02-01", end: "2020-07-01" })

    return (
        <div className="MoviesContainer">
            <div>
                <Timeline
                    data={data}
                    selection={selection}
                    xAccessor={dateAccessor}
                    yAccessor={ratingAccessor}
                    label="TBD"
                    className="MoviesContainer__timeline"
                />

                <div className="MoviesContainer__table">
                    <Table
                        data={data}
                        selection={selection}
                        colors={colors}
                        order={'reverse'}
                        colorGenres={colorAssignments}
                    />
                </div>

            </div>

            <div className="MoviesContainer__genres">
                {Object.keys(genreSorted).map((genre, index) => (
                    <GenreSparkline
                        data={data}
                        xAccessor={dateAccessor}
                        metricAccessor={dateAccessor}
                        metricFilter={genre}
                        binThresholds={6}
                        key={index}
                        yDomainExtent={maxGenreCount}
                        fill={colorAssignments[genre]}
                    />
                ))}
            </div>
        </div>
    );
};

export default MoviesContainer;