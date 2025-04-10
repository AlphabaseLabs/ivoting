import Chip from '@material-ui/core/Chip';
import MuiTabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import styled, { css } from 'styled-components';
import { sizeTabletMin, tabHeaderZIndex, darkBlue } from '~/styles';

export const CloseButtonWrapper = styled.div`
  padding: 0 20px;
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  wide?: boolean;
}

export const Section = styled.div<Props>`
  ${(props) =>
    !props.wide &&
    css`
      background-color: white;
      top: 68px;
      z-index: ${tabHeaderZIndex};
      position: -webkit-sticky;
      position: sticky;
    `};
`;

export const PaperTabBar = styled(Paper)`
  height: 70px;
  display: flex;
  align-items: center;
`;

export const Tabs = styled(MuiTabs)`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .MuiTabs-indicator {
    background-color: ${darkBlue};
  }

  ${sizeTabletMin(css`
    .MuiTabs-flexContainer {
      justify-content: flex-start;
    }
  `)};
`;

interface TabChipProps {
  active: boolean;
}

export const TabChip = styled(Chip)<TabChipProps>`
  height: 35px;
  min-width: 160px;
  background-color: transparent;
  color: ${darkBlue};
  font-size: 12px;
  padding: 5px;
  text-transform: uppercase;
  border: 2px solid rgba(0, 0, 0, 0.23);
  border-color: ${darkBlue};

  ${({ active }) =>
    active &&
    css`
      background-color: ${darkBlue};
      color: white;
    `};

  .Chip-label {
    padding: 0;
  }

  &&:hover {
    cursor: pointer;
    background-color: ${darkBlue};
    color: white;
  }
  &&:focus {
    background-color: ${darkBlue};
    color: white;
  }
`;

export const TabHeader = styled.h5`
  color: ${darkBlue};
  text-transform: uppercase;
  margin: 0;
`;
