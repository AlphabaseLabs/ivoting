import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { menuZIndex } from '~/styles';
import { MenuContainer } from './elements';

export interface MenuProps {
  title?: React.ReactNode | string;
  getMenuItems: (closeMenu: () => void) => React.ReactNode[];
  iconButtonStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  widerMenu?: boolean;
  iconTestId?: string;
}

export const Menu: React.FC<MenuProps> = ({
  getMenuItems,
  iconStyle,
  iconButtonStyle,
  title,
  widerMenu,
  iconTestId,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(null);
  };

  const closeMenu = () => setAnchorEl(null);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        data-testid={!iconTestId ? 'more-menu-icon' : iconTestId}
        style={{ padding: 0, ...iconButtonStyle }}
      >
        {title || <MoreVertIcon style={{ color: 'white', ...iconStyle }} />}
      </IconButton>
      <MenuContainer
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
        style={{ zIndex: menuZIndex }}
        PaperProps={{
          style: {
            width: widerMenu ? '270px' : '22ch',
          },
        }}
      >
        {getMenuItems(closeMenu)}
      </MenuContainer>
    </div>
  );
};
