// @ts-nocheck
import styled, { css } from "styled-components";
import MuiBox from "@material-ui/core/Box";
import MuiTextField from "@material-ui/core/TextField";
import MuiButton from "@material-ui/core/Button";
import { TableCell, Typography, ListItem, Box } from "@material-ui/core";
import {
  lightAshWhite,
  darkBlue,
  sizeTablet,
  background,
  sizeMobileSm,
  sizeDesktopLg,
  sizeDesktop,
  sizeDesktopXl,
} from "~/styles";
import TableRow from "@material-ui/core/TableRow";
import { drawerWidth } from "./MainLayout/elements";
import MuiContainer from "@material-ui/core/Container";

export type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;

export const FormLabel = styled(MuiBox)`
  font-weight: 600;
  line-height: 2;
  margin: 0 4px;
` as React.FC<GetComponentProps<typeof MuiBox>>;

export const FlexRowCenter = styled(MuiBox)`
  display: flex;
  justify-content: center;
  align-items: center;
` as React.FC<GetComponentProps<typeof MuiBox>>;

export const FlexRowStart = styled(MuiBox)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
` as React.FC<GetComponentProps<typeof MuiBox>>;

export const FlexRowSpaceBetween = styled(MuiBox)`
  display: flex;
  justify-content: space-between;
  align-items: center;
` as React.FC<GetComponentProps<typeof MuiBox>>;

export const FlexColStart = styled(MuiBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
` as React.FC<GetComponentProps<typeof MuiBox>>;

export const FlexColCenter = styled(MuiBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
` as React.FC<GetComponentProps<typeof MuiBox>>;

export const FlexColEnd = styled(MuiBox)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: end;
` as React.FC<GetComponentProps<typeof MuiBox>>;

export const FlexAbsoluteCenter = styled(MuiBox)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
` as React.FC<GetComponentProps<typeof MuiBox>>;

export const SideBarDrawerIcon = styled(MuiBox)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  ${({ open }) =>
    css`
      margin-left: ${({ open }) => 20}px;
      transition: 0.2s all ease;
    `}
` as React.FC<GetComponentProps<typeof MuiBox>>;

export const StyledContainer = styled(MuiContainer)<{
  $open: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${({ $open }) =>
    $open
      ? css`
          width: 100%;
          transition: 0.2s all ease;
        `
      : css`
          width: 100%;
          transition: 0.2s all ease;
        `}
  ${sizeDesktopXl(css`
    width: 100%;
  `)};
` as React.FC<GetComponentProps<typeof MuiContainer>>;

export const BackgroundButton = styled(MuiBox)`
  background-color: #0cae7d;
  border-radius: 8px;
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
` as React.FC<GetComponentProps<typeof MuiBox>>;

export const TextField = styled(MuiTextField)`
  .MuiInputBase-input {
    border-radius: 4px;
    background: #fff;
    margin: 5px;
  }
  .MuiFilledInput-input {
    padding: 13px 5px;
    text-align: center;
  }
  .Mui-focused {
    color: rgba(0, 0, 0, 0.54);
  }
  .MuiInputBase-input:focus {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.8);
  }
  .MuiFilledInput-underline:after {
    opacity: 0.5;
    border-bottom: 2px solid rgba(0, 0, 0, 0.87);
  }
  .MuiFilledInput-underline:before {
    border-bottom: none;
  }
` as React.FC<GetComponentProps<typeof MuiTextField>>;

export const StyledTableCellLeft = styled(TableCell)<{}>`
  border-bottom: none;
  border-right: 1px solid #dbdbdb;
  padding: 8px 25px;
  font-weight: bold;
  color: #494949;
  vertical-align: top;
  font-family: Open Sans;
  width: 130px;
`;
export const StyledTableCellRight = styled(TableCell)<{
  $itemTextLength?: number;
  index?: number;
  $isTablet?: boolean;
  $imageSize?: boolean;
}>`
  text-align: left;
  border-bottom: none;
  padding: 8px 25px;
  font-weight: normal;
  color: #494949;
  font-family: Open Sans;
  width: 350px;
`;
export const ItemLeft = styled(ListItem)<{}>`
  text-align: left;
  border-bottom: none;
  padding: 8px 0;
  font-weight: normal;
  color: #494949;
  font-family: Open Sans;
`;

export const BorderButton = styled(MuiButton)<{
  $customBorderColor: string;
  $customColor: string;
  $customMargin: string;
}>`
  border: 1px solid ${({ $customBorderColor }) => $customBorderColor};
  box-sizing: border-box;
  border-radius: 8px;
  font-family: Lato;
  font-weight: 600;
  font-size: 16px;
  height: 45px;
  width: 100px;
  text-align: center;
  color: ${({ $customColor }) => $customColor};
  text-transform: capitalize;
  margin: ${({ $customMargin }) => $customMargin};
`;
export const FillButton = styled(MuiButton)<{}>`
  border: 1px solid #0cae7d;
  font-family: Lato;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: white;
  background: #0cae7d;
  text-transform: capitalize;
  margin: 18px 10px;
  border-radius: 8px;
  height: 45px;
  width: 100px;
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
export const StyledTableRow = styled(TableRow)<{ $rowIdx: number }>`
  ${({ $rowIdx }) =>
    $rowIdx % 2 === 0 &&
    css`
      background-color: ${lightAshWhite};
    `};
`;
export const StyledTableHeader = styled(TableRow)<{}>`
  background-color: #0cae7d;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  color: #ffffff;
  border-bottom: 0;
  flex: 1;
`;
export const StyledTableData = styled(TableCell)<{}>`
  border-bottom: 0;
  display: inline;
  padding: 10px 12px;
  cursor: pointer;
  width: 140px;
`;
export const StyledTableHeaderData = styled(TableCell)<{}>`
  border-bottom: 0;
  display: inline;
  padding: 10px 12px;
  cursor: pointer;
  width: 140px;
  color: white;
`;

export const TextButton = styled(MuiButton)<{}>`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: #494949;
`;
export const CustomButton = styled(MuiButton)<{
  $status: string;
  $color: string;
}>`
  background: ${($status) =>
    $status == "ACTIVE"
      ? "rgba(60, 193, 59, 0.11)"
      : " rgba(240, 55, 56, 0.11)"};
  border: 1px solid
    ${($status) => ($status == "active" ? "#3CC13B" : "#F03738")};
  color: ${($color) => ($color == "success" ? "#3CC13B" : "#F03738")};
  font-size: 1em;

  padding: 0.25em 1em;
  border-radius: 3px;
`;

export const StyledTitle = styled(Typography)<{}>`
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

export const ActiveButton = styled(Box)<{}>`
  border: 1px solid #3cc13b;
  font-family: Lato;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: #3cc13b;
  background: rgba(60, 193, 59, 0.11);
  border-radius: 8px;
  width: 100px;
  padding: 8px;
  text-transform: Capitalize;
`;
export const PendingButton = styled(Box)<{}>`
  border: 1px solid #f59320;
  font-family: Lato;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: #f59320;
  background: rgba(245, 147, 32, 0.11);
  border-radius: 8px;
  width: 100px;
  padding: 8px;
  text-transform: Capitalize;
`;
