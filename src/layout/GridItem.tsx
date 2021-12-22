import React from "react";

import "./griditem.css";

// There might be some elaborate ways to calculate row spans, but it's probably realistic to expect
// developers to be able to work out the layout they want for themselves.
interface GridItemProps {
    columnSpan?: number,
    rowSpan?: number,
    children?: React.ReactNode,
}

export const GridItem = ({ columnSpan = 1, rowSpan = 1, children}: GridItemProps) => (
    <div className="griditem" style={{gridColumnStart: `span ${columnSpan}`, gridRowStart: `span ${rowSpan}`}}>
      {children}
    </div>
)