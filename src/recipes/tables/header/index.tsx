import React from "react";
import {
  SimpleTableHeaderCellProps,
  SortableTableHeaderCellProps,
} from "../types";

import { TableHeadCell } from "../../../html/Table";

import { Inline } from "../../../primitives/Inline";
import { Text } from "../../../primitives/Text";
import { Button } from "../../Button";
import { getNextSortState } from "../utils";

export const SimpleTableHeaderCell = (props: SimpleTableHeaderCellProps) => {
  const { headingKey, spacingSize = "MEDIUM", tableHeaderCellConfig } = props;
  const { label, spacingAlignment = "LEFT" } = tableHeaderCellConfig;
  return (
    <TableHeadCell
      key={headingKey}
      spacingAlignment={spacingAlignment}
      spacingSize={spacingSize}
    >
      <Text content={label}></Text>
    </TableHeadCell>
  );
};

export const SortableTableHeaderCell = (
  props: SortableTableHeaderCellProps
) => {
  const {
    tableHeaderCellConfig,
    sortState,
    headingKey,
    spacingSize = "MEDIUM",
    setSortState,
  } = props;
  const { label, spacingAlignment = "LEFT" } = tableHeaderCellConfig;
  const { sortDirection, sortAttribute } = sortState;
  const isCurrentSortAttribute = sortAttribute === headingKey;

  const sortButtonLabel =
    !isCurrentSortAttribute || sortDirection === "ASCENDING" ? "^" : "v";
  const nextSortState = getNextSortState({
    sortState,
    nextSortAttribute: headingKey,
  });

  return (
    <TableHeadCell
      key={headingKey}
      spacingAlignment={spacingAlignment}
      spacingSize={spacingSize}
    >
      <Inline>
        <Text content={label}></Text>
        <Button
          label={sortButtonLabel}
          onPress={() => setSortState(nextSortState)}
          selected={isCurrentSortAttribute}
        ></Button>
      </Inline>
    </TableHeadCell>
  );
};
