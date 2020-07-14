import React, { useState } from 'react'
import * as d3 from "d3"
import GenreSparkline from 'components/Movies/GenreSparkline'
import Timeline from 'components/Movies/Timeline'
import "./MoviesContainer.scss"

import data from 'components/Movies/movies.csv'
import { update } from 'lodash'

const parseDate = d3.timeParse("%Y-%m-%d")
const dateAccessor = d => parseDate(d["Date"])
const ratingAccessor = d => d["Rating"]

let genres = ["comedy", "romantic comedy", "action", "mystery",
        "science fiction", "horror", "animated", "fantasy", "epic"]
const lengthAccessor = d => d.length
const genreFilterAccessor = (d, i) => {
    return d["genre"]
}

// Will pull this into python bits
let dataWithGenres = data.map(function(movie){
    let randomGenre = genres[Math.floor(Math.random() * genres.length)];
    let updatedMovie = movie
    updatedMovie["genre"] = randomGenre
    return updatedMovie
})

const MoviesContainer = () => {
    const [sparklineBinsMax, setSparklineBinsMax] = useState(7)
    let updateSparklineBinsMax = () => setSparklineBinsMax

    return (
        <div className="MoviesContainer">
            <Timeline
                data={data}
                xAccessor={dateAccessor}
                yAccessor={ratingAccessor}
                label="TBD"
                className="MoviesContainer__timeline"
            />

            <div className="MoviesContainer__genres">
                {genres.map((genre, index) => (
                    <GenreSparkline
                        data={dataWithGenres}
                        xAccessor={dateAccessor}
                        metricAccessor={dateAccessor}
                        metricFilter={genre}
                        binThresholds={10}
                        sparklineBinsMax={sparklineBinsMax}
                        updateSparklineBinsMax={updateSparklineBinsMax}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default MoviesContainer;