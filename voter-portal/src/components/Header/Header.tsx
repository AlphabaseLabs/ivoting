import React, { useState } from "react";
import {
  AppBar,
  Button,
  ButtonGroup,
  Toolbar,
  Menu,
  MenuItem,
  Box,
  Hidden,
  Typography,
} from "@mui/material";
import UrduHeader from "../../assets/urduHeader.svg";
import EnglishHeader from "../../assets/englishHeader.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { connect } from "react-redux";
import { changeSystemLanguage } from "../../Store/rootAction";
import { LOCALES } from "../../i18n";
import mobileEcpLogo from "../../assets/mobileEcpLogo.svg";
import PhoneIcon from "@mui/icons-material/Phone";

const Header = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const open = Boolean(anchorEl);
  const handleClickDrop = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDrop = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="relative"
      style={{ backgroundColor: "#094634", boxShadow: "none" }}
    >
      <Hidden smDown>
        <Toolbar variant="dense">
          <Box display="flex" alignItems="center" width="100%">
            <Box
              display="flex"
              flexGrow={1}
              justifyContent={{ xs: "center", md: "left" }}
            >
              <img src={EnglishHeader} alt="urdu" width="200px" height="30px" />
            </Box>
            <Hidden mdDown>
              <Box display="flex" flexGrow={1} justifyContent="center">
                <ButtonGroup>
                  <Button
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      color: props.systemLang == "en-US" ? "#00B07B" : "white",
                    }}
                    onClick={() => props.changeSystemLanguage(LOCALES.ENGLISH)}
                  >
                    English
                  </Button>
                  <Button
                    sx={{
                      textTransform: "none",
                      color: props.systemLang == "en-UR" ? "#00B07B" : "white",
                      fontWeight: "bold",
                    }}
                    onClick={() => props.changeSystemLanguage(LOCALES.URDU)}
                  >
                    اردو
                  </Button>
                </ButtonGroup>
              </Box>
            </Hidden>

            <Hidden mdUp>
              <Box display="flex" flexGrow={1} justifyContent="center">
                <Button
                  id="basic-button"
                  variant="outlined"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickDrop}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  Language
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseDrop}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleCloseDrop}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      onClick={() =>
                        props.changeSystemLanguage(LOCALES.ENGLISH)
                      }
                    >
                      English
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleCloseDrop}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      onClick={() => props.changeSystemLanguage(LOCALES.URDU)}
                    >
                      Urdu
                    </Box>
                  </MenuItem>
                </Menu>
              </Box>
            </Hidden>

            <Hidden mdDown>
              <Box
                display="flex"
                flexGrow={1}
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <img src={UrduHeader} alt="urdu" width="200px" height="50px" />
              </Box>
            </Hidden>
          </Box>
        </Toolbar>
      </Hidden>
      <Hidden smUp>
        <Toolbar
          variant="dense"
          sx={{ backgroundColor: "#EAF4F2", padding: "1%" }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            width="100%"
            justifyContent="flex-start"
          >
            <Box
              display="flex"
              flexGrow={1}
              pl={2}
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <img src={mobileEcpLogo} alt="urdu" />
              <Typography
                sx={{
                  padding: "2%",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  fontSize: "17.5px ",
                  color: "#019366",
                }}
              >
                ECP
              </Typography>
            </Box>

            <Box
              display="flex"
              flexGrow={1}
              pr={2}
              alignItems="flex-end"
              justifyContent="flex-end"
            >
              <PhoneIcon
                sx={{
                  color: "#26C696",
                  border: "2px solid #26C696",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  padding: "2%",
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </Hidden>
    </AppBar>
  );
};
const mapStateToProps = (state: any) => {
  return {
    systemLang: state.rootReducer.systemLanguage,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    changeSystemLanguage: (lang: string) =>
      dispatch(changeSystemLanguage(lang)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
