import styled, { css } from "styled-components";
import { lightAshWhite, darkBlue, sizeTablet, white } from "~/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MuiBox from "@material-ui/core/Box";

export const BlueActionText = styled.span`
  color: ${white};
  margin-bottom: 14px;
  font-size: 14px;
  letter-spacing: 3px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const StyledTableRow = styled(TableRow)<{ $rowIdx: number }>`
  ${({ $rowIdx }) =>
    $rowIdx % 2 === 0 &&
    css`
      background-color: ${lightAshWhite};
    `};
`;

export const NoContentTopHeader = styled.div`
  text-align: center;
  margin: auto;
  margin-top: 20px;
  background-color: ${lightAshWhite};
  width: inherit;
  padding: 24px;
  margin-bottom: 80px;
`;

export const StyledTableCell = styled(TableCell)<{
  $itemTextLength?: number;
  index?: number;
  $isTablet?: boolean;
  $imageSize?: boolean;
}>`
  text-align: left;
  border-bottom: none;
  align-items: center;
  display: flex;
  justify-content: space-arround;
  padding: 16px;
  ${({ $isTablet }) => $isTablet && "padding: 4px;"}
  ${({ index }) => index === 0 && "padding-left: 10px;"}
    ${({ $itemTextLength }) => $itemTextLength === 0 && "padding: 0px"}
    ${({ $imageSize }) =>
    sizeTablet(
      css`
        font-size: 12px;
        padding: 4px;
        width: ${$imageSize ? "75px" : "100%"};
      `
    )};
`;

export const ImageThumbWrapper_ = styled(MuiBox)`
  overflow: hidden;
  border-radius: 4px;
  height: 75px;
  width: 75px;
`;
