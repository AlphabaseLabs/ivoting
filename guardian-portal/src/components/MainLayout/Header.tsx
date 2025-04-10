import { useHistory } from "react-router-dom";
import urduLogo from "../../assets/urduLogo.png";
import engLogo from "../../assets/engLogo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { HeaderWrapper, LogOutButton } from "../compElements";
import { FlexRowCenter } from "../../elements";
import { Box, Button, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import {
  getSystemStatus,
  startVoting,
  stopVoting,
  triggerTally,
} from "../../Services/voterServices";
import { changeContractStatus } from "src/Services/contractServices";
import { useAppProvider } from "../../Hooks/useAppProvider";
import { ModalButton } from "../../pages/elements";
import { useLocation } from "react-router-dom";

export interface HeaderProps {
  heading?: string;
}

export const Header: React.FC<HeaderProps> = ({ heading }) => {
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [msg, setMsg] = useState("Registration");
  const [disabled, setDisabled] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { publicKeySubmitted } = useAppProvider();

  const toggleModal = () => {
    setConfirmModal(!confirmModal);
  };
  const open = Boolean(anchorEl);
  const handleClickDrop = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const { account }: any = useAppProvider();
  // useEffect(() => {
  //   handleVotingStart();
  // }, []);
  const handleCloseDrop = () => {
    setAnchorEl(null);
  };
  const handleVotingStart = async () => {
    try {
      let res: any = await startVoting(account);
      if (res) {
        getStatus();
        setConfirmModal(!confirmModal);
      }
    } catch (error) {
      setMsg("Error in starting Voting ");
      setMsgType("error");
    }
  };
  const handleVotingStop = async () => {
    try {
      let res: any = await stopVoting(account);
      if (res) {
        getStatus();
        setConfirmModal(!confirmModal);
      }
    } catch (error) {
      setMsg("Error in starting Voting ");
      setMsgType("error");
    }
  };
  const handleTallyingStart = async () => {
    console.log("handleTallyingStart");

    try {
      setDisabled(true);
      setLoading(true);
      let res: any = await triggerTally();
      setLoading(false);
      setConfirmModal(!confirmModal);
      if (res) {
        setMsg("Results");
        setDisabled(false);
      }
    } catch (error) {
      setMsg("Error in starting Voting ");
      setMsgType("error");
    }
  };
  useEffect(() => {
    getStatus();
  }, []);
  const getStatus = async () => {
    try {
      let systemState: any = await getSystemStatus();
      // console.log(systemState, "STATUSSSSSSSSSSSSSSSSSSSSSSs");

      setMsg(systemState);
    } catch (error) {
      console.log("Error in get status", error);
    }
  };

  const displayNextAction = () => {
    switch (msg) {
      case "Registration":
        return "Start Voting";
      case "Voting":
        return "Stop Voting";
      case "Tallying":
        return "Show Results";
      case "Results":
        return "Show Results";
      default:
        break;
    }
    // setNext(nextStep);
  };
  const handleNextAction = () => {
    switch (msg) {
      case "Registration":
        handleVotingStart();
        break;
      case "Voting":
        handleVotingStop();
        break;
      case "CLOSED":
        handleTallyingStart();
        break;
      default:
        break;
    }
  };
  return (
    // console.log(account,"header"),
    <>
      <HeaderWrapper
        bgcolor="#0A5740"
        zIndex={9999}
        boxShadow="0 0 2px lightgrey"
        top={0}
        position="fixed"
        height="75px"
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
              color: "#203541",
              textTransform: "capitalize",
              alignSelf: "center",
            }}
            component="span"
          >
            <img src={engLogo} />
          </Box>
        </FlexRowCenter>
        <Box display="flex">
          <Box>
            <Button onClick={() => history.push("/control-panel")}>
              <Typography
                color={
                  location.pathname === "/control-panel" ? "#3DC87C" : "#FFFFFF"
                }
              >
                CONTROL PANEL
              </Typography>
            </Button>
          </Box>
          <Box>
            <Button onClick={() => history.push("/constituences")}>
              <Typography
                color={
                  location.pathname === "/constituences" ? "#3DC87C" : "#FFFFFF"
                }
              >
                CONSTITUENCIES
              </Typography>
            </Button>
          </Box>
          <Box>
            <Button onClick={() => history.push("/results")}>
              <Typography
                color={
                  location.pathname === "/results" ||
                  location.pathname === "/election-contest/result"
                    ? "#3DC87C"
                    : "#FFFFFF"
                }
              >
                RESULTS
              </Typography>
            </Button>
          </Box>
        </Box>
        <FlexRowCenter pr="20px">
          <LogOutButton onClick={() => history.push("/")}>
            <LogoutIcon />
          </LogOutButton>
        </FlexRowCenter>
      </HeaderWrapper>

      <Typography>{account}</Typography>
    </>
  );
};
