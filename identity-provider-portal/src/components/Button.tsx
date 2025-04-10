import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import MuiButton, { ButtonProps } from '@material-ui/core/Button';
import styled, { css } from 'styled-components';
import {
  FlexRowCenter,
  FlexAbsoluteCenter,
  GetComponentProps,
} from '~/components';
import { ashWhite, darkBlue, wildWaterMelon } from '~/styles';
import React from 'react';

interface StyledButtonProps {
  kind?: 'watermelon' | 'white-backgroud' | 'dark-blue';
}

const buttonStyles = css`
  ${({ kind }: StyledButtonProps & GetComponentProps<typeof MuiButton>) => {
    switch (kind) {
      case 'watermelon':
        return css`
          background: ${wildWaterMelon};
          color: #fff;
          &:hover {
            color: ${wildWaterMelon};
            border-color: ${wildWaterMelon};
            text-decoration: none;
          }
        `;
      case 'white-backgroud':
        return css`
          background: #fff;
          color: #000;
          &:hover {
            color: ${wildWaterMelon};
            text-decoration: none;
          }
        `;
      case 'dark-blue':
        return css`
          background: ${darkBlue};
          color: #fff;
          &:hover {
            background: #fff;
            color: ${darkBlue};
            text-decoration: none;
          }
        `;

      default:
        return css``;
    }
  }}
`;

const StyledButton = styled(MuiButton)<StyledButtonProps>`
  margin-top: 10px;
  margin-bottom: 10px;
  background: #fff;
  padding: 5px 10px;
  text-transform: capitalize;
  maxwidth: 280px;
  ${buttonStyles}
  ${({ disabled }) =>
    disabled &&
    css`
      background: ${ashWhite};
      color: #fff !important;
    `}
` as React.FC<StyledButtonProps & GetComponentProps<typeof MuiButton>>;

interface Props extends StyledButtonProps {
  showSpinner?: boolean;
  spinnerProps?: CircularProgressProps;
  styles?: React.CSSProperties;
}

export const Button: React.FC<Props & ButtonProps> = ({
  children,
  showSpinner = false,
  styles,
  spinnerProps = {},
  disabled,
  ...props
}) => {
  return (
    <FlexRowCenter position="relative">
      {showSpinner && (
        <FlexAbsoluteCenter>
          <CircularProgress {...spinnerProps} />
        </FlexAbsoluteCenter>
      )}
      <StyledButton
        disabled={showSpinner || disabled}
        style={{
          ...styles,
        }}
        {...props}
      >
        {children}
      </StyledButton>
    </FlexRowCenter>
  );
};
