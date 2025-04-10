import {
  Box,
  Card,
  Grid,
  Typography,
  Alert,
  Dialog,
  DialogContent,
} from "@mui/material";
import MainLayout from "../../components/MainLayout/MainLayout";
import { StyledLink } from "../elements";
import {
  startVoting,
  stopVoting,
  triggerTally,
} from "../../Services/voterServices";
import { useState } from "react";
import { useEffect } from "react";
import { getContests } from "../../Services/loginServices";

function NADashboard({ type }: any) {
  const [openCandidateList, setOpenCandidateList] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [candidatesList, setCandidatesList] = useState<any[]>([]);
  const [msgType, setMsgType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      let res: any = await getContests("NA");
      console.log(res);

      setCandidatesList(res);
    };
    fetchData();
  }, []);

  return (
    <>
      <MainLayout topBar={true}>
        <Grid
          container
          spacing={1}
          mt={2}
          ml={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {candidatesList
            ? candidatesList.map((item, index) => {
                return (
                  <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        height: "10vh",
                        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
                        padding: "5%",
                        minHeight: "150px",
                        borderLeft: "8px solid rgb(12, 174, 125)",
                      }}
                      raised
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                        flexDirection="column"
                      >
                        <Typography variant="h4">{item.object_id}</Typography>
                        <Typography variant="h5">
                          Candidates Registered: {item.ballot_selections.length}
                        </Typography>
                        {/* <Typography variant="h5">Votes Casted: 520</Typography> */}
                        {/* <Typography variant="overline">
                          View Candidate List
                        </Typography> */}
                      </Box>
                    </Card>
                  </Grid>
                );
              })
            : "No Records Found"}
        </Grid>
        <Box
          display="flex"
          mt={3}
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          {/* <StyledButton sx={{ marginRight: "1%" }} onClick={handleVotingStart}>
            Start Voting
          </StyledButton>
          <StyledButton sx={{ marginRight: "1%" }} onClick={handleVotingEnd}>
            Stop Voting
          </StyledButton>
          <StyledButton sx={{ marginRight: "1%" }} onClick={handleTally}>
            Start Tallying
          </StyledButton>
          <StyledButton>Stop Tallying</StyledButton> */}
        </Box>
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
    </>
  );
}

export default NADashboard;
