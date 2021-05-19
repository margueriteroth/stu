import React, { useState } from 'react'
import classNames from "classnames"
import * as d3 from "d3"
import { useChartDimensions } from "components/utils"
import Axis from "projects/DessertPerson/Axis"
import Chart from 'projects/DessertPerson/Chart'
import Circles from 'projects/DessertPerson/Circles'
import Label from 'projects/DessertPerson/Label'
import './ScatterPlot.scss'

const ScatterPlot = ({ data, xAccessor, yAccessor, label, className }) => {
    const [ref, dimensions] = useChartDimensions({marginLeft:100})
    //const [contextRef, timelineContextDimensions] = useChartDimensions({height:100})
    const [isMouseMove, setIsMouseMove] = useState(false)
    const [currentHoveredData, setCurrentHoveredData] = useState()
    const [currentHoveredCoords, setCurrentHoveredCoords] = useState()

    let minuteSections = [5, 60, 90, 120, 150, 180, 210, 240, 360];

    let getVerticalMinIntervals = () => {
        let verticalRuleMinutes = [];

        minuteSections.forEach((min, i) => {
            let interval = (minuteSections[i + 1] - min) / 5 || 72;
            // calc the minutes for each vertical rule (as the sections have varying timespans)

            for (i = 0; i <= 5; i++) {
                let totalMin = min + (i * interval)
                if (totalMin < 720) verticalRuleMinutes.push(totalMin);
            }
        })

        return verticalRuleMinutes;
    }

    let minVertRules = getVerticalMinIntervals();

    const xScale = d3.scaleLinear()
        .domain([5, d3.max(data, xAccessor)])
        .range([0, dimensions.boundedWidth])


    let colsPerSection = {
        mins55: 1,
        mins30: 6,
        mins120: 1,
        mins360: 1
    }
    let sectionWidth = dimensions.boundedWidth
        / Object.values(colsPerSection).reduce((a, b) => a + b, 0);

    const xScale55mins = d3.scaleLinear()
        .domain([5, 60])
        .range([0, (sectionWidth * colsPerSection["mins55"])])

    const xScale30mins = d3.scaleLinear()
        .domain([60, 240])
        .range([0, (sectionWidth * colsPerSection["mins30"])])

    const xScale120mins = d3.scaleLinear()
        .domain([240, 360])
        .range([0, (sectionWidth * colsPerSection["mins120"])])

    const xScale360mins = d3.scaleLinear()
        .domain([360, 720])
        .range([0, (sectionWidth * colsPerSection["mins360"])])

    let xScales = {
        mins55: xScale55mins,
        mins30: xScale30mins,
        mins120: xScale120mins,
        mins360: xScale360mins
    }

    // let xScaleCalc = (val) => {
    //     let scaledNum = val < 60 ? xScales.mins55(val)
    //         : val <= 240 ? xScales.mins30(val) + sectionWidth
    //             : val <= 360 ? xScales.mins120(val) + (sectionWidth * 7)
    //                 : xScales.mins360(val) + (sectionWidth * 8)

    //     return scaledNum
    // }

    let getXScale = (val) => {
        return val < 60 ? xScales.mins55
            : val <= 240 ? xScales.mins30
                : val <= 360 ? xScales.mins120
                    : xScales.mins360;
    }

    const yScale = d3.scaleLinear()
        .domain([1, 5.5])
        .range([dimensions.boundedHeight, 0])
        .nice()

    const xAccessorScaled = d => xAccessor(d) < 60 ? xScales.mins55(xAccessor(d))
        : xAccessor(d) <= 240 ? xScales.mins30(xAccessor(d)) + sectionWidth
            : xAccessor(d) <= 360 ? xScales.mins120(xAccessor(d)) + (sectionWidth * 7)
                : xScales.mins360(xAccessor(d)) + (sectionWidth * 8)
    const yAccessorScaled = d => yScale(yAccessor(d))

    const onMouseMove = e => {

        let x = e.clientX - e.currentTarget.getBoundingClientRect().x;
        //let y = e.clientY - e.currentTarget.getBoundingClientRect().y;

        const hoveredMin =  xScale.invert(x);

        //console.log(hoveredMin)

        const getDistanceFromHoveredDate = d => Math.abs(
            xAccessor(d) - hoveredMin
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
                    data={currentHoveredData}
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
                    minrules={minVertRules}
                    xscales={xScales}
                    numberOfTicks={10}
                    sectionwidth={sectionWidth}
                    label={'total minutes'}
                />
                <Axis
                    dimension="y"
                    minrules={minVertRules}
                    xscales={xScales}
                    scale={yScale}
                    label={'difficulty'}
                    numberOfTicks={5}
                />

                <Circles
                    dimensions={dimensions}
                    data={data}
                    keyAccessor={keyAccessor}
                    minrules={minVertRules}
                    xAccessor={xAccessorScaled}
                    yAccessor={yAccessorScaled}
                    xScales={xScales}

                />

                {isMouseMove && (
                    // Vertical rule
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
                {/* {isMouseMove && (
                    // Horizontal rule
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

const Tooltip = ({ currentHoveredCoords, dimensions, data }) => {
    let leftScrubCoord = currentHoveredCoords[0] + dimensions.marginLeft
    let topScrubCoord = currentHoveredCoords[1] + dimensions.marginTop

    let name = data["Recipe"];
    let difficulty = data["Difficulty"];
    let time = data["Minutes"] / 60;

    return (
        <div className="Tooltip__container"
            style={{
                opacity: 1,
                left: `${leftScrubCoord}px`,
                top: `${topScrubCoord}px`
            }}>
            <div className="Tooltip">
                <h4>
                    {name}
                </h4>
                <p>
                    Level: {difficulty}
                </p>
                <p>
                    {time} hours, {data["Minutes"]} total minutes
                </p>
            </div>
        </div>
    )
}