import React from "react"
import PropTypes from "prop-types"
import { accessorPropsType } from "components/utils";

const Circles = ({ data, dots, xAccessor, yAccessor, radius, dimensions }) => {
    return (
        <React.Fragment>
            {dots.map((d, i) => (
                <g key={i}>
                    <circle
                        className="Circles__circle"
                        cx={d.x}
                        cy={d.y}
                        r={typeof radius == "function" ? radius(d) : radius}
                    />
                    <text
                        className="Circle__label"
                        style={{
                            textAnchor: (xAccessor(d, i) > dimensions.boundedWidth - 100) ? "end" : "start",
                        }}
                        x={d.x + 3}
                        y={d.y - 3}>
                        { data[i]["Recipe"] }
                    </text>
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
