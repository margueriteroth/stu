import React, { useState } from 'react'
import classNames from "classnames"
import * as d3 from "d3"
import { useChartDimensions } from "components/utils"
import Axis from "projects/DessertPerson/Axis"
import Chart from 'projects/DessertPerson/Chart'
import Circles from 'projects/DessertPerson/Circles'
import './ScatterPlot.scss'

const ScatterPlot = ({ data, xAccessor, yAccessor, label, className }) => {
    const [ref, dimensions] = useChartDimensions()
    //const [contextRef, timelineContextDimensions] = useChartDimensions({height:100})
    const [isMouseMove, setIsMouseMove] = useState(false)
    const [currentHoveredData, setCurrentHoveredData] = useState()
    const [currentHoveredCoords, setCurrentHoveredCoords] = useState()

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xAccessor)])
        .range([0, dimensions.boundedWidth])

    const yScale = d3.scaleLinear()
        .domain([1, 5.5])
        .range([dimensions.boundedHeight, 0])
        .nice()

    const xAccessorScaled = d => xScale(xAccessor(d))
    const yAccessorScaled = d => yScale(yAccessor(d))

    const onMouseMove = e => {

        let x = e.clientX - e.currentTarget.getBoundingClientRect().x;
        //let y = e.clientY - e.currentTarget.getBoundingClientRect().y;

        const hoveredDate = xScale.invert(x);

        const getDistanceFromHoveredDate = d => Math.abs(
            xAccessor(d) - hoveredDate
        )

        // Scan for the the closest thing
        const closestIndex = d3.scan(data, (a, b) => (
            getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b)
        ))
        const closestDataPoint = data[closestIndex]

        const closestXValue = xAccessor(closestDataPoint)
        const closestYValue = yAccessor(closestDataPoint)

        let hoveredData = data[closestIndex]
        let hoveredCoords = [xScale(closestXValue), yScale(closestYValue)]

        setIsMouseMove(true)
        setCurrentHoveredData(hoveredData)
        setCurrentHoveredCoords(hoveredCoords)
    }

    const onMouseEnter = e => {
    }

    const onMouseLeave = e => {
        setIsMouseMove(false)
        setCurrentHoveredData()
        setCurrentHoveredCoords()
    }

    const keyAccessor = (d, i) => i

    return (
        <div className={classNames("ScatterPlot", className)} ref={ref}>
            {/* {currentHoveredCoords && (
                <Tooltip
                    currentHoveredData={currentHoveredData}
                    currentHoveredCoords={currentHoveredCoords}
                    dimensions={dimensions}
                    movieData={currentHoveredData}
                />
            )} */}

            <Chart
                dimensions={dimensions}
                onMouseMove={onMouseMove}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <Axis
                    dimension="x"
                    scale={xScale}
                    numberOfTicks={10}
                    label={'total minutes'}
                />
                <Axis
                    dimension="y"
                    scale={yScale}
                    label={'difficulty'}
                    numberOfTicks={5}
                />

                <Circles
                    data={data}
                    keyAccessor={keyAccessor}
                    xAccessor={xAccessorScaled}
                    yAccessor={yAccessorScaled}
                />

                {/* {isMouseMove && (
                    <>
                        <rect
                            className="ScatterPlot__hover-line ScatterPlot__hover-line--vertical"
                            width="1"
                            height={dimensions.boundedHeight - currentHoveredCoords[1]}
                            x={currentHoveredCoords[0]}
                            y={currentHoveredCoords[1]}
                            style={{ opacity: (isMouseMove ? 1 : 0) }}
                        />
                    </>
                )}
                {isMouseMove && (
                    <>
                        <rect
                            className="ScatterPlot__hover-line ScatterPlot__hover-line--vertical"
                            width={currentHoveredCoords[0]}
                            height="1"
                            x={0}
                            y={currentHoveredCoords[1]}
                            style={{ opacity: (isMouseMove ? 1 : 0) }}
                        />
                    </>
                )} */}
            </Chart>
        </div>
    );
};

export default ScatterPlot;

const Circle = ({ className, cx, cy, style }) => {
    // For tooltip
    return (
        <circle className={classNames("Circle", className)}
            r={1}
            fill="red"
            cx={cx}
            cy={cy}
            style={style}
        />
    )
}

const Tooltip = ({ currentHoveredCoords, dimensions, movieData }) => {
    let leftScrubCoord = currentHoveredCoords[0] + dimensions.marginLeft
    let topScrubCoord = currentHoveredCoords[1] + dimensions.marginTop

    let movie = movieData.Movie

    return (
        <div className="Tooltip__container"
            style={{
                opacity: 1,
                left: `${leftScrubCoord}px`,
                top: `${topScrubCoord}px`
            }}>
            <div className="Tooltip">
                <h4>
                    <i>
                        {movie}
                    </i>
                </h4>
                <h6>
                    Rating: {movieData.Rating} / 10
                </h6>
                <h6>
                    {movieData.Provider}
                </h6>
            </div>
        </div>
    )
}