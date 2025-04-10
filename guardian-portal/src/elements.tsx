import { Button, Box, Container, Typography } from "@mui/material";
import styled from "styled-components";

export const FlexColCenter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FlexColStart = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const FlexColEnd = styled(Box)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
`;

export const FlexRowCenter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexRowStart = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
`;

export const FlexRowEnd = styled(Box)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;
`;

export const ShadowContainer = styled(Container)`
  background: #fff;
  border: 1px solid #c7c7c7;
  padding: 2%;
  border-radius: 8px;
`;
export const ErrorTypo = styled(Typography)`
  color: red;
  font-size: 16px;
  margin-top: 4%;
`;
export const MainHeading = styled(Typography)`
  color: #1f7f62;
  margin-top: 35px !important;
  text-transform: uppercase;
  font-family: Fira Sans !important;
  font-weight: 500;
  line-height: 1.235;
`;
