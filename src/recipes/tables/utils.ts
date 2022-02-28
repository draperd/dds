import {
  GetHeadingKeys,
  GetInitialSortState,
  GetNextSortState,
  GetPage,
  PageDown,
  PageUp,
  SortRows,
} from "./types";

/*
 * TABLE HEADERS
 */

export const getHeadingKeys: GetHeadingKeys<Object> = ({ tableHeaderConfig }) =>
  Object.keys(tableHeaderConfig);

/*
 * PAGINATION
 */

export const pageDown: PageDown = ({ pageNumber, setPageNumber }) => {
  // Important to avoid setting a page number below 1 !!!
  if (pageNumber === 1) {
    return;
  }
  setPageNumber(pageNumber - 1);
};

export const pageUp: PageUp = ({
  pageNumber,
  pageSize,
  totalRecords,
  setPageNumber,
}) => {
  // Important not to set a page beyond the maxium...
  const lastRecordOnPage = (pageNumber - 1) * pageSize + pageSize;
  if (lastRecordOnPage >= totalRecords) {
    // The last record on the page is the last record in the data, no action
    return;
  }
  setPageNumber(pageNumber + 1);
};

// TODO: We'd want a test for this obviously :)
export const getPage: GetPage<Object> = ({
  tableData,
  pageNumber,
  pageSize,
}) => {
  // Imagine a page size of 3, 9 rows of data and a page number of 2...
  // Page 2 should be rows 3, 4 & 5 (zero-indexed)
  // debugger;
  const firstRow = (pageNumber - 1) * pageSize; // (2 - 1) * 3 = 3
  const lastRow = firstRow + pageSize; // 3 + 3 = 6
  return tableData.slice(firstRow, lastRow); // Page is 3 -> 6
};

/*
 * SORTING
 */

export const getInitialSortState: GetInitialSortState<Object> = ({
  sortAttribute,
  sortDirection,
}) => {
  return {
    sortAttribute,
    sortDirection,
  };
};

export const getNextSortState: GetNextSortState = ({
  sortState,
  nextSortAttribute,
}) => {
  const { sortDirection, sortAttribute } = sortState;

  if (sortAttribute !== nextSortAttribute) {
    // When a new attribute is selected for sorting, default to "ASCENDING"
    return {
      sortAttribute: nextSortAttribute,
      sortDirection: "ASCENDING",
    };
  } else if (sortDirection === "ASCENDING") {
    // If the same attribute is used, and currently 'ASCENDING', switch to descending
    return {
      sortAttribute,
      sortDirection: "DESCENDING",
    };
  } else if (sortDirection === "DESCENDING") {
    // If the same attribute is used, and currently 'DESCENDING', switch to no sorting
    return {
      sortAttribute,
      sortDirection: "ASCENDING",
    };
  }
  // Shouldn't get here, but just return the sortState provided...
  return sortState;
};

export const sortRows: SortRows<Object> = ({ sortState, tableData }) => {
  const { sortAttribute, sortDirection } = sortState;

  tableData.sort(function (a, b) {
    if (a[sortAttribute] < b[sortAttribute]) {
      return sortDirection === "ASCENDING" ? -1 : 1;
    } else if (a[sortAttribute] > b[sortAttribute]) {
      return sortDirection === "ASCENDING" ? 1 : -1;
    }
    return 0;
  });

  return tableData;
};
