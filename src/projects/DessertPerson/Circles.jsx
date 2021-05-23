import React from "react"
import PropTypes from "prop-types"
import { accessorPropsType } from "components/utils";

const Circles = ({ data, keyAccessor, xAccessor, yAccessor, radius, xScales, dimensions }) => {
    return (
        <React.Fragment>
            {data.map((d, i) => (
                <g key={i}>
                    <circle
                        className="Circles__circle"
                        cx={xAccessor(d, i)}
                        cy={yAccessor(d, i)}
                        r={typeof radius == "function" ? radius(d) : radius}
                    />
                    <text
                        style={{
                            textAnchor: (xAccessor(d, i) > dimensions.boundedWidth - 100) ? "end" : "start",
                            fontSize: "0.65rem",
                        }}
                        x={xAccessor(d, i) + 3}
                        y={yAccessor(d, i) - 3}>
                        { d["Recipe"] }
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
