import { Button, Box, Container, Typography } from "@mui/material";
import styled from "styled-components";

export const FlexBox = styled(Box)<{ $direction?: string }>`
  display: flex;
  align-items: ${({ $direction }) =>
    $direction == "start" ? "flex-start" : "flex-end"};
  justify-content: ${({ $direction }) =>
    $direction == "start" ? "flex-start" : "flex-end"};
  flex-direction: column;
`;

export const FlexColCenter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
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
  flex-direction: row;
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
export const MsgHeading = styled(Typography)`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #424242;
`;
