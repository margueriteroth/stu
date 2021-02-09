import React, { useState } from 'react'
import * as d3 from "d3"
import GenreSparkline from 'components/Movies/GenreSparkline'
import Table from 'components/Movies/Table'
import Timeline from 'components/Movies/Timeline'
import "./MoviesContainer.scss"

import movieData from 'components/Movies/movies.csv'
//import { update } from 'lodash'

const parseDate = d3.timeParse("%Y-%m-%d")
const dateAccessor = d => parseDate(d["date"])
const ratingAccessor = d => d["rating"]

let genres = ["comedy", "romantic comedy", "action", "mystery",
        "science fiction", "horror", "animated", "fantasy", "epic"]
// const lengthAccessor = d => d.length
// const genreFilterAccessor = (d, i) => {
//     return d["genre"]
// }

// Will pull this into python bits
// let dataWithGenres = movieData.map(function(movie){
//     let randomGenre = genres[Math.floor(Math.random() * genres.length)];
//     let updatedMovie = movie
//     updatedMovie["genre"] = randomGenre
//     return updatedMovie
// })

let sampleColors = {
    "comedy" : "#72DB83",
    "romantic comedy" : "#DAA0F4",
    "action" : "#F5955E",
    "mystery" : "#9391FA",
    "science fiction" : "#F5E86B",
    "horror" : "#7CD4EB",
    "animated" : "#86ABF3",
    "fantasy" : "#F56B8D",
    "epic" : "#75C19D",
}


const MoviesContainer = () => {
    //const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(movieData)
    const [selection, setSelection] = useState({start: "2018-02-01", end: "2020-07-01"})
    const [sparklineBinsMax, setSparklineBinsMax] = useState(7)
    let updateSparklineBinsMax = () => setSparklineBinsMax

    return (
        <div className="MoviesContainer">
            <Timeline
                data={data}
                selection={selection}
                xAccessor={dateAccessor}
                yAccessor={ratingAccessor}
                label="TBD"
                className="MoviesContainer__timeline"
            />

            <Table
                data={data}
                selection={selection}
            />

            <div className="MoviesContainer__genres">
                {genres.map((genre, index) => (
                    <GenreSparkline
                        data={data}
                        xAccessor={dateAccessor}
                        metricAccessor={dateAccessor}
                        metricFilter={genre}
                        binThresholds={6}
                        sparklineBinsMax={sparklineBinsMax}
                        updateSparklineBinsMax={updateSparklineBinsMax}
                        key={index}
                        fill={sampleColors[genre]}
                    />
                ))}
            </div>
        </div>
    );
};

export default MoviesContainer;