import styled, { css } from "styled-components";
import { GetComponentProps } from "~/components";
import MuiDrawer from "@material-ui/core/Drawer";
import MuiBox from "@material-ui/core/Box";
import MuiButton from "@material-ui/core/Button";

import MuiTypography from "@material-ui/core/Typography";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { NavLink } from "react-router-dom";
import { darkBlue, sizeMobile, headerHeight } from "~/styles";
interface Props {
  open: boolean;
}

export const HeaderWrapper = styled(MuiBox)<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${({ open }) =>
    open &&
    css`
      width: 100%;
      transition: 0.2s all ease;
    `}
  ${sizeMobile(css`
    width: 100%;
  `)}
` as React.FC<Props & GetComponentProps<typeof MuiBox>>;

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
  color: ${darkBlue};
` as React.FC<GetComponentProps<typeof NavLink>>;

export const StyledTypography = styled(MuiTypography)`
  font-weight: inherit;
  color: inherit;
  text-decoration: none;
  line-height: 3;
  ${sizeMobile(css`
    line-height: 2;
  `)}
` as React.FC<GetComponentProps<typeof MuiTypography>>;

export const drawerWidth = 300;
export const drawerWidthClose = 0;

export const Drawer = styled(MuiDrawer)`
  .MuiDrawer-paper {
    top: 0px;
    transition: 0.2s all ease;
    width: ${({ open }) => (open ? drawerWidth : drawerWidthClose)}px;
    margin: 0;
    ${({ open }) =>
      sizeMobile(css`
        display: ${open ? "flex" : "none"};
        width: 100%;
        padding: 0px;
        top: ${headerHeight}px;
      `)}
  }
` as React.FC<GetComponentProps<typeof MuiDrawer>>;

export const SearchContainer = styled(({ open, ...props }) => (
  <MuiBox {...props} />
))<Props>`
  margin-left: ${drawerWidthClose}px;
  ${({ open }) =>
    open &&
    css`
      // width: calc(100% - ${drawerWidth}px);
      // margin-left: ${drawerWidth}px;
      transition: 0.2s all ease;
    `}
  ${sizeMobile(css`
    width: 100%;
    margin-left: 0;
  `)};
` as React.FC<Props & GetComponentProps<typeof MuiBox>>;

export const ExpansionPanel = styled(MuiExpansionPanel)`
  font-weight: ${({ expanded }) => (expanded ? "bold" : "normal")};
  box-shadow: none;
  background-color: transparent;
  text-align: center;
  &:before {
    background-color: transparent;
  }
  &.Mui-expanded {
    margin: 0;
  }
  ${sizeMobile(css`
    min-width: 50%;
  `)}
` as React.SFC<GetComponentProps<typeof MuiExpansionPanel>>;

export const ExpansionPanelDetails = styled(MuiExpansionPanelDetails)`
  padding: 0;
  font-weight: normal;
  display: block;
  text-align: center;
` as React.SFC<GetComponentProps<typeof MuiExpansionPanelDetails>>;

export const ExpansionPanelSummary = styled(MuiExpansionPanelSummary)`
  padding: 0;
  text-align: center;
  .MuiExpansionPanelSummary-content {
    margin: 0;
    display: block;
  }
  &.Mui-expanded {
    min-height: 0;
  }
` as React.SFC<GetComponentProps<typeof MuiExpansionPanelSummary>>;

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
  padding: 5px 20px;
  text-align: center;
  height: 45px;
  color: ${({ $customColor }) => $customColor};
  text-transform: capitalize;
  margin: ${({ $customMargin }) => $customMargin}px;
`;
