//@ts-nocheck
import { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  DialogTitle,
  DialogContent,
  Dialog,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { AreaLabel } from "../../components/AreaLabel";
import translate from "../../i18n/translate";
import { FlexBox, FlexColCenter } from "../elements";
import {
  encryptBallot,
  getBallotDetails,
  getParty,
  sendCastVote,
} from "../../Services/ballotService";
import dummy from "../../assets/PakIcon.png";
import { candidatesList } from "../../Constants/candidates";
// import { getVoterFromContract } from "../../Services/accessProviderService";
import { getUserDetail } from "../../Services/eIdentityProviderService";
function VotingPanel({
  header,
  handleNext,
  blue,
  headerId,
  assembly,
  systemLang,
  styleId,
  constituency,
  objectId,
}: any) {
  const [selected, setSelected] = useState<any>("");
  const [modalData, setModalData] = useState<any>("");
  const [modalDataPic, setModalDataPic] = useState<any>("");
  const [successMsg, setSuccessMsg] = useState<any>("");
  const [errorMsg, setErrorMsg] = useState<any>("");
  const [candidatesList, setCandidatesList] = useState(null);
  const [partiesList, setParties] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPar, setLoadingPar] = useState(false);
  // const [partyArray,setPartyArray] = useState
  const [user, setUser] = useState();
  const history = useHistory();
  useEffect(() => {
    const getData = async () => {
      setLoadingPar(true);
      await getBallot();
      setLoadingPar(false);
    };
    getData();
  }, [constituency]);

  useEffect(() => {
    getUser();
  }, []);

  const getBallot = async () => {
    try {
      let res: any = await getBallotDetails(constituency);
      // console.log(res);
      setCandidatesList(res);
      for (let i = 0; i < res.length; i++) {
        await getPartyDetail(res[i][1]);
      }
    } catch (error) {
      // setErrorMsg()
    }
  };
  const getUser = async () => {
    try {
      let res: any = await getUserDetail();
      setUser(res);
    } catch (error) {
      // setErrorMsg()
    }
  };

  let partyArray: any = [];
  const getPartyDetail = async (party: string) => {
    try {
      let res: any = await getParty(party);
      console.log(res, "getPartyDetauls");

      partyArray.push(res);
      console.log("partyArray from res", partyArray);
      setParties(partyArray);
    } catch (error) {
      console.log(error);
    }
  };
  const castVote = async (selectedItem: any) => {
    setLoading(true);
    console.log("castVOte", "before encryptBallot");

    try {
      var res = await encryptBallot(
        selectedItem[2],
        assembly,
        candidatesList,
        objectId
      );
      console.log("castVOte", "after encryptBallot");

      console.log("castVOte", "before sendCastVote");

      let isVoteCasted = await sendCastVote(
        selectedItem["electoral_district_id"],
        assembly,
        res
      );
      console.log(isVoteCasted, "isVoteCasted");
      if (isVoteCasted) {
        // console.log("isVoteCasted", isVoteCasted);
        setLoading(false);
        setSuccessMsg(translate("voteCastedS"));
        // handleNext();
      } else {
        setLoading(false);
        setErrorMsg(translate("voteCastedE"));
        // console.log("isVoteCasted", isVoteCasted);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(res);
  };
  const setProfileImg = (image: any) => {
    if (image && image !== null) {
      axios
        .get(image)
        .then((res: any) => {
          return image;
        })
        .catch((e: any) => {
          return dummy;
        });
    }
    return dummy;
  };

  return (
    console.log(modalData, "modaldata"),
    (
      <>
        {loadingPar ? (
          <Box
            sx={{
              height: "90vh",
              // width: "90vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "red",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            // alignItems="center"
            width="100%"
            pr={{ xs: 2, md: 0 }}
            pl={{ xs: 2, md: 0 }}
          >
            <Box>
              <Typography align="center" variant="h5" color="primary">
                {/* NATIONAL ASSEMBLY VOTING */}
                {translate(headerId)}
              </Typography>
            </Box>

            <Box mt={2} display="flex" justifyContent="center">
              {user && <AreaLabel user={user} assembly={constituency} />}
            </Box>
            {!loading && (
              <FlexBox
                mt={4}
                mb={1}
                $direction={systemLang == "en-US" ? "start" : "end"}
              >
                <Typography variant="body2">
                  {assembly == "NA"
                    ? translate("NAvoteHeading")
                    : translate("PAVoteHeading")}
                </Typography>
              </FlexBox>
            )}

            <Box
              pr={2}
              height="70vh"
              overflow="auto"
              sx={{
                "&::-webkit-scrollbar": {
                  width: 7,
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: `inset 0 0 6px rgba(27, 146, 110, 0.9)`,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(27, 146, 110, 1)",
                  outline: `1px solid slategrey`,
                },
              }}
            >
              {loading ? (
                <>
                  <Box
                    height="70%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      <CircularProgress
                        color={assembly == "NA" ? "success" : "info"}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1" textAlign="center">
                        Please wait while your vote is being cast
                      </Typography>
                    </Box>
                  </Box>
                </>
              ) : (
                <Grid container spacing={1}>
                  {partiesList.length > 0 &&
                    candidatesList &&
                    candidatesList.map((item: any, index: any) => {
                      console.log("start logs");

                      console.log(partiesList, "inside the map");
                      // console.log(partiesList[0], "inside the parties");

                      return (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                          <Card
                            sx={{
                              borderLeftStyle: "solid",
                              borderLeftColor: blue ? "#366CBD" : "#3DB26C",
                              borderLeftWidth: 4,
                              cursor: "pointer",
                              backgroundColor:
                                selected.name === item.name
                                  ? blue
                                    ? "#366CBD"
                                    : "#3DB26C"
                                  : "white",
                              height: "10vh",
                              boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
                            }}
                            raised
                            onClick={() => {
                              setOpen(true);
                              setModalData(item);
                              setModalDataPic(partiesList[index]["logo_uri"]);
                              setSelected(item);
                              setErrorMsg("");
                              setSuccessMsg("");
                            }}
                          >
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              height="100%"
                            >
                              <Box mr={1} ml={2} style={{ width: 70 }}>
                                <img
                                  height="70%"
                                  width="70%"
                                  src={
                                    // partiesList[index]
                                    //   ?
                                    partiesList[index]["logo_uri"]
                                    // : dummy
                                  }
                                  alt="candidate party sign"
                                />
                              </Box>

                              <Box mr={1} display="flex" flexGrow={1}>
                                <Typography variant="body1">
                                  {item[0]}
                                </Typography>
                                <br />
                                {/* <Typography variant="body1">{item.name}</Typography> */}
                              </Box>
                            </Box>
                            {/* </CardContent> */}
                          </Card>
                        </Grid>
                      );
                    })}
                </Grid>
              )}
            </Box>

            {successMsg && (
              <FlexColCenter mt={5}>
                <Alert severity="success" sx={{ textAlign: "center" }}>
                  {successMsg}
                </Alert>
              </FlexColCenter>
            )}
            {errorMsg && (
              <FlexColCenter mt={5}>
                <Alert severity="error" sx={{ textAlign: "center" }}>
                  {errorMsg}
                </Alert>
              </FlexColCenter>
            )}
            <Dialog open={open} onClose={() => setOpen(false)}>
              <Box
                sx={{
                  borderTopColor: blue ? "#366CBD" : "#3DB26C",
                  //  "#0CAE7D",
                  borderTopStyle: "solid",
                  borderTopWidth: 15,
                }}
              ></Box>
              <DialogTitle>
                <Typography
                  variant="caption"
                  mb={3}
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {assembly == "NA"
                    ? translate("NAConfirmText")
                    : translate("PAConfirmText")}
                </Typography>
              </DialogTitle>

              <DialogContent>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <img
                    width="100"
                    height="100"
                    src={modalDataPic}
                    alt="vote selected"
                    style={{
                      // backgroundColor: blue ? "#366CBD" : "#3DB26C",
                      padding: "4%",
                    }}
                  />
                  <Typography
                    variant="caption"
                    mt={2}
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    {modalData[0]}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  mt={3}
                >
                  <Box mr={1}>
                    <Button
                      size="large"
                      variant="outlined"
                      onClick={() => {
                        setSelected("");

                        setOpen(false);
                      }}
                      sx={{ textTransform: "none" }}
                    >
                      {translate("cancelBtn")}
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      size="large"
                      onClick={async () => {
                        setOpen(false);
                        await castVote(selected);
                        setErrorMsg("");
                        setSelected("");
                        handleNext();
                      }}
                      variant="contained"
                      sx={{ textTransform: "none" }}
                    >
                      {translate("confirmBtn")}
                    </Button>
                  </Box>
                </Box>
              </DialogContent>
            </Dialog>
          </Box>
        )}
      </>
    )
  );
}
const mapStateToProps = (state: any) => {
  return {
    systemLang: state.rootReducer.systemLanguage,
  };
};

export default connect(mapStateToProps, null)(VotingPanel);
