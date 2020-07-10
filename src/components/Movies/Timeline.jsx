import React, { useState } from 'react'
import classNames from "classnames"
//import PropTypes from 'prop-types'
import * as d3 from "d3"
import { useChartDimensions } from "components/utils"
import Axis from "components/Movies/Axis"
import Chart from 'components/Movies/Chart'
import Circles from 'components/Movies/Circles'
import './Timeline.scss'

const formatMonths = d3.timeFormat("%B")

const Timeline = ({ data, xAccessor, yAccessor, label, className }) => {
    const [ref, dimensions] = useChartDimensions()
    //const [contextRef, timelineContextDimensions] = useChartDimensions({height:100})
    //const [isMouseMove, setIsMouseMove] = useState(false)

    const xScale = d3.scaleTime()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth])

    const yScale = d3.scaleLinear()
        .domain([0, 10])
        .range([dimensions.boundedHeight, 0])
        .nice()

    // const xScaleContext = d3.scaleTime()
    //     .domain(d3.extent(data, xAccessor))
    //     .range([0, timelineContextDimensions.boundedWidth])

    // const yScaleContext = d3.scaleLinear()
    //     .domain([0, 10])
    //     .range([timelineContextDimensions.boundedHeight, 0])
    //     .nice()

    const xAccessorScaled = d => xScale(xAccessor(d))
    const yAccessorScaled = d => yScale(yAccessor(d))
    // const xAccessorScaledContext = d => xScaleContext(xAccessor(d))
    // const yAccessorScaledContext = d => yScaleContext(yAccessor(d))

    const keyAccessor = (d, i) => i

    return (
        <div>
            <div className={classNames("Timeline", className)} ref={ref}>
                <Chart
                    dimensions={dimensions}
                >
                    <Axis
                        dimension="x"
                        scale={xScale}
                        formatTick={formatMonths}
                        numberOfTicksYear={4}
                    />
                    <Axis
                        dimension="y"
                        scale={yScale}
                        label={label}
                        numberOfTicks={10}
                    />
                    <Circles
                        data={data}
                        keyAccessor={keyAccessor}
                        xAccessor={xAccessorScaled}
                        yAccessor={yAccessorScaled}
                    />
                </Chart>
            </div>
            {/* <div className="TimelineContext" ref={contextRef}>
                <Chart
                    dimensions={timelineContextDimensions}
                >
                    <Circles
                        data={data}
                        keyAccessor={keyAccessor}
                        xAccessor={xAccessorScaledContext}
                        yAccessor={yAccessorScaledContext}
                    />
                </Chart>
            </div> */}
        </div>
    );
};



export default Timeline;