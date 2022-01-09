import React from "react";

import "./subgrid.css";

interface SubGridProps {
  columns: number,
  children?: React.ReactNode,
}

// Could SubGrid be an implementation of GridItem to reduce duplication and allow SubGrid to be a direct child of Grid?
export const SubGrid = ({ columns, children}: SubGridProps) => (
    <div className="subgrid" style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}>
      {children}
    </div>
)