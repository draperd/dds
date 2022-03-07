import React, { CSSProperties } from "react";
import { AbstractBox, PublicBoxProps } from "../primitives/AbstractBox";
import { SPACING_XXX_SMALL, SPACING_XX_SMALL } from "../foundations/Spacing";
import { token } from "@atlaskit/tokens";
import "./table.css";

export type TableProps = PublicBoxProps;

const theadStyles: CSSProperties = {
  borderBottom: `${token("color.border")} solid ${SPACING_XX_SMALL}`,
};

const trowStyles: CSSProperties = {
  borderBottom: `${token("color.border")} solid  ${SPACING_XXX_SMALL}`,
};

export const Table = ({
  spacingStyle = "INSET",
  spacingSize = "MEDIUM",
  className = "",
  children,
}: TableProps) => (
  <AbstractBox
    as="table"
    className={`${className} html-table`}
    spacingStyle={spacingStyle}
    spacingSize={spacingSize}
  >
    {children}
  </AbstractBox>
);

export const TableHead = ({
  spacingStyle = "INSET",
  spacingSize = "MEDIUM",
  className = "",
  children,
}: TableProps) => (
  <AbstractBox
    as="thead"
    className={`${className} html-table`}
    spacingStyle={spacingStyle}
    spacingSize={spacingSize}
    style={theadStyles}
  >
    {children}
  </AbstractBox>
);

export const TableBody = ({
  spacingStyle = "INSET",
  spacingSize = "MEDIUM",
  className = "",
  children,
}: TableProps) => (
  <AbstractBox
    as="tbody"
    className={`${className} html-table`}
    spacingStyle={spacingStyle}
    spacingSize={spacingSize}
  >
    {children}
  </AbstractBox>
);

export const TableRow = ({
  spacingStyle = "INSET",
  spacingSize = "MEDIUM",
  className = "",
  selected,
  children,
}: TableProps) => (
  <AbstractBox
    as="tr"
    className={`${className} html-table`}
    spacingStyle={spacingStyle}
    spacingSize={spacingSize}
    selected={selected}
    style={trowStyles}
  >
    {children}
  </AbstractBox>
);

export const TableHeadCell = ({
  spacingStyle = "INSET",
  spacingSize = "MEDIUM",
  spacingAlignment,
  className = "",
  children,
}: TableProps) => (
  <AbstractBox
    as="th"
    className={`${className} html-table`}
    spacingStyle={spacingStyle}
    spacingSize={spacingSize}
    spacingAlignment={spacingAlignment}
  >
    {children}
  </AbstractBox>
);

export const TableDataCell = ({
  spacingStyle = "INSET",
  spacingSize = "MEDIUM",
  spacingAlignment,
  className = "",
  children,
}: TableProps) => (
  <AbstractBox
    as="td"
    className={`${className} html-table`}
    spacingStyle={spacingStyle}
    spacingSize={spacingSize}
    spacingAlignment={spacingAlignment}
  >
    {children}
  </AbstractBox>
);
