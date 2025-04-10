import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import styled, { css } from 'styled-components';
import { sizeMobile, wildWaterMelon, darkBlue } from '~/styles';

export const MaterialTabs = styled(MuiTabs)`
  display: flex;
  justify-content: center;
  align-items: center;

  ${sizeMobile(css`
    display: block;
  `)};
  .MuiTabs-indicator {
    background-color: ${darkBlue};
  }
`;

export const MaterialTab = styled(MuiTab)`
  min-width: 120px;
`;

export const TabContent = styled.div`
  height: auto;
  background-color: #fff;
  border-top: solid 1px ${wildWaterMelon};
`;

export const TabPane = styled.div``;
