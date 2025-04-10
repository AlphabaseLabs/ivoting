import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const StyledTitle = styled(Typography)`
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  line-height: 45px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #4f4f4f;
  margin-bottom: 3%;
`;
export const FlexRowSpaceBetween = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledLink = styled((props) => (
  <NavLink
    activeStyle={{
      fontWeight: "bold",
    }}
    {...props}
  />
))`
  font-weight: regular;
  text-decoration: none;
  color: black;
`;
export const StyledTypography = styled(Typography)`
  font-weight: inherit;
  color: inherit;
  text-decoration: none;
  line-height: 3;
`;
export const StyledButton = styled(Button)`
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: #ffffff !important;
  background: #0cae7d !important;
  border-radius: 8px;
`;
export const TableButton = styled(Button)`
  margin: 10px 10px 0 0 !important;
  margin-bottom: 10px;
  background: white !important;
  padding: 5px 10px;
  text-transform: capitalize;
  maxwidth: 280px;
  color: black !important;
`;
export const ModalButton = styled(Button)`
  margin: 10px 10px 0 0;
  margin-bottom: 10px;
  background: #c5c2c2 !important;
  padding: 5px 10px;
  text-transform: capitalize;
  color: black !important;
`;
export const StyledModalButton = styled(Button)`
  margin: 10px 10px 0 0;
  margin-bottom: 10px;
  background: #b94848 !important;
  padding: 5px 10px;
  text-transform: capitalize;
  color: #b9afaf !important;
`;
export const FixedBox = styled(Box)`
  position: fixed;
  z-index: 0;
`;
export const Relativebox = styled(Box)`
  position: relative;
  background: #fff;
  z-index: 1;
  padding: 50px;
`;
export const StyledTableCell = styled(TableCell)`
  width: 50%;
  text-align: center;
`;
export const StyledTableRow = styled(TableRow)<{ $rowIdx: number }>`
  ${({ $rowIdx }) =>
    $rowIdx % 2 === 0
      ? css`
          background-color: #e1e1e1;
        `
      : css`
          background-color: #f9f9f9;
        `};
`;
// export const StyledButton = styled(Button)`
//   margin: 10px 10px 0 0;
//   margin-bottom: 10px;
//   background: #c5c2c2 !important;
//   padding: 5px 10px;
//   text-transform: capitalize;
//   color: black !important;
// `;
