import React, { useState } from 'react'
import classNames from "classnames"
import PropTypes from 'prop-types'
import * as d3 from "d3"
import { useChartDimensions } from "components/utils"
import Axis from "components/Movies/Axis"
import Bars from 'components/Movies/Bars'
import Chart from 'components/Movies/Chart'
import Circles from 'components/Movies/Circles'
import Line from 'components/Movies/Line'
import './GenreSparkline.scss'

const formatMonths = d3.timeFormat("%B")

const GenreSparkline = ({ data, xAccessor, metricAccessor, binThresholds, metricFilter, className }) => {
    const [ref, dimensions] = useChartDimensions()

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth])

    const binsGenerator = d3.histogram()
        .domain(xScale.domain())
        .value(metricAccessor)
        .thresholds(binThresholds)

    const bins = binsGenerator(data)

    const yAccessor = (d, i) => {
        if (!metricFilter) {
            return
        }
        return d.filter(movie => movie.genre == metricFilter).length
    }
    const yScale = d3.scaleLinear()
    // .domain([0, d3.max(bins, yAccessor)])
        .domain([0, 6])
        .range([dimensions.boundedHeight, 0])
        .nice()

    // X Accessor needs different 'xAccessorScaled' becuase it is dealing with bin'd data
    const xAccessorScaled = d => xScale(d.x0 + (d.x1 - d.x0) / 2)
    const yAccessorScaled = d => yScale(yAccessor(d))
    const y0AccessorScaled = d => yScale(yScale.domain()[0])

    return (
        <div className={classNames("GenreSparkline", className)} ref={ref}>

            <Chart
                dimensions={dimensions}
            >
                <Axis
                    dimension="x"
                    scale={xScale}
                    formatTick={formatMonths}
                    numberOfTicks={0}
                    numberOfTicksYear={3}
                />
                <Axis
                    dimension="y"
                    numberOfTicks={4}
                    scale={yScale}
                    label={`${metricFilter} movies watched`}
                />
                {/* <Line
                    className={classNames(`Line`)}
                    data={bins}
                    xAccessor={xAccessorScaled}
                    yAccessor={yAccessorScaled}
                /> */}
                <Line
                    data={bins}
                    type="area"
                    xAccessor={xAccessorScaled}
                    yAccessor={yAccessorScaled}
                    y0Accessor={y0AccessorScaled}
                />
            </Chart>
        </div>
    );
};

export default GenreSparkline;
