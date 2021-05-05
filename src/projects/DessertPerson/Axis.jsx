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
    let hourLabels = [5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 6, 12];
    // Think of these labels as strings (taken from book's x axis)

    let minuteSections = [5, 60, 90, 120, 150, 180, 210, 240, 360, 720];

    let getVerticalMinIntervals = () => {
        let verticalRuleMinutes = [];

        minuteSections.forEach((min, i) => {
            let interval = (minuteSections[i + 1] - min) / 5 || 72;
            // calc the minutes for each vertical rule (as the sections have varying timespans)

            for (i = 0; i <= 5; i++) {
                verticalRuleMinutes.push(min + (i * interval))
            }
        })

        return verticalRuleMinutes;
    }

    console.log(scale(50))

    let minuteRules = getVerticalMinIntervals();

    return (
        <g
            className={classNames("Axis AxisHorizontal", className)}
            transform={`translate(0, ${dimensions.boundedHeight})`} {...props}>
            <line
                className="Axis__line"
                x2={dimensions.boundedWidth}
            />

            {/* Vertical lines */}
            {/* {minuteRules.map((tick, i) => (
                <line
                    key={i}
                    className="Grid__rules"
                    y1={`-${dimensions.boundedHeight}`}
                    transform={`translate(${scale(tick)})`}
                />
            ))} */}

            {minuteSections.map((tick, i) => (
                <line
                    key={i}
                    className="Grid__section-delineator"
                    y1={`-${dimensions.boundedHeight}`}
                    y2={30}
                    transform={`translate(${scale(tick)})`}
                />
            ))}

            {minuteSections.map((tick, i) => (
                <text
                    key={i}
                    className="Axis__tick"
                    transform={`translate(${scale(tick)}, 45)`}
                >
                    {hourLabels[i]}
                    {hourLabels[i] == 5 ? (
                        ` min`
                    ) : (
                        <>
                            hour
                            {hourLabels[i] != 1 && (
                                `s`
                            )}
                        </>
                    )}

                    {hourLabels[i] == 12 && (
                        ` +`
                    )}

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
    const rulesTicks = scale.ticks(numberOfTicks * 7);

    let mainLevels = [1, 2, 3, 4, 5];

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

        return [...new Set(horizIntervals)];
    }

    let levelRules = getHorizontalIntervals();

    return (
        <g className="Axis AxisVertical" {...props}>
            <line
                className="Axis__line"
                y2={dimensions.boundedHeight}
            />

            {/* Horizontal lines */}
            {levelRules.map((tick, i) => (
                <line
                    key={i}
                    className="Grid__rules"
                    x2={dimensions.boundedWidth}
                    transform={`translate(0, ${scale(tick)})`}
                />
            ))}

            {ticks.map((tick, i) => (
                <rect
                    key={i}
                    className="Grid__stripe"
                    x={dimensions.marginLeft}
                    width={dimensions.boundedWidth}
                    height={scale(ticks[0]) - scale(ticks[1])}
                    transform={`translate(-${dimensions.marginLeft}, ${scale(tick)})`}
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
