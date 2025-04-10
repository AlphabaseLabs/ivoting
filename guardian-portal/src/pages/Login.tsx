import { Box, Container, Alert, List, ListItem } from "@mui/material";
import { useState } from "react";
import ecpLogo from "../assets/ecp-logo.png";
import {
  requestAccount,
  getChainId,
  getSignedMessageAndTimeStamp,
  isOwner,
} from "../Services/loginServices";
import { networkChainId } from "../Services/utilities";
import { useHistory } from "react-router-dom";
import { FlexColCenter, FlexRowCenter, MainHeading } from "../elements";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { makeStyles } from "@mui/styles";
import { StyledButton } from "./elements";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 2px 12px rgba(36, 36, 36, 0.25)",
    borderRadius: "8px",
    padding: "5%",
  },
  bgButton: {
    backgroundColor: "#0cae7d !important ma",
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
    padding: "8px 0 !important",
    textTransform: "uppercase",
  },
  alert: {
    margin: "20px 0",
  },
});

function Login(props: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  let history = useHistory();

  const handleLogin = async () => {
    try {
      setPending(true);
      const account = await requestAccount();
      console.log(account);

      const currentChainId: any = await getChainId();
      if (currentChainId.toString() === networkChainId) {
        let owner = await isOwner(account);
        if (owner) {
          const { signature, timestamp } = await getSignedMessageAndTimeStamp(
            account
          );
          history.push("/control-panel");
        } else setError("You are not allowed to access the system");
      } else {
        setError("Please connect to Test network");
      }

      ////COMMMNET THIS AFTER DONE
      // history.push("/register");
    } catch (e: any) {
      setOpen(true);
      setError(e.message);
      setPending(false);
    }
    setPending(false);
  };

  return (
    <>
      <FlexColCenter height="100%" mt="100px">
        <Container maxWidth="sm">
          <Box
            className={classes.container}
            width={{ xs: "auto", md: "450px", sm: "400px" }}
            height={{ xs: "auto", md: "450px", sm: "450px" }}
          >
            <FlexRowCenter>
              <FlexColCenter mt={2}>
                <img width="180px" src={ecpLogo} alt="loading..." />
                <MainHeading variant="h6">
                  Election Commission of Pakistan
                </MainHeading>
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
                <StyledButton
                  sx={{ marginTop: "5%" }}
                  // className={classes.bgButton}
                  onClick={handleLogin}
                >
                  Sign In
                </StyledButton>
                {error && (
                  <Alert severity="error" sx={{ marginTop: "5%" }}>
                    {error}
                  </Alert>
                )}
              </FlexColCenter>
            </FlexRowCenter>
          </Box>
        </Container>
      </FlexColCenter>
    </>
  );
}

export default Login;
