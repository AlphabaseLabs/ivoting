import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import MuiTable from "@material-ui/core/Table";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import { useHistory } from "react-router-dom";
import { useIsTablet } from "~/hooks";
import { darkBlue } from "~/styles";
import { ResponsiveTableCellList } from "./ResponsiveTableCellList";
import {
  BlueActionText,
  StyledTableRow,
  ImageThumbWrapper_,
  StyledTableCell,
} from "./elements";
import Box from "@material-ui/core/Box";

export const ImageThumbWrapper = ImageThumbWrapper_;
export type Row = { data: Array<JSX.Element>; goTo?: string };

type TableContents = {
  headers: Array<JSX.Element>;
  rows: Array<any>;
};

export interface TableProps {
  tableContent: TableContents;
  noContent?: JSX.Element;
  style?: React.CSSProperties;
}

export const Table: React.FC<TableProps> = ({
  tableContent,
  noContent = null,
  style = {},
  ...props
}) => {
  const history = useHistory();
  const isTablet = useIsTablet();
  const width = isTablet
    ? "auto"
    : `calc(100% / ${tableContent.headers.length})`;
  return (
    <>
      <TableContainer style={{ ...style }}>
        <MuiTable>
          <Hidden only={["sm", "xs"]}>
            <TableHead
              style={{
                flex: 1,
                background: "#0B9B70",
              }}
            >
              <TableRow
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {tableContent.headers.map((header, idx) => (
                  <TableCell
                    key={idx}
                    component="th"
                    scope="row"
                    style={{
                      width,
                      borderBottom: "none",
                    }}
                  >
                    <BlueActionText> {header} </BlueActionText>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Hidden>
          {tableContent && tableContent.rows[0].length > 0 ? (
            <TableBody>
              {tableContent.rows.map((row, idx) => (
                <StyledTableRow
                  data-testid={`table-row-${idx}`}
                  $rowIdx={idx}
                  key={idx}
                  onClick={() => {
                    if (row.goTo) history.push(row.goTo);
                  }}
                  style={{
                    cursor: row.goTo && "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ResponsiveTableCellList
                    headers={tableContent.headers}
                    {...props}
                    renderCellComponent={({ index, item }) => {
                      return (
                        <StyledTableCell
                          key={index}
                          data-testid={`table-cell-${index}`}
                          style={{
                            color: darkBlue,
                            width,
                            justifyContent: "space-between",
                          }}
                          $isTablet={isTablet}
                          $itemTextLength={
                            typeof item === "string" ? item.length : 1
                          }
                        >
                          <Box
                            display={{ xs: "flex", md: "none" }}
                            style={{ fontWeight: "bold" }}
                          >
                            {tableContent?.headers?.[index]}
                          </Box>
                          <Box> 1</Box>
                        </StyledTableCell>
                      );
                    }}
                    tableData={row}
                  />
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            console.log(tableContent.rows[0])
          )}
        </MuiTable>
      </TableContainer>
      {!tableContent.rows.length && noContent}
    </>
  );
};
