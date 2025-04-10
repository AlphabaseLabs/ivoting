// @ts-nocheck
import * as React from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  TextField,
  Chip,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FaceIcon from "@material-ui/icons/Face";

import {
  approveVoter,
  registerVoter,
  checkRegisterVoter,
  voter_id,
  elections,
} from "../Services/voterServices";
import {
  MainLayout,
  FlexRowSpaceBetween,
  GetComponentProps,
  FormLabel,
} from "~/components";
import {
  editElections,
  getAnswers,
  getUserDetail,
  getUserImg,
} from "~/services";
import { useInterval } from "../hooks/UseInterval";
import dummyImg from "../assets/dummy.png";
import { useAppProvider, ValidUser } from "~/hooks";
import { ValidateExpiryToken } from "~/hooks";
import {
  ActiveButton,
  BorderButton,
  CustomButton,
  FillButton,
  FlexColCenter,
  FlexColEnd,
  FlexRowCenter,
  FlexRowStart,
  ItemLeft,
  PendingButton,
  StyledContainer,
  StyledTableCellLeft,
  StyledTableCellRight,
  StyledTitle,
} from "./elements";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { drawerWidth } from "./MainLayout/elements";
import axios from "axios";
import { DEV_URL } from "../Helper/apiUrl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { reqHeaders } from "~/httpServices";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    padding: "2%",
    background: "rgba(101 101 101 / 7%)",
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 250,
    // height: 200,
    maxHeight: 500,
  },
  header: {
    backgroundColor: "#0CAE7D",
    color: "white",
    height: "auto",
    padding: "8px 16px",
    fontSize: "20px",
  },

  title: {
    fontFamily: "Lato",
    fontWeight: 600,
    fontSize: "35px",
    textTransform: "uppercase",
    color: "#4F4F4F",
  },
  card: {
    width: "100%",
  },
});
const headers = {
  "Content-Type": "application/json",
};
export const Detail = () => {
  const classes = useStyles();
  const history = useHistory();
  const [detailData, setDetailData] = useState();
  const [userImg, setUserImg] = useState("");
  const [ques, setQues] = useState([]);

  const [quesHidden, setQuesHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  const isValid = ValidUser();
  const tokenExpired = ValidateExpiryToken();
  const { showSideNav, toggleSideNav, setShowSideNav } = useAppProvider();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [allowEdit, setAllowEdit] = useState(false);
  const [tag, setTag] = useState<string>("");
  const [tagsArray, setTagsArray] = useState<string[]>([]);

  const { params } = useRouteMatch();
  useEffect(() => {
    callFunc();
  }, []);

  const callFunc = async () => {
    try {
      const user = await getUserDetail(params.voterId);
      setDetailData(user);
      setLoading(true);
      const img = await getUserImg(params.voterId);
      setUserImg(img);
      setLoading(false);
    } catch (error: Error) {
      if (error.message.includes(401)) {
        history.push("/");
      }
      console.log(error.message.includes(401), "HELOOOO");
      toast.error("No Record Found");
    }
  };
  const fetchAnswers = async () => {
    const quesData = await getAnswers(params.voterId);
    console.log(quesData);
    setQuesHidden(false);
    setQues(quesData);
  };
  // if (!isValid || tokenExpired) {
  //   history.push("/");
  // }
  useEffect(() => {
    setShowSideNav(false);
  }, []);
  const Web3 = require("web3");

  const confirmVoter = async () => {
    try {
      setError("");
      let voterIdHash = voter_id(detailData.uuid);
      let electionsHash = elections(tagsArray);
      let check = await checkRegisterVoter(voterIdHash, electionsHash);

      if (tagsArray.length > 1) {
        let body = JSON.stringify({
          elections: tagsArray,
        });
        console.log(check, "CHECKKKKK");
        if (check) {
          axios
            .patch(`${DEV_URL}/users/${detailData.uuid}/approve`, body, {
              headers: reqHeaders,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.message.status == "ACTIVE") {
                contractTransaction();
              }
            })
            .catch((e) => {
              console.log("error is:", e.response.data.message);
              if (e.toString().includes("400")) {
                setError("Constituency must contain at least 2 elements");
              } else if (e.toString().includes("412")) {
                setError("Image not found against this record");
              }
            });
        }
        //  else {
        //   setError("Reset Metamask or check if in correct voting state.");
        // }
      } else {
        setError("Constituency must contain at least 2 elements");
      }
    } catch (error: Error) {
      setError("Reset Metamask or check if in correct voting state.");
      // console.log("Reset Metamask or check if in correct voting state.","FROM DETAILS")
    }
  };
  const contractTransaction = async () => {
    let voterIdHash = voter_id(detailData.uuid);
    let electionsHash = elections(tagsArray);
    // console.log();

    try {
      let registerTx = await registerVoter(voterIdHash, electionsHash);
      console.log(registerTx);
      if (!registerTx) {
        setError("User is already approved ");
      } else {
        callFunc();
        setSuccess("User is approved successfully!");
      }
    } catch (error) {
      console.log(error);

      if (error.toString().includes("User denied transaction signature")) {
        setError("Please confirm transaction signature");
      }
    }
  };
  const renderTags = (e: any) => {
    let tagsInputArray: string[] = tagsArray;

    if (e.key === "Enter") {
      setTag("");
      let tag = e.target.value;
      if (!tagsInputArray.includes(tag) && tagsInputArray.length < 2) {
        if (tag != "") {
          tagsInputArray.push(tag);
          setTagsArray(tagsInputArray);
        }
        if (tagsInputArray.length == 2) {
        }
      } else {
        // setHasError(true);
      }
      console.log("tagsInputArray", tagsInputArray);
    }
  };
  const printTags = () => {
    return tagsArray.map((item) => {
      return (
        <Chip
          style={{ margin: 2 }}
          label={item}
          onDelete={() => removeTag(item)}
          variant="outlined"
        />
      );
    });
  };
  const removeTag = (tag: string) => {
    let tagsInputArray: string[] = tagsArray;
    let elemIndex = tagsInputArray.indexOf(tag);
    tagsInputArray.splice(elemIndex, 1);
    // setdisabled(false);
    setTagsArray([...tagsInputArray]);
  };
  const changeConstituency = async () => {
    let resp = await editElections(detailData.uuid, tagsArray);
    if (resp) {
      callFunc();
      setAllowEdit(!allowEdit);
      setSuccess("Constituency changed successfully");
    } else {
      setError("Failed. Please try again");
    }
  };

  return (
    console.log(tagsArray, "CONSTUTUENCY"),
    (
      <>
        <MainLayout showFooter={false}>
          <Container
            maxWidth={false}
            style={{
              padding: " 20px",
            }}
          >
            <FlexRowStart>
              <BorderButton
                $customBorderColor="#8F9D99"
                $customColor="#353535"
                $customMargin="0"
                startIcon={<KeyboardBackspaceIcon />}
                onClick={() => history.push("/admin")}
              >
                Back
              </BorderButton>
            </FlexRowStart>

            <Container maxWidth="lg">
              <FlexColCenter>
                <StyledTitle>VOTER INFORMATION</StyledTitle>

                <FlexRowCenter width="100%">
                  <FlexColCenter width="100%">
                    <Card className={classes.card}>
                      <CardHeader
                        className={classes.header}
                        title="Voter Details"
                      />

                      <div className={classes.details}>
                        {loading ? (
                          <Box display="flex" justifyContent="center">
                            <CircularProgress />
                          </Box>
                        ) : (
                          <CardMedia
                            className={classes.cover}
                            image={
                              userImg != null && userImg != ""
                                ? userImg
                                : dummyImg
                            }
                          />
                        )}

                        <CardContent className={classes.content}>
                          <TableContainer>
                            <Table
                              className={classes.table}
                              aria-label="simple table"
                            >
                              <TableBody>
                                <TableRow>
                                  <StyledTableCellLeft>
                                    CNIC
                                  </StyledTableCellLeft>
                                  <StyledTableCellRight>
                                    {detailData && detailData.national_identity}
                                  </StyledTableCellRight>
                                </TableRow>
                                <TableRow>
                                  <StyledTableCellLeft>
                                    Passport No
                                  </StyledTableCellLeft>
                                  <StyledTableCellRight>
                                    {detailData && detailData.passport_nr}
                                  </StyledTableCellRight>
                                </TableRow>
                                <TableRow>
                                  <StyledTableCellLeft>
                                    Phone No
                                  </StyledTableCellLeft>
                                  <StyledTableCellRight>
                                    {detailData && detailData.phone_nr}
                                  </StyledTableCellRight>
                                </TableRow>
                                {detailData && detailData.elections && (
                                  <TableRow>
                                    <StyledTableCellLeft>
                                      Constituency
                                      <Button
                                        onClick={() => setAllowEdit(true)}
                                      >
                                        <ModeEditIcon />
                                      </Button>
                                    </StyledTableCellLeft>

                                    <StyledTableCellRight>
                                      {!allowEdit ? (
                                        detailData.elections.map(
                                          (item, index) => {
                                            return (
                                              <>
                                                {item}
                                                {index + 1 !=
                                                  detailData.elections
                                                    .length && <span> , </span>}
                                              </>
                                            );
                                          }
                                        )
                                      ) : (
                                        <>
                                          <TextField
                                            style={{
                                              backgroundColor: "#E4F2EF",
                                              paddingTop: 1,
                                              marginBottom: 8,
                                            }}
                                            variant="standard"
                                            fullWidth
                                            required
                                            size="small"
                                            value={tag}
                                            onChange={(e: any) =>
                                              setTag(e.target.value)
                                            }
                                            onKeyDown={renderTags}
                                          />
                                          <br />

                                          <div>{printTags()}</div>
                                          {/* <Button
                                          size="large"
                                          color="inherit"
                                          variant="contained"
                                          onClick={changeConstituency}
                                          style={{
                                            marginTop: 5,
                                            marginBottom: 5,
                                          }}
                                        >
                                          <Typography
                                            sx={{ textTransform: "none" }}
                                            variant="body2"
                                            color="common.white"
                                          >
                                            Done
                                          </Typography>
                                        </Button> */}
                                          <br />
                                          {detailData.elections.map(
                                            (item, index) => {
                                              return (
                                                <>
                                                  {item}
                                                  {index + 1 !=
                                                    detailData.elections
                                                      .length && (
                                                    <span> , </span>
                                                  )}
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      )}
                                    </StyledTableCellRight>
                                  </TableRow>
                                )}

                                <TableRow>
                                  <StyledTableCellLeft>
                                    Security Questions
                                  </StyledTableCellLeft>
                                  <StyledTableCellRight>
                                    {quesHidden ? (
                                      <Button
                                        variant="text"
                                        color="inherit"
                                        onClick={fetchAnswers}
                                      >
                                        <VisibilityIcon />
                                      </Button>
                                    ) : (
                                      <List
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          padding: 0,
                                        }}
                                      >
                                        {ques.length != 0
                                          ? ques.map((item, index) => {
                                              return (
                                                <>
                                                  <ItemLeft>
                                                    {index + 1} .{" "}
                                                    {item.question}
                                                  </ItemLeft>
                                                  <ItemLeft>
                                                    <b>{item.answer} </b>
                                                  </ItemLeft>
                                                </>
                                              );
                                            })
                                          : "No questions found"}
                                      </List>
                                    )}
                                  </StyledTableCellRight>
                                </TableRow>
                                <TableRow>
                                  <StyledTableCellLeft>
                                    Registration Status
                                  </StyledTableCellLeft>
                                  <StyledTableCellRight>
                                    {detailData &&
                                    detailData.status == "ACTIVE" ? (
                                      <ActiveButton>Active</ActiveButton>
                                    ) : (
                                      <PendingButton>Pending</PendingButton>
                                    )}
                                  </StyledTableCellRight>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </div>
                    </Card>
                  </FlexColCenter>
                </FlexRowCenter>
              </FlexColCenter>
              {detailData && detailData.status != "ACTIVE" && (
                <FlexColEnd>
                  <BorderButton
                    $customBorderColor="#0CAE7D"
                    $customColor="#0CAE7D"
                    $customMargin="18px 10px"
                    disabled
                  >
                    Reject
                  </BorderButton>
                  <FillButton onClick={confirmVoter}>Accept</FillButton>
                </FlexColEnd>
              )}
              {error != "" && (
                <FlexColCenter>
                  <Alert severity="error">{error}</Alert>
                </FlexColCenter>
              )}
              {success != "" && (
                <FlexColCenter>
                  <Alert severity="success">{success}</Alert>
                </FlexColCenter>
              )}
            </Container>
          </Container>
        </MainLayout>
      </>
    )
  );
};
