import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import MuiTable from '@material-ui/core/Table';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NoContentView } from '~/components'
import { useIsTablet } from '~/hooks';
import { darkBlue, teelish } from '~/styles';
import { Pagination, PaginationProps } from './Pagination';
import { ResponsiveTableCellList } from './ResponsiveTableCellList';
import {
  HeaderText,
  StyledTableRow,
  ImageThumbWrapper_,
  StyledTableCell,
} from './elements';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

export const ImageThumbWrapper = ImageThumbWrapper_;
export type Row = { data: Array<JSX.Element>; goTo?: { path: string, state?: unknown } };

type TableContents = {
  headers: Array<{ data: JSX.Element, percentWidth?: string }>;
  rows: Array<Row>;
};

export interface TableProps {
  loading?: boolean;
  isVariableWidth?: boolean;
  tableContent: TableContents;
  pagination?: PaginationProps;
  noContent?: JSX.Element;
  style?: React.CSSProperties;
}

export const Table: React.FC<TableProps> = ({
  isVariableWidth = false,
  loading = false,
  pagination,
  tableContent,
  noContent = <NoContentView message="No Records Found" />,
  style = {},
  ...props
}) => {
  const history = useHistory();
  const isTablet = useIsTablet();
  const width = isTablet
    ? 'auto'
    : `calc(100% / ${tableContent.headers.length})`;
  return (
    <>
      <TableContainer style={{ ...style }}>
        <MuiTable>
          <Hidden only={['sm', 'xs']}>
            <TableHead
              style={{
                flex: 1,
                background: darkBlue,
              }}
            >
              <TableRow
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {tableContent.headers.map(({ data: header, percentWidth }, idx) => (
                  <TableCell
                    key={idx}
                    component="th"
                    scope="row"
                    style={{
                      padding: "8px 4px",
                      width: isTablet ? 'auto' : isVariableWidth ? percentWidth : width,
                      borderBottom: 'none',
                    }}
                  >
                    <HeaderText> {header} </HeaderText>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Hidden>
          {loading ? <NoContentView message={<Box color={teelish}><CircularProgress color="inherit" /></Box>} /> :
            tableContent.rows.length ? (
              <TableBody>
                {tableContent.rows.map((row, idx) => (
                  <StyledTableRow
                    data-testid={`table-row-${idx}`}
                    $rowIdx={idx}
                    key={idx}
                    onClick={() => {
                      if (row.goTo) history.push(row.goTo.path, row.goTo.state || {});
                    }}
                    style={{
                      cursor: row.goTo && 'pointer',
                      display: 'flex',
                      alignItems: 'center',
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
                              width: isTablet ? 'auto' : isVariableWidth ? tableContent?.headers?.[index]?.percentWidth || 'auto' : width,
                              justifyContent: 'space-between',
                            }}
                            $isTablet={isTablet}
                            $itemTextLength={
                              typeof item === 'string' ? item.length : 1
                            }
                          >
                            <Box
                              display={{ xs: 'flex', md: 'none' }}
                              style={{ width: "100%", fontWeight: 'bold' }}
                            >
                              <Typography variant="h5"> {tableContent?.headers?.[index]?.data || ''}</Typography>
                            </Box>
                            <Box width="100%"> {item}</Box>
                          </StyledTableCell>
                        );
                      }}
                      tableData={row.data}
                    />
                  </StyledTableRow>
                ))}
              </TableBody>
            ) : noContent}
        </MuiTable>
        {!loading && pagination && <Pagination {...pagination} />}
      </TableContainer>
    </>
  );
};
