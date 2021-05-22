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


function AxisHorizontal({ className, dimensions, label, levelRules, formatTick, xRuleDistance, yRuleDistance, yRyleDistanceThrees, scale, numberOfTicks, ...props }) {
    let hourLabels = [5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 6, 12];
    // Think of these labels as strings (taken from matrix's x axis)

    let minuteSections = [5, 60, 90, 120, 150, 180, 210, 240, 360, 720];

    let arrowSize = 10;

    return (
        <g
            className={classNames("Axis AxisHorizontal", className)}
            transform={`translate(0, ${dimensions.boundedHeight})`} {...props}>

            <g>
                {/* Horiz Arrow Top */}
                <line
                    x1={`${dimensions.boundedWidth}`}
                    x2={`${dimensions.boundedWidth - arrowSize - 3}`}
                    y1={0}
                    y2={-arrowSize - 1}
                    className="Axis__arrow Axis__line Axis__line--left horiz"
                />

                {/* Horiz Arrow Bottom */}
                <line
                    x1={`${dimensions.boundedWidth}`}
                    x2={`${dimensions.boundedWidth - arrowSize - 3}`}
                    y1={0}
                    y2={arrowSize + 1}
                    className="Axis__arrow Axis__line Axis__line--right horiz"
                />

                <line
                    className="Axis__line"
                    x1={`-${props.xscales.mins55(props.minrules[1]) + 1.5}`}
                    x2={dimensions.boundedWidth}
                />
            </g>

            {/* Real fake Y axis */}
            <g>
                {/* Vert Arrow Left */}
                <line
                    x1={-xRuleDistance + 1}
                    x2={-xRuleDistance - arrowSize + 1}
                    y1={`${-dimensions.boundedHeight}`}
                    y2={`${-dimensions.boundedHeight + arrowSize}`}
                    className="Axis__arrow Axis__line Axis__line--left vert"
                />

                {/* Vert Arrow Right */}
                <line
                    x1={-xRuleDistance - 1}
                    x2={-xRuleDistance + arrowSize - 1}
                    y1={`${-dimensions.boundedHeight}`}
                    y2={`${-dimensions.boundedHeight + arrowSize}`}
                    className="Axis__arrow Axis__line Axis__line--right vert"
                />

                <line
                    className="Axis__line"
                    y1={`-${dimensions.boundedHeight}`}
                    transform={`translate(-${props.xscales.mins55(props.minrules[1])})`}
                />
            </g>

            {props.minrules.map((tick, i) => (
                <line
                    key={i}
                    className="Grid__rules"
                    y1={`-${dimensions.boundedHeight}`}
                    transform={`translate(${tick < 60 ? props.xscales.mins55(tick)
                        : tick <= 240 ? props.xscales.mins30(tick) + props.sectionwidth
                            : tick <= 360 ? props.xscales.mins120(tick) + (props.sectionwidth * 7)
                                : props.xscales.mins360(tick) + (props.sectionwidth * 8)})`}
                />
            ))}

            {minuteSections.map((tick, i) => (
                <line
                    key={i}
                    className={tick == 5 ? `Grid__rules` : `Grid__section-delineator`}
                    y1={`-${dimensions.boundedHeight}`}
                    y2={30}
                    transform={`translate(${tick < 60 ? props.xscales.mins55(tick)
                        : tick <= 240 ? props.xscales.mins30(tick) + props.sectionwidth
                            : tick <= 360 ? props.xscales.mins120(tick) + (props.sectionwidth * 7)
                                : props.xscales.mins360(tick) + (props.sectionwidth * 8)
                        })`}
                />
            ))}


            {minuteSections.map((tick, i) => (
                <text
                    key={i}
                    className="Axis__tick"
                    transform={`translate(${tick < 60 ? props.xscales.mins55(tick)
                        : tick <= 240 ? props.xscales.mins30(tick) + props.sectionwidth
                            : tick <= 360 ? props.xscales.mins120(tick) + (props.sectionwidth * 7)
                                : props.xscales.mins360(tick) + (props.sectionwidth * 8)}, 45)`}
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


            <g className="Axis__label__wrapper"
                transform={`translate(0, ${yRuleDistance / 2 - 4})`}
            >
                <rect
                    fill="white"
                    width={125}
                    height={xRuleDistance}
                    transform={`translate(1, ${-xRuleDistance / 2 - 4})`}
                />
                <text
                    transform={`translate(${yRuleDistance / 3}, 0)`}
                    className="Axis__label"
                >
                    {label}
                </text>
            </g>
        </g>
    )
}

function AxisVertical({ dimensions, label, xRuleDistance, yRuleDistance, yRyleDistanceThrees, formatTick, levelRules, scale, numberOfTicks, ...props }) {
    const ticks = scale.ticks(numberOfTicks);

    let arrowSize = 8;

    return (
        <g className="Axis AxisVertical" {...props}>

            {/* Horizontal lines */}
            {levelRules.map((tick, i) => (
                <line
                    key={i}
                    className="Grid__rules"
                    x1={`-${props.xscales.mins55(props.minrules[1]) + 1.5}`}
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
                <React.Fragment key={i}>
                    {tick != 1 && (
                        <line
                            key={i}
                            className="Grid__section-delineator"
                            x1={-10}
                            x2={dimensions.boundedWidth + 30}
                            transform={`translate(${props.xscales.mins55(-props.minrules[1] * 1.25)}, ${scale(tick)})`}
                        />
                    )}
                </React.Fragment>
            ))}

            {ticks.map((tick, i) => (
                <text // distance until the next tick div by 2
                    key={i}
                    className="Axis__tick Axis__tick--difficulty"
                    transform={
                        `translate(
                            ${props.xscales.mins55(-props.minrules[1]) - 3},
                            ${scale(tick) + 3 - (
                            (scale(ticks[0]) - scale(ticks[1])) / 2
                        )
                        })
                    `}
                >
                    {formatTick(tick)}
                </text>
            ))}

            <g className="Axis__label__wrapper"
               transform={`translate(${-props.xscales.mins55(props.minrules[1]) + 4}, ${scale(levelRules[0])}), rotate(-90)`}>
                <rect
                    fill="white"
                    width={92}
                    height={xRuleDistance}
                    transform={`translate(1, ${-xRuleDistance / 2 - 4})`}
                />
                <text
                    transform={`translate(${yRuleDistance / 3}, 0)`}
                    className="Axis__label"
                >
                    {label}
                </text>
            </g>

        </g>
    )
}
