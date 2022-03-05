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
    rowKey,
    spacingSize = "MEDIUM",
    spacingAlignment = "LEFT",
    tableRowData,
    rowNumber,
    columnNumber,
    selectRow,
    selected,
  } = props;
  const rowId = tableRowData[rowKey];
  return (
    <TableDataCell
      key={`${rowNumber}_${columnNumber}`}
      spacingAlignment={spacingAlignment}
      spacingSize={spacingSize}
    >
      <Input
        type="CHECKBOX"
        id={rowId}
        name={rowId}
        onChange={() =>
          selectRow({ key: tableRowData[rowKey], selected: true })
        }
        checked={selected}
      ></Input>
    </TableDataCell>
  );
};
