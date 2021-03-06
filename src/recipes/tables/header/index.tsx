import React from "react";
import {
  SelectableTableHeaderCellProps,
  SimpleTableHeaderCellProps,
  SortableTableHeaderCellProps,
} from "../types";

import { TableHeadCell } from "../../../html/Table";

import { Inline } from "../../../primitives/Inline";
import { TernaryCheckbox } from "../../TernaryCheckbox";
import { Text } from "../../../primitives/Text";
import { Button } from "../../Button";
import { getNextSortState } from "../utils";

export const SimpleTableHeaderCell = (props: SimpleTableHeaderCellProps) => {
  const { headingKey, spacingSize = "MEDIUM", tableHeaderCellConfig } = props;
  const { label, spacingAlignment } = tableHeaderCellConfig;
  return (
    <TableHeadCell
      key={headingKey}
      spacingAlignment={spacingAlignment}
      spacingSize={spacingSize}
    >
      <Text typographyWeight="BOLD" content={label}></Text>
    </TableHeadCell>
  );
};

// TODO - This shouldn't be a regular checkbox but a ternary checkbox
// TODO - Need to be able to select and deselect all rows
// TODO - Need to know how many rows in the table are selected
export const SelectableTableHeaderCell = (
  props: SelectableTableHeaderCellProps<Object>
) => {
  const {
    headingKey,
    spacingSize = "MEDIUM",
    spacingAlignment,
    rowKey,
    selected,
    selectRows,
  } = props;
  return (
    <TableHeadCell
      spacingAlignment={spacingAlignment}
      spacingSize={spacingSize}
      key={headingKey}
    >
      <TernaryCheckbox
        spacingAlignment={spacingAlignment}
        checkedState={selected}
        onPress={() =>
          selectRows({
            rowKey,
            select: selected === "ALL" ? "NONE" : "ALL",
          })
        }
      ></TernaryCheckbox>
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
      <Inline spacingAlignment={spacingAlignment}>
        <Text typographyWeight="BOLD" content={label}></Text>
        <Button
          label={sortButtonLabel}
          onPress={() => setSortState(nextSortState)}
          selected={isCurrentSortAttribute}
        ></Button>
      </Inline>
    </TableHeadCell>
  );
};
