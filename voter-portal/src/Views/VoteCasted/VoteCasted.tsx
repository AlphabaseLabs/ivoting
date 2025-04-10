// @ts-nocheck
import voteCasted from "../../assets/done.png";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import "./votecasted.scss";
import VotingCode from "../../assets/VotingCode.svg";
import done from "../../assets/requestSentDone.svg";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import translate from "../../i18n/translate";
import { MsgHeading } from "../elements";
import { Link, useHistory } from "react-router-dom";
import QRCode from "qrcode.react";
import { EXPLORER_URL } from "../../Constants/apiUrls";
import { useEffect, useState } from "react";

interface IProps {
  nextStep(votingArea: string): void;
}
function VoteCasted({ nextStep }: IProps) {
  const handleClick = () => {
    console.info("i am called");
    nextStep("RecastVote");
  };
  const [NAVote, setNAVote] = useState("");
  const [PAVote, setPAVote] = useState("");

  const history = useHistory();
  useEffect(() => {
    let voteOfNA = sessionStorage.getItem("txNA");
    if (voteOfNA) setNAVote(voteOfNA);
    let voteOfPA = sessionStorage.getItem("txPA");
    if (voteOfPA) setPAVote(voteOfPA);
  }, []);

  const goToExplorer = (txHash: string) => {
    window.open(`${process.env.REACT_APP_EXPLORER_URL}/tx/${txHash}`, "_blank");
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
      >
        <Box
          mt={8}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <img height={50} width={50} src={done} alt="loading..." />
        </Box>

        <Box
          mt={3}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Typography
            align="center"
            color="secondary"
            sx={{ fontSize: "30px", fontFamily: "Lato" }}
          >
            {translate("voteCasted")}
          </Typography>
        </Box>

        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <MsgHeading align="center" variant="body2">
            {translate("voteRes")}
          </MsgHeading>
        </Box>
        {NAVote && (
          <Box
            mt={4}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Link
              to="#"
              style={{ textDecoration: "none" }}
              onClick={() => goToExplorer(NAVote)}
            >
              <Box
                p={2}
                display="flex"
                justifyContent="center"
                alignContent="center"
                sx={{ backgroundColor: "#F2F2F2" }}
              >
                <Box
                  mr={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <QRCode id="qrCodeEl" size={80} value={NAVote} />
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography
                    width={200}
                    variant="caption"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      textAlign: "center",
                      color: "black",
                      textTransform: "none",
                    }}
                  >
                    {translate("naReceipt")}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="center" alignItems="end">
                  <IconButton>
                    <DownloadForOfflineIcon color="primary" />
                  </IconButton>
                </Box>
              </Box>
            </Link>
          </Box>
        )}
        {PAVote && (
          <Box
            mt={4}
            display="flex"
            justifyContent="center"
            alignContent="center"
            // sx={{ backgroundColor: "#F2F2F2" }}
          >
            <Link
              to="#"
              // target="_blank"
              style={{ textDecoration: "none" }}
              onClick={() => goToExplorer(PAVote)}
            >
              <Box
                p={2}
                display="flex"
                justifyContent="center"
                alignContent="center"
                sx={{ backgroundColor: "#F2F2F2" }}
              >
                <Box
                  mr={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <QRCode id="qrCodeEl" size={80} value={PAVote} />
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography
                    width={200}
                    variant="caption"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    {translate("paReceipt")}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="center" alignItems="end">
                  <IconButton>
                    <DownloadForOfflineIcon color="primary" />
                  </IconButton>
                </Box>
              </Box>
            </Link>
          </Box>
        )}

        <Box width="100%" display="flex" justifyContent="center" mt={4}>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            type="submit"
            sx={{ borderColor: "#8F9D99" }}
            onClick={() => history.push("/SignIn")}
          >
            <Typography
              sx={{ textTransform: "none" }}
              variant="body2"
              color="common.white"
            >
              {translate("exitBtn")}
            </Typography>
          </Button>
        </Box>
      </Box>

      {/* <div
        className="img-div flex-col-center w-100 "
        style={{ backgroundColor: "white" }}
      >
        <div className="row flex-col-center w-100">
          <div className="bg-green  my-3  flex-col-center">
            <h4 className="details">NA-54, Islamabad-III</h4>
            <h4 className="details">ISLAMABAD MODEL SCHOOL (I-V) G-11/1</h4>
          </div>

          <img
            src={voteCasted}
            className="img-fluid"
            alt="A man casting his vote"
          />

          <h2 className="sub-heading my-3" style={{ textAlign: "center" }}>
            Vote Casted Successfully!
          </h2>
          <h4 className="span-heading mb-2 " style={{ textAlign: "center" }}>
            If you want to cast vote again, please{" "}
            <span onClick={handleClick}>click here</span>
          </h4>
          <button className="form-btn my-3">View Details</button>
        </div>
      </div> */}
    </>
  );
}

export default VoteCasted;
