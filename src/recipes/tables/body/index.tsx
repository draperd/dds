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
  const key = tableRowData[rowKey];
  return (
    <TableDataCell
      key={`${rowNumber}_${columnNumber}`}
      spacingAlignment={spacingAlignment}
      spacingSize={spacingSize}
    >
      <Input
        type="CHECKBOX"
        id={key}
        name={key}
        onChange={() =>
          selectRow({ key: tableRowData[rowKey], selected: !selected })
        }
        checked={selected}
      ></Input>
    </TableDataCell>
  );
};
