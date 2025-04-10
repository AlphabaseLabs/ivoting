import { Button, Typography, Container } from "@mui/material";
import styled from "styled-components";

export const HeadingTypo = styled(Typography)<{}>`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #00b07b;
  padding: 3%;
`;

export const StepTypo = styled(Typography)<{}>`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: #494949;
`;

export const ErrorTypo = styled(Typography)<{}>`
  font-family: Lato;
  font-weight: bold;
  font-size: 15px;
  color: red;
`;
export const ContainedButton = styled(Button)<{}>`
  background: #1eb287;
  border-radius: 4px;
  color: white;
  padding: 2%;
  width: 80vw;
  margin-top: 4%;
`;
export const TabsButton = styled(Button)<{
  $bgColor?: any;
  $borderColor?: any;
}>`
  background: ${({ $bgColor }) => $bgColor};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  color: white;
  padding: 1%;
  height: 50px;
  width: 200px;
  border-radius: 0;
`;

export const TopHeading = styled(Typography)`
  margin: 0;
  font-weight: bold;
  font-family: Lato;
  font-size: 1.5rem;
  line-height: 1.334;
  margin-top: 16px;
  color: #00b07b;
`;
export const SubHeading = styled(Typography)`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 18px;
  color: #0cae7d;
  margin: 5px 0;
`;
export const InputLabel = styled(Typography)<{}>`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 18px;
  color: #565656;
  margin-bottom: 1.5%;
`;
