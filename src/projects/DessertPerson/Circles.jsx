import React from "react"
import PropTypes from "prop-types"
import { accessorPropsType } from "components/utils";
import classNames from "classnames";

const Circles = ({ data, dots, isLoaded, xAccessor, sectionColors, bookSections, currentLockedData, currentHoveredData, radius, dimensions, parsedQueryParams }) => {
    let getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    return (
        <React.Fragment>
            {dots.map((d, i) => (
                <g key={i} style={{
                    opacity:
                        !parsedQueryParams.chapter || parsedQueryParams.chapter.includes(data[i].section.toLowerCase().split(' ')[0]) ? 1
                            : 0.2
                }}>
                    <circle
                        style={{ opacity: !isLoaded ? '0' : 1 }}
                        className={classNames("Circles__circle", {"Circles__circle--hovered" : currentHoveredData && currentHoveredData.recipe == data[i].recipe})}
                        cx={!isLoaded ? getRandomArbitrary(0, dimensions.boundedWidth) : d.x}
                        cy={!isLoaded ? dimensions.boundedHeight : d.y}
                        r={typeof radius == "function" ? radius(d) : radius}
                        fill={(parsedQueryParams.extra && parsedQueryParams.extra.includes("colors")) ? sectionColors[bookSections.indexOf(data[i].section)] : `#733a41`}
                    />
                    <g style={{ opacity: !isLoaded ? 0 : 1, transition: `500ms ease-in-out all 200ms` }}>
                        <text
                            className={classNames("Circle__label", {"Circle__label--active" : (currentHoveredData && currentHoveredData.recipe == data[i].recipe) || (currentLockedData && currentLockedData.recipe == data[i].recipe)})}
                            style={{
                                textAnchor: (xAccessor(d, i) > dimensions.boundedWidth - 100) ? "end" : "start",
                                display: (parsedQueryParams.extra && parsedQueryParams.extra.includes("voronoi")) && "none",
                                transform: `translate(${d.x + 3}px, ${d.y - 3}px)`
                            }}
                            >
                            {data[i]["recipe"]}
                        </text>
                    </g>

                </g>
            ))}
        </React.Fragment>
    )
}

Circles.propTypes = {
    data: PropTypes.array,
    keyAccessor: accessorPropsType,
    xAccessor: accessorPropsType,
    yAccessor: accessorPropsType,
    radius: accessorPropsType,
}

Circles.defaultProps = {
    radius: 3,
}

export default Circles
