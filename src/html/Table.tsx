import React from "react";
import { AbstractBox, PublicBoxProps } from "../primitives/AbstractBox";
import "./table.css";

export type TableProps = PublicBoxProps;

export const Table = ({
  spacingStyle = "FLUSH",
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
  spacingStyle = "FLUSH",
  spacingSize = "MEDIUM",
  className = "",
  children,
}: TableProps) => (
  <AbstractBox
    as="thead"
    className={`${className} html-table`}
    spacingStyle={spacingStyle}
    spacingSize={spacingSize}
  >
    {children}
  </AbstractBox>
);

export const TableBody = ({
  spacingStyle = "FLUSH",
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
  spacingStyle = "FLUSH",
  spacingSize = "MEDIUM",
  className = "",
  children,
}: TableProps) => (
  <AbstractBox
    as="tr"
    className={`${className} html-table`}
    spacingStyle={spacingStyle}
    spacingSize={spacingSize}
  >
    {children}
  </AbstractBox>
);

export const TableHeadCell = ({
  spacingStyle = "FLUSH",
  spacingSize = "MEDIUM",
  className = "",
  children,
}: TableProps) => (
  <AbstractBox
    as="th"
    className={`${className} html-table`}
    spacingStyle={spacingStyle}
    spacingSize={spacingSize}
  >
    {children}
  </AbstractBox>
);

export const TableDataCell = ({
  spacingStyle = "FLUSH",
  spacingSize = "MEDIUM",
  className = "",
  children,
}: TableProps) => (
  <AbstractBox
    as="td"
    className={`${className} html-table`}
    spacingStyle={spacingStyle}
    spacingSize={spacingSize}
  >
    {children}
  </AbstractBox>
);
