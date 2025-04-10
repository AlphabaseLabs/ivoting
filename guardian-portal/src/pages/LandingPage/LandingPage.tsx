import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  IconButton,
  Typography,
  Grid,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { Header } from "../../components/MainLayout/Header";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import DrawerMain from "../../../src/components/DrawerMain";
import { getContests } from "../../Services/loginServices";
import { VotingTimer } from "../../components/VotingTimer";
import StepsContent from "../../pages/LandingPage/content";
import StepsContentNew from "../../pages/LandingPage/electionControlAccess";
import { useHistory, useLocation } from "react-router-dom";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import Stats from "../../assets/stats.svg";
import { multiSigAbi } from "../../contracts/multiSig";
import { connectToContract, getWeb3 } from "../../Services/loginServices";
import { multiSigContractAddress } from "../../Services";
import { useAppProvider } from "../../Hooks/useAppProvider";

export interface State extends SnackbarOrigin {
  vertical: string;
  horizontal: string;
}

export default function LandingPage() {
  const [activeStep, setactiveStep] = useState<number>(
    sessionStorage.getItem("step_no")
      ? parseInt(sessionStorage.getItem("step_no"))
      : 0
  );
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [candidatesList, setcandidatesList] = useState<any[]>([]);
  const [guardianList, setguardianList] = useState<any[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [msgSnackbar, setMsgSnackbar] = useState<string>("");
  const [totalCandidates, setTotalCandidate] = useState(0);
  const [totalConstituency, setTotalConstituency] = useState(0);
  const [totalParties, setTotalParties] = useState(0);
  const [state, setState] = useState<State>({
    vertical: "bottom",
    horizontal: "center",
  });
  const [activeButton, setActiveButton] = useState(
    process.env.REACT_APP_GUARDIAN_ID === "9014" ? true : false
  );
  const [confirmCount, setConfirmCount] = useState(0);
  const { vertical, horizontal } = state;
  // const { account }: any = useAppProvider();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  // useEffect(() => {
  //   stepsRoute.map((val: string, index: number) => {
  //     if (val === query.get("step")) {
  //       console.log("active step count chages using index");

  //       setactiveStep(index);
  //     }
  //   });
  // }, [query]);
  useEffect(() => {
    var prevStepNo = sessionStorage.getItem("step_no");
    console.log(prevStepNo, "prevStepNo");

    if (prevStepNo) {
      setactiveStep(parseInt(prevStepNo));
      history.push("/control-panel?step=" + stepsRoute[parseInt(prevStepNo)]);
    }
  }, []);

  useEffect(() => {
    const listnerToContract = async () => {
      const multiSigContractListen = await connectToContract(
        multiSigAbi,
        multiSigContractAddress
      );

      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0], "account details");

      const submissionPending = await multiSigContractListen.methods
        .getTransactionCount(true, false)
        .call();
      console.log(submissionPending, "submissionPending");

      const submissionConfirm = await multiSigContractListen.methods
        .getTransactionCount(false, true)
        .call();
      console.log(submissionConfirm, "submissionConfirm");

      if (submissionPending > 0) {
        setActiveButton(
          process.env.REACT_APP_GUARDIAN_ID === "9014" ? false : true
        );
      } else {
        setActiveButton(
          process.env.REACT_APP_GUARDIAN_ID === "9014" ? true : false
        );
        console.log(submissionConfirm, "outside any", activeStep, "activeStep");
      }

      console.log("just before if", submissionConfirm > activeStep);

      if (submissionConfirm > activeStep) {
        console.log(activeStep, "activeStep");
        console.log("need to go next");
        setactiveStep(parseInt(submissionConfirm));
        sessionStorage.setItem("step_no", parseInt(submissionConfirm));
      }

      console.log(submissionPending, "submissionData");

      multiSigContractListen.events.Submission().on("data", async (event) => {
        console.log(event, "Submission listner");
        let txCount =
          (await multiSigContractListen.methods.transactionCount().call()) - 1;
        console.log(txCount, "txCount");

        let checkConfirmation = await multiSigContractListen.methods
          .confirmations(txCount, accounts[0])
          .call();
        console.log(checkConfirmation, "checkConfirmation");
        if (checkConfirmation) {
          setActiveButton(false);
        } else {
          setActiveButton(
            process.env.REACT_APP_GUARDIAN_ID === "9014" ? false : true
          );
        }
      });

      multiSigContractListen.events.Confirmation().on("data", async (event) => {
        console.log(event, "Confirmation listner");
        const submissionConfirm = await multiSigContractListen.methods
          .getTransactionCount(false, true)
          .call();

        let txCount =
          (await multiSigContractListen.methods.transactionCount().call()) - 1;
        console.log(txCount, "txCount");

        let checkConfirmation = await multiSigContractListen.methods
          .confirmations(txCount, accounts[0])
          .call();
        console.log(checkConfirmation, "checkConfirmation");
        if (checkConfirmation) {
          setActiveButton(false);
        }

        if (submissionConfirm > parseInt(sessionStorage.getItem("step_no"))) {
          console.log(activeStep, "activeStep");

          console.log("need to go next confirm");
          sessionStorage.setItem("step_no", parseInt(submissionConfirm));
          console.log(parseInt(submissionConfirm), "submission confirm no.");

          setactiveStep(parseInt(submissionConfirm));
          setActiveButton(
            process.env.REACT_APP_GUARDIAN_ID === "9014" ? true : false
          );
        }
      });
      console.log("before everything starts");

      let txCount = await multiSigContractListen.methods
        .transactionCount()
        .call();
      console.log(txCount, "txCount");
      console.log(accounts, "accounts");

      let checkConfirmation = await multiSigContractListen.methods
        .confirmations(txCount, accounts[0])
        .call();
      console.log(checkConfirmation, "checkConfirmation");
      if (checkConfirmation) {
        setActiveButton(
          process.env.REACT_APP_GUARDIAN_ID === "9014" ? true : false
        );
      }
    };

    listnerToContract();
  }, []);

  const history = useHistory();

  const stepsRoute = [
    "Step-1",
    "Step-2",
    "Step-3",
    "Step-4",
    "Step-5",
    "Step-6",
    "Step-7",
    "Step-8",
  ];

  useEffect(() => {
    async function getData() {
      let res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_DEV_URL}/api/v1/manifest/get-all-`,
      });
      // console.log(res, "constituency");
      setTotalConstituency(Object.keys(res.data).length);
      let candidateCount = 0;
      let partiesCount = [];
      Object.keys(res.data).map((item, val) => {
        candidateCount = candidateCount + item.length;
        let singleConstituency = res.data[item];
        singleConstituency.map((item2) => {
          if (partiesCount.indexOf(item2.party_id) === -1) {
            partiesCount.push(item2.party_id);
            // console.log(partiesCount);
          }
        });
      });
      setTotalCandidate(candidateCount);
      setTotalParties(partiesCount.length);
    }
    getData();
  }, []);

  return (
    console.log("active step", activeStep),
    (
      <>
        <Header />
        <Box mt={12} mx={4} display="flex" justifyContent="space-between">
          {/* <Box>
          <IconButton onClick={() => setDrawer(true)}>
            <DensityMediumIcon />
          </IconButton>
          <DrawerMain open={drawer} setOpen={setDrawer} />
        </Box> */}
          <Paper elevation={5}>
            <Box
              // p={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ width: "250px", height: "200px" }}
              justifyContent="center"
            >
              <Box mb={2}>
                <img height={70} width={70} src={Stats} />
              </Box>

              <Box mb={2}>
                <Typography>Total Candidates</Typography>
              </Box>

              <Box>
                <Typography variant="h4" color="#33B66F">
                  {totalCandidates ? totalCandidates : <CircularProgress />}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper elevation={5}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ width: "250px", height: "200px" }}
              justifyContent="center"
            >
              <Box mb={2}>
                <img height={70} width={70} src={Stats} />
              </Box>

              <Box mb={2}>
                <Typography>Total Constituencies</Typography>
              </Box>

              <Box>
                <Typography variant="h4" color="#33B66F">
                  {totalConstituency ? totalConstituency : <CircularProgress />}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper elevation={5}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ width: "250px", height: "200px" }}
              justifyContent="center"
            >
              <Box mb={2}>
                <img height={70} width={70} src={Stats} />
              </Box>

              <Box mb={2}>
                <Typography>Total Parties</Typography>
              </Box>

              <Box>
                <Typography variant="h4" color="#33B66F">
                  {totalParties ? totalParties : <CircularProgress />}
                </Typography>
              </Box>
            </Box>
          </Paper>
          {/* <Paper elevation={5}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ width: "250px", height: "200px" }}
              justifyContent="center"
            >
              <Box mb={2}>
                <img height={70} width={70} src={Stats} />
              </Box>

              <Box mb={2}>
                <Typography>Registered Voters</Typography>
              </Box>

              <Box>
                <Typography variant="h4" color="#33B66F">
                  200
                </Typography>
              </Box>
            </Box>
          </Paper> */}
        </Box>
        <Box mt={4} mr={4} ml={4} mb={4} display="flex">
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card sx={{ padding: 4, width: "100%" }} elevation={5}>
              <Box m={4}>
                <Typography variant="h6">Election Control Access</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                ml={5}
                justifyContent="space-around"
              >
                <Box width="68px">
                  <Typography>Step#</Typography>
                </Box>

                <Box width="230px">
                  <Typography>Current Stage</Typography>
                </Box>

                <Box width="550px" display="flex" alignItems="center">
                  <Box width="410px">
                    <Typography>Current Status</Typography>
                  </Box>
                  <Box width="100px"></Box>
                </Box>

                <Box mr={8}>Activate Next Stage</Box>
              </Box>
              <StepsContentNew
                activeStep={activeStep}
                setactiveStep={setactiveStep}
                loading={loading}
                setLoading={setLoading}
                setOpenSnackbar={setOpenSnackbar}
                setMsgSnackbar={setMsgSnackbar}
                stepsRoute={stepsRoute}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
              />
            </Card>
          </Box>
        </Box>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={3000}
          open={openSnackbar}
          message={msgSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert severity="error">{msgSnackbar}</Alert>
        </Snackbar>
      </>
    )
  );
}
