import React from "react"
import PropTypes from "prop-types"
import { accessorPropsType } from "components/utils";

const Circles = ({ data, dots, isLoaded, xAccessor, yAccessor, radius, dimensions, parsedQueryParams }) => {
    let getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    return (
        <React.Fragment>
            {dots.map((d, i) => (
                <g key={i} style={{
                    opacity:
                        !parsedQueryParams.category || parsedQueryParams.category.includes(data[i].section.toLowerCase().split(' ')[0]) ? 1
                            : 0.2
                }}>
                    <circle
                        style={{ opacity: !isLoaded ? '0' : 1 }}
                        className="Circles__circle"
                        cx={!isLoaded ? getRandomArbitrary(0, dimensions.boundedWidth) : d.x}
                        cy={!isLoaded ? dimensions.boundedHeight : d.y}
                        r={typeof radius == "function" ? radius(d) : radius}
                    />

                    {/* <circle
                        className="Circles__circle"
                        cx={!isLoaded ? getRandomArbitrary(0, dimensions.boundedWidth) : d.x}
                        cy={!isLoaded ? dimensions.boundedHeight : d.y}
                        r={typeof radius == "function" ? radius(d) : radius}
                    /> */}
                    {/* <g>
                        <text
                            className="Circle__label"
                            style={{
                                textAnchor: (xAccessor(d, i) > dimensions.boundedWidth - 100) ? "end" : "start",
                                opacity: parsedQueryParams.extra && parsedQueryParams.extra.includes("voronoi") ? 0.1 : 1,
                                transform: `translate(${d.x + 3}px, ${d.y - 3}px)`
                            }}
                            >
                            {data[i]["recipe"]}
                        </text>
                    </g> */}

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
