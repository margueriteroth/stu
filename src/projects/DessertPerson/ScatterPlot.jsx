import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock} from '@fortawesome/free-solid-svg-icons'
import classNames from "classnames"
import * as d3 from "d3"
import { Delaunay } from "d3-delaunay";
import { useChartDimensions } from "components/utils"
import { usePrevious, useQuery } from "hooks"
import { Link } from 'gatsby'
import Axis from "projects/DessertPerson/Axis"
import Chart from 'projects/DessertPerson/Chart'
import Circles from 'projects/DessertPerson/Circles'

import './ScatterPlot.scss'

const ScatterPlot = ({ data, currentLockedData, setCurrentLockedData, parsedQueryParams, changeQueryParams, xAccessor, yAccessor, label, className, ...props }) => {
    const [ref, dimensions] = useChartDimensions({ marginTop: 10, marginLeft: 100, marginRight: 100 })

    const [isLoaded, setIsLoaded] = useState(false);

    const [currentData, setCurrentData] = useState(data)
    const [dataDots, setDataDots] = useState([])
    const [voronoiData, setVoronoiData] = useState()
    const [voronoiPaths, setVoronoiPaths] = useState()
    const [filteredDots, setFilteredDots] = useState()

    const [isMouseMove, setIsMouseMove] = useState(false)
    const [currentHoveredCol, setCurrentHoveredCol] = useState()
    const [currentHoveredIndex, setCurrentHoveredIndex] = useState()
    const [currentHoveredData, setCurrentHoveredData] = useState()
    const [currentHoveredCoords, setCurrentHoveredCoords] = useState()
    const [currentLockedCoords, setCurrentLockedCoords] = useState()

    let minuteSections = [5, 60, 90, 120, 150, 180, 210, 240, 360, 720, 1080];

    let covertMins = (mins) => {
        // minutes to hours and mins
        let hours = Math.floor(mins / 60);
        let minutes = Math.round(mins % 60);
        return { hours, minutes }
    }

    let getVerticalMinIntervals = () => {
        let verticalRuleMinutes = [];

        minuteSections.forEach((min, i) => {
            let interval = (minuteSections[i + 1] - min) / 5 || 72;
            // calc the minutes for each vertical rule (as the sections have varying timespans)

            for (i = 0; i <= 5; i++) {
                let totalMin = min + (i * interval)
                if (totalMin < 1080) verticalRuleMinutes.push(totalMin);
            }
        })

        return verticalRuleMinutes;
    }

    let minVertRules = getVerticalMinIntervals();
    let mainLevels = [1, 2, 3, 4, 5];

    let yMax = 6;

    let getHorizontalIntervals = () => {
        let horizIntervals = [];

        mainLevels.forEach((level, i) => {
            let defaultInterval = 1 / 7;
            let levelThreeInterval = 1 / 8;
            // calc the minutes for each vertical rule (as the sections have varying timespans)

            for (i = 0; i <= 7; i++) {
                if (level != 3) {
                    horizIntervals.push(level + (i * defaultInterval));
                } else {
                    horizIntervals.push(level + (i * levelThreeInterval));
                }
            }
        })

        horizIntervals = horizIntervals.filter(interval => interval < yMax);
        horizIntervals = [...new Set(horizIntervals)];

        if (horizIntervals[0] == 1) {
            horizIntervals.splice(0, 1);
        }
        return horizIntervals;
    }

    const yScale = d3.scaleLinear()
        .domain([1, yMax])
        .range([dimensions.boundedHeight, 0])

    let levelRules = getHorizontalIntervals();
    let yRuleDistance = yScale(levelRules[1]) - yScale(levelRules[2]);
    let yRyleDistanceThrees = Math.abs(yScale(levelRules[16]) - yScale(levelRules[17]));


    const colsPerSection = {
        mins55: 1,
        mins30: 6,
        mins120: 1,
        mins360: 2
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
        .domain([360, 1080])
        .range([0, (sectionWidth * colsPerSection["mins360"])])

    let xScales = {
        mins55: xScale55mins,
        mins30: xScale30mins,
        mins120: xScale120mins,
        mins360: xScale360mins
    }

    let getXScale = (val) => {
        let totalCols = Object.values(colsPerSection).reduce(function (a, b) { return a + b });

        let currentCol = Math.ceil(val / (dimensions.boundedWidth / totalCols));
        setCurrentHoveredCol(currentCol);

        let scale;

        // # Invert Formula
        // scale.invert - (sectionWidth * [sections before scale])
        // maybe make something that getsScale AND shifts sections? ToDo

        if (currentHoveredCol == 1) {
            scale = xScales.mins55;
        } else if (currentHoveredCol <= 7) {
            scale = xScales.mins30;
        } else if (currentHoveredCol == 8) {
            scale = xScale120mins;
        } else {
            scale = xScale360mins;
        }

        return scale;
    }

    let xRuleDistance = Math.abs(xScale55mins(minVertRules[1]) - xScale55mins(minVertRules[2]));
    let yArrowOffset = xRuleDistance * 3;

    // Scales and shifts
    const xAccessorScaled = d => xAccessor(d) <= 60 ? xScales.mins55(xAccessor(d))
        : xAccessor(d) <= 240 ? xScales.mins30(xAccessor(d)) + sectionWidth
            : xAccessor(d) <= 360 ? xScales.mins120(xAccessor(d)) + (sectionWidth * 7)
                : xScales.mins360(xAccessor(d)) + (sectionWidth * 8)
    const yAccessorScaled = d => yScale(yAccessor(d))

    let calculateDotCoords = (data) => {
        let dots = [];

        data.forEach((row, rowIndex) => {
            let obj = {
                x: xAccessorScaled(row, rowIndex),
                y: yAccessorScaled(row, rowIndex),
            };
            dots.push(obj)
        })

        return dots;
    }

    let calculateVoronoi = (dots) => {
        const delaunay = Delaunay.from(dots, d => d.x, d => d.y)
        const voronoi = delaunay.voronoi([0, 0, dimensions.boundedWidth, dimensions.boundedHeight])
        const voronoiPaths = dots.map((d, i) => ({
            d: voronoi.renderCell(i),
            ...d,
        }))

        return { voronoi, voronoiPaths }
    }

    //Create Dots + coords, Voronoi cell data
    let setData = () => {
        let filteredData = data;
        let dots = calculateDotCoords(data);
        let filteredDots = dots;

        let voronoi = calculateVoronoi(dots);
        let voronoiPaths = voronoi.voronoiPaths;
        let voronoiData = voronoi.voronoi;

        if (parsedQueryParams.category) {
            // filter the data
            filteredData = filteredData.filter(row => parsedQueryParams.category.includes(row.section.toLowerCase().split(' ')[0]));
            filteredDots = calculateDotCoords(filteredData);

            voronoiPaths = calculateVoronoi(filteredDots)["voronoiPaths"];
            voronoiData = calculateVoronoi(filteredDots)["voronoi"];
        }

        setVoronoiPaths(voronoiPaths)
        setVoronoiData(voronoiData);

        setCurrentData(filteredData);
        setDataDots(dots);
        setFilteredDots(filteredDots);
    }

    let finishLoading = () => {
        if (dataDots) {
            setTimeout(function () {
                setIsLoaded(true)
            }, 400);
        }
    }

    useEffect(() => {
        setData();
        finishLoading();
    }, []);

    useEffect(() => {
        setData()
    }, [dimensions.boundedWidth, dimensions.boundedHeight]);

    useEffect(() => {
        setData();
        parsedQueryParams.note ? setIsLoaded(false) : finishLoading();
    }, [parsedQueryParams]);



    const onMouseMove = e => {
        let x = e.clientX - e.currentTarget.getBoundingClientRect().x;
        let y = e.clientY - e.currentTarget.getBoundingClientRect().y;

        let correctXScale = getXScale(x);

        let sectionsToSubtract = (currentHoveredCol >= 2 && currentHoveredCol <= 7) ? 1
            : (currentHoveredCol == 8) ? 7
                : 8;

        // let hoveredMin = correctXScale.invert(x - (currentHoveredCol >= 2 ? sectionsToSubtract * sectionWidth : 0));
        // let hoveredDifficulty = yScale.invert(y);

        let closestIndex = voronoiData.delaunay.find(x, y)
        let closestDataPoint = currentData[closestIndex]

        // let closestXValue = xAccessor(closestDataPoint)
        // let closestYValue = yAccessor(closestDataPoint)

        let hoveredData = closestDataPoint
        let hoveredCoords = filteredDots[closestIndex]

        setIsMouseMove(true)
        setCurrentHoveredIndex(closestIndex)
        setCurrentHoveredData(hoveredData)
        setCurrentHoveredCoords(hoveredCoords)
    }

    const onMouseClick = e => {
        if (!currentLockedData || currentLockedData.recipe != currentHoveredData.recipe) {
            setCurrentLockedCoords(currentHoveredCoords)
            setCurrentLockedData(currentHoveredData)
        } else {
            setCurrentLockedCoords()
            setCurrentLockedData()
        }
    }

    const onMouseLeave = e => {
        setIsMouseMove(false)
        setCurrentHoveredData()
        setCurrentHoveredCoords()
        setCurrentHoveredCol(0)
        setCurrentHoveredIndex()
    }

    return (
        <div className={classNames("ScatterPlot", className)} ref={ref}>
            <Tooltip
                currentHoveredData={currentHoveredData}
                currentHoveredCoords={currentHoveredCoords ? [currentHoveredCoords.x, currentHoveredCoords.y] : [dimensions.boundedWidth/2, dimensions.boundedHeight]}
                dimensions={dimensions}
                data={currentHoveredData}
            />

            <Chart
                dimensions={dimensions}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onMouseClick={onMouseClick}
            >
                <Axis
                    dimension="x"
                    yScale={yScale}
                    minrules={minVertRules}
                    xscales={xScales}
                    numberOfTicks={10}
                    sectionwidth={sectionWidth}
                    label={'total minutes'}
                    levelRules={levelRules}
                    xRuleDistance={xRuleDistance}
                    yRuleDistance={yRuleDistance}
                    yRyleDistanceThrees={yRyleDistanceThrees}
                />
                <Axis
                    dimension="y"
                    minrules={minVertRules}
                    xscales={xScales}
                    scale={yScale}
                    label={'difficulty'}
                    numberOfTicks={5}
                    levelRules={levelRules}
                    xRuleDistance={xRuleDistance}
                    yRuleDistance={yRuleDistance}
                    yRyleDistanceThrees={yRyleDistanceThrees}
                />

                <Circles
                    dimensions={dimensions}
                    data={data}
                    dots={dataDots}
                    minrules={minVertRules}
                    xAccessor={xAccessorScaled}
                    yAccessor={yAccessorScaled}
                    parsedQueryParams={parsedQueryParams}
                    isLoaded={isLoaded}
                    currentHoveredData={currentHoveredData}
                    currentLockedData={currentLockedData}
                />

                <g style={{ opacity: !isLoaded ? 0 : 1, transition: `500ms ease-in-out all 200ms` }}>
                    {isMouseMove && (
                        // Vertical rule
                        <>
                            <rect
                                className="ScatterPlot__hovered-line ScatterPlot__hovered-line--vertical"
                                width="1"
                                height={dimensions.boundedHeight}
                                x={currentHoveredCoords.x}
                                style={{ opacity: (isMouseMove ? 1 : 0) }}
                            />
                        </>
                    )}
                    {isMouseMove && (
                        // Horizontal rule
                        <>
                            <rect
                                className="ScatterPlot__hovered-line ScatterPlot__hovered-line--vertical"
                                width={dimensions.boundedWidth}
                                height="1"
                                x={-xRuleDistance}
                                y={currentHoveredCoords.y}
                                style={{ opacity: (isMouseMove ? 1 : 0) }}
                            />
                            <Circle className="ScatterPlot__hovered-circle" cx={currentHoveredCoords.x} cy={currentHoveredCoords.y} r={5}/>
                        </>
                    )}
                    {currentLockedCoords && (
                        <>
                            <rect
                                className="ScatterPlot__locked-line ScatterPlot__locked-line--vertical"
                                width={dimensions.boundedWidth}
                                height="1"
                                x={-xRuleDistance}
                                y={currentLockedCoords.y}

                            />
                            <rect
                                className="ScatterPlot__locked-line ScatterPlot__locked-line--vertical"
                                width="1"
                                height={dimensions.boundedHeight}
                                x={currentLockedCoords.x}
                            />
                            <Circle className="ScatterPlot__locked-circle" cx={currentLockedCoords.x} cy={currentLockedCoords.y} r={6}/>
                        </>
                    )}

                    {parsedQueryParams.extra && parsedQueryParams.extra.includes("voronoi") && (
                        <>
                            {voronoiPaths && voronoiPaths.map((path, i) => (
                                <g key={i}>
                                    <path
                                        style={{ transition: `100ms ease-in-out all` }}
                                        d={path.d}
                                        fillOpacity={currentHoveredIndex == i ? "0.25" : "0"}
                                        fill={currentHoveredIndex == i ? "#da79ae" : "none"}
                                        stroke="#da79ae"
                                        strokeWidth={1} />
                                </g>
                            ))}
                        </>
                    )}
                </g>

            </Chart>
        </div>
    );
};

export default ScatterPlot;

const Circle = ({ className, cx, cy, r }) => {
    // For tooltip
    return (
        <circle className={classNames(`Circle`, className)}
            r={r}
            cx={cx}
            cy={cy}
        />
    )
}

const Tooltip = ({ currentHoveredCoords, dimensions, data }) => {
    let leftScrubCoord = currentHoveredCoords[0] + dimensions.marginLeft
    let topScrubCoord = currentHoveredCoords[1] + dimensions.marginTop

    let name = data ? data["recipe"] : "recipe";
    let difficulty = data ? data["difficulty"] : "difficulty";
    let mins = data ? data["minutes"] : "mins"
    let time = data ? data["minutes"] / 60 : "00:00";

    //opacity: currentHoveredCoords[0] != 0 ? 1 : 0

    return (
        <div className="Tooltip__container"
            style={{
                left: `${leftScrubCoord}px`,
                top: `${topScrubCoord}px`,
                opacity: data ? 1 : 0
            }}>
            <div className="Tooltip">
                <div className="Tooltip__title">
                    {name}
                </div>
                <div className="Tooltip__level">
                    Level {Math.floor(difficulty)}
                </div>
                <div className="Tooltip__time">
                <FontAwesomeIcon className="Tooltip__time__icon" icon={faClock} />
                    {time}
                </div>
            </div>
        </div>
    )
}