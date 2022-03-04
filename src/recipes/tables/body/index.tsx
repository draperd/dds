import React from "react";
import {
  SelectRowTableDataCellProps,
  SimpleTableDataCellProps,
} from "../types";

import { TableDataCell } from "../../../html/Table";
import { Input } from "../../../html/Input";

import { Text } from "../../../primitives/Text";

export const SimpleTableDataCell = (
  props: SimpleTableDataCellProps<Object>
) => {
  const {
    headingKey,
    spacingSize = "MEDIUM",
    spacingAlignment = "LEFT",
    tableRowData,
    rowNumber,
    columnNumber,
  } = props;
  return (
    <TableDataCell
      key={`${rowNumber}_${columnNumber}`}
      spacingAlignment={spacingAlignment}
      spacingSize={spacingSize}
    >
      <Text content={tableRowData[headingKey]}></Text>
    </TableDataCell>
  );
};

export const SelectRowTableDataCell = (
  props: SelectRowTableDataCellProps<Object>
) => {
  const {
    selectKey,
    spacingSize = "MEDIUM",
    spacingAlignment = "LEFT",
    tableRowData,
    rowNumber,
    columnNumber,
  } = props;
  const rowId = tableRowData[selectKey];
  return (
    <TableDataCell
      key={`${rowNumber}_${columnNumber}`}
      spacingAlignment={spacingAlignment}
      spacingSize={spacingSize}
    >
      <Input type="CHECKBOX" id={rowId} name={rowId}></Input>
    </TableDataCell>
  );
};
