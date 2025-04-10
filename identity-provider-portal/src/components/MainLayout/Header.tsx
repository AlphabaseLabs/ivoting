import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { Toolbar, Button, ButtonGroup, Typography } from "@material-ui/core";
import { FlexRowCenter } from "~/components";
import { darkBlue, headerHeight, headerZindex } from "~/styles";
import { BorderButton, HeaderWrapper } from "./elements";
import { useAppProvider } from "~/hooks";
import { clearSessionStorage } from "../../Services/userServices";
import urduLogo from "../../assets/urduLogo.png";
import engLogo from "../../assets/engLogo.png";
import IconButton from "@material-ui/core/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
export interface HeaderProps {
  heading?: string;
}

export const Header: React.FC<HeaderProps> = ({ heading }) => {
  const history = useHistory();
  const { showSideNav, toggleSideNav } = useAppProvider();
  const logout = () => {
    clearSessionStorage();
    history.push("/");
  };
  return (
    <>
      <HeaderWrapper
        open={showSideNav}
        bgcolor="#0A5740"
        zIndex={headerZindex}
        boxShadow="0 0 2px lightgrey"
        top={0}
        position="fixed"
        height={`${headerHeight}px`}
      >
        <FlexRowCenter pl="20px" height="80px">
          <Box
            fontSize={{
              xs: "16px",
              mb: "20px",
              sm: "24px",
              lg: "28px",
            }}
            style={{
              color: darkBlue,
              textTransform: "capitalize",
              alignSelf: "center",
            }}
            component="span"
          >
            <img src={engLogo} />
          </Box>
        </FlexRowCenter>
        <FlexRowCenter pr="20px">
          <BorderButton
            $customBorderColor="#ffffff"
            $customColor="#ffffff"
            $customMargin="18"
            onClick={() => history.push("/")}
          >
            <LogoutIcon />
            log out
          </BorderButton>
        </FlexRowCenter>
      </HeaderWrapper>
    </>
  );
};
