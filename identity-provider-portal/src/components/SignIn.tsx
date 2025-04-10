import { Box, Button, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ecpLogo } from "~/assets";
import Alert from "@material-ui/lab/Alert";
import { FlexColCenter, FlexRowCenter } from "./elements";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";
import { adminLogin, getWeb3, hasRole, toHash } from "~/services";
import { ValidLogin } from "../hooks/useMetamaskLogin";
import { ValidateExpiryToken, ValidUser } from "../hooks";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const useStyles = makeStyles({
  container: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 2px 12px rgba(36, 36, 36, 0.25)",
    borderRadius: "8px",
    padding: "5%",
  },
  bgButton: {
    backgroundColor: "#0cae7d",
    borderRadius: "8px",
    color: "#ffffff",
    margin: "15px",
    width: "50%",
    padding: "3%",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#0cae7d",
    },
  },
  title: {
    color: "#1F7F62",
    fontSize: "24px",
    textTransform: "uppercase",
    marginTop: "35px",
  },
  tagline: {
    color: "#1F7F62",
    fontSize: "16px",
    padding: "8px 0",
    textTransform: "uppercase",
  },
  alert: {
    margin: "20px 0",
  },
});
declare const window: any;
export const SignIn: React.FC<{}> = () => {
  const classes = useStyles();
  const isLogin = ValidLogin();
  const history = useHistory();
  const isValid = ValidUser();
  const tokenExpired = ValidateExpiryToken();

  const [error, setError] = useState<string>("");

  let SIGNATURE_EXPIRY: number = parseInt(
    process.env.REACT_APP_SIGNATURE_EXPIRY || "15"
  );

  const handleLogin = () => {
    setError("");
    isLogin[0].checkMetaMask();
  };
  useEffect(() => {
    if (isLogin[0].sign != "") {
      callApi();
    }
  }, [isLogin[0].msgToSign]);
  const callApi = async () => {
    console.log("msg to sign in api", isLogin[0].msgToSign);
    try {
      var loginData = await adminLogin(isLogin[0].msgToSign, isLogin[0].sign);
      window.location = "/admin";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          className={classes.container}
          width={{ xs: "auto", md: "380px", sm: "400px" }}
          height={{ xs: "auto", md: "350px", sm: "450px" }}
        >
          <FlexRowCenter>
            <FlexColCenter mt={2}>
              <img width="180px" src={ecpLogo} alt="loading..." />
              <Typography variant="h4" className={classes.title}>
                Election Commission of Pakistan
              </Typography>
              <List
                style={{ display: "flex", flexDirection: "row", padding: 0 }}
              >
                <ListItem className={classes.tagline}>Free</ListItem>
                <ListItem>
                  <FiberManualRecordIcon
                    sx={{ color: "#1F7F62", fontSize: "8px" }}
                  />
                </ListItem>
                <ListItem className={classes.tagline}> Fair</ListItem>
                <ListItem>
                  <FiberManualRecordIcon
                    sx={{ color: "#1F7F62", fontSize: "8px" }}
                  />
                </ListItem>
                <ListItem className={classes.tagline}>Impartial</ListItem>
              </List>
              <Button className={classes.bgButton} onClick={handleLogin}>
                Sign In
              </Button>
              {isLogin[0].error && (
                <Alert severity="error" className={classes.alert}>
                  {isLogin[0].error}
                </Alert>
              )}
            </FlexColCenter>
          </FlexRowCenter>
        </Box>
      </Container>
    </>
  );
};
