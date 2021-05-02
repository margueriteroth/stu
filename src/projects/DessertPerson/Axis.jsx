import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames";
import * as d3 from 'd3'
import { dimensionsPropsType } from "components/utils";
import { useChartDimensions } from "./Chart";
//import { min } from "lodash";

const axisComponentsByDimension = {
    x: AxisHorizontal,
    y: AxisVertical,
}
const Axis = ({ dimension, ...props }) => {
    const dimensions = useChartDimensions()
    const Component = axisComponentsByDimension[dimension]
    if (!Component) return null

    return (
        <Component
            dimensions={dimensions}
            {...props}
        />
    )
}

Axis.propTypes = {
    dimension: PropTypes.oneOf(["x", "y"]),
    dimensions: dimensionsPropsType,
    numberOfTicks: PropTypes.number,
    scale: PropTypes.func,
    label: PropTypes.string,
    formatTick: PropTypes.func,
}

Axis.defaultProps = {
    dimension: "x",
    scale: null,
    formatTick: d3.format(","),
    numberOfTicks: 14,
}

export default Axis


function AxisHorizontal({ className, dimensions, label, formatTick, scale, numberOfTicks, ...props }) {
    const sectionTicks = scale.ticks(numberOfTicks)
    const rulesTicks = scale.ticks(numberOfTicks * 7)

    return (
        <g
            className={classNames("Axis AxisHorizontal", className)}
            transform={`translate(0, ${dimensions.boundedHeight})`} {...props}>
            <line
                className="Axis__line"
                x2={dimensions.boundedWidth}
            />

            {rulesTicks.map((tick, i) => (
                <line
                    key={i}
                    className="Grid__rules"
                    y1={`-${dimensions.boundedHeight}`}
                    transform={`translate(${scale(tick)})`}
                />
            ))}

            {sectionTicks.map((tick, i) => (
                <line
                    key={i}
                    className="Grid__section-delineator"
                    y1={`-${dimensions.boundedHeight}`}
                    y2={30}
                    transform={`translate(${scale(tick)})`}
                />
            ))}

            {sectionTicks.map((tick, i) => (
                <text
                    key={i}
                    className="Axis__tick"
                    transform={`translate(${scale(tick)}, 25)`}
                >
                    {formatTick(tick)}
                </text>
            ))}

            {label && (
                <text
                    className="Axis__label"
                    transform={`translate(${dimensions.boundedWidth / 2}, ${dimensions.marginBottom - 10})`}
                >
                    {label}
                </text>
            )}
        </g>
    )
}

function AxisVertical({ dimensions, label, formatTick, scale, numberOfTicks, ...props }) {
    const ticks = scale.ticks(numberOfTicks)
    const rulesTicks = scale.ticks(numberOfTicks * 5)

    return (
        <g className="Axis AxisVertical" {...props}>
            <line
                className="Axis__line"
                y2={dimensions.boundedHeight}
            />

            {rulesTicks.map((tick, i) => (
                <line
                    key={i}
                    className="Grid__rules"
                    x2={dimensions.boundedWidth}
                    transform={`translate(0, ${scale(tick)})`}
                />
            ))}

            {ticks.map((tick, i) => (
                <line
                    key={i}
                    className="Grid__section-delineator"
                    x1={-10}
                    x2={dimensions.boundedWidth + 30}
                    transform={`translate(-24, ${scale(tick)})`}
                />
            ))}

            {ticks.map((tick, i) => (
                <text // distance until the next tick div by 2
                    key={i}
                    className="Axis__tick"
                    transform={
                        `translate(
                            -20,
                            ${scale(tick) - (
                                (scale(ticks[0]) - scale(ticks[1])) / 2
                            )}
                        )
                    `}
                >
                    {formatTick(tick)}
                </text>
            ))}

            {label && (
                <text
                    className="Axis__label"
                    style={{
                        transform: `translate(-56px, ${dimensions.boundedHeight / 2}px) rotate(-90deg)`
                    }}
                >
                    {label}
                </text>
            )}
        </g>
    )
}
