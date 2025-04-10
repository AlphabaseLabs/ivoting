import { Box, Button, AccordionDetails } from "@mui/material";
import styled from "styled-components";

export const HeaderWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const LogOutButton = styled(Button)`
  border: 1px solid white !important;
  box-sizing: border-box;
  font-family: Lato;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  padding: 5%;
  // width: 145px !important;
  color: white !important;
  text-transform: capitalize;
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 5px 25px !important;
`;
