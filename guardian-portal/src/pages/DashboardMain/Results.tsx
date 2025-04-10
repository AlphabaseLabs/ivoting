import { Box, Card, Grid, Typography, Alert, Paper } from "@mui/material";
import MainLayout from "../../components/MainLayout/MainLayout";
import { StyledLink } from "../elements";
import {
  startVoting,
  stopVoting,
  triggerTally,
} from "../../Services/voterServices";
import { useState } from "react";
import { useEffect } from "react";
import { getResult } from "../../Services/loginServices";
import { Header } from "../../components/MainLayout/Header";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function Results({ type }: any) {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [candidatesList, setCandidatesList] = useState();
  const [msgType, setMsgType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      let res: any = await getResult(
        JSON.parse(localStorage.getItem("decrypted_tally"))
      );
      console.log(res);
      setCandidatesList(res);
    };
    fetchData();
  }, []);

  return (
    <>
      <MainLayout topBar={true}>
        {/* <Header> */}
        <Grid
          container
          spacing={1}
          mt={2}
          ml={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {candidatesList ? (
            Object.keys(candidatesList).map((item, index) => {
              console.log(item, "ITEMS");
              let winnerDisplay = false;
              let val = candidatesList[item];
              return (
                <>
                  <Card
                    style={{ width: "50vw", margin: "20px", padding: "20px" }}
                    elevation={10}
                  >
                    <Typography variant="h5">{item}</Typography>
                    <Box>
                      <Grid container>
                        {Object.keys(val).map((items, indexs) => {
                          if (
                            items !== "party" &&
                            items !== "winner" &&
                            val[items] > 0
                          ) {
                            winnerDisplay = true;
                          }

                          return (
                            <Box>
                              {items !== "party" ? (
                                items !== "winner" ? (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Box display="flex" m={2}>
                                      <Paper sx={{ padding: 2 }} elevation={3}>
                                        {items + " : " + val[items]}
                                      </Paper>
                                    </Box>
                                  </Grid>
                                ) : (
                                  winnerDisplay && (
                                    <Box
                                      display="flex"
                                      flexDirection="column"
                                      justifyContent="center"
                                      alignItems="center"
                                      width="50vw"
                                    >
                                      <Box
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        width="300px"
                                        sx={{
                                          borderStyle: "solid",
                                          borderWidth: 1,
                                          borderBottom: "none",
                                          borderColor: "#3DB26C",
                                        }}
                                      >
                                        <Box
                                          width="100%"
                                          sx={{
                                            backgroundColor: "#3DB26C",
                                            color: "#FFFFFF",
                                          }}
                                        >
                                          <Typography
                                            align="center"
                                            variant="h6"
                                          >
                                            {/* Winner */}
                                            {val[items].name
                                              ? "Winner"
                                              : "Draw"}
                                          </Typography>
                                        </Box>

                                        <Typography>
                                          {val[items].name &&
                                            val[items].name.text[0].value}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  )
                                )
                              ) : (
                                winnerDisplay && (
                                  <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    width="50vw"
                                  >
                                    <Box
                                      display="flex"
                                      flexDirection="column"
                                      justifyContent="center"
                                      alignItems="center"
                                      width="300px"
                                      // px={2}
                                      // pb={2}
                                      sx={{
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        borderTop: "none",
                                        borderColor: "#3DB26C",
                                      }}
                                    >
                                      <Typography>
                                        {val[items].name &&
                                          val[items].name.text[0].value}
                                      </Typography>
                                    </Box>
                                  </Box>
                                )
                              )}
                            </Box>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Card>
                </>
              );
            })
          ) : (
            <Box
              width="100%"
              height="80vh"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <AutorenewIcon fontSize="large" />
              <Typography>
                Election is in progress please wait the election to end to get
                results.
              </Typography>
            </Box>
          )}
        </Grid>
        <Box
          display="flex"
          mt={3}
          width="100%"
          alignItems="center"
          justifyContent="center"
        ></Box>
        {msg && (
          <Box
            display="flex"
            mt={3}
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Alert
              severity={msgType == "success" ? "success" : "error"}
              sx={{ textAlign: "center" }}
            >
              {msg}
            </Alert>
          </Box>
        )}
      </MainLayout>
      {/* </Header> */}
    </>
  );
}

export default Results;
