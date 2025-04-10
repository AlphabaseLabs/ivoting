import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { FlexColCenter, FlexColStart } from "../../elements";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory, useRouteMatch } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import { useState } from "react";
import { ModalButton, StyledModalButton } from "../../pages/elements";
import { useEffect } from "react";
import { getCandidates } from "../../Services/loginServices";

function ConstituencyList() {
  const [edit, setEdit] = useState(false);
  const [candidatesList, setCandidatesList] = useState<any[]>([]);
  const { params }: any = useRouteMatch();

  const toggleModal = () => {
    setEdit(!edit);
  };
  const history = useHistory();
  const rows = ["Imran Khan", "Nawaz Shareef", "Hassan", "Nigar Johar", "Anya"];
  const handleBack = () => {
    history.push("/election-contest/national-assembly");
  };
  useEffect(() => {
    const fetchData = async () => {
      let res: any = await getCandidates(params.contestId);
      console.log(res);
      setCandidatesList(res);
    };
    fetchData();
  }, []);
  return (
    <>
      <MainLayout topBar={false}>
        <FlexColStart ml={4}>
          <Button variant="outlined" color="inherit" onClick={handleBack}>
            Back
          </Button>
        </FlexColStart>
        <Container maxWidth="lg">
          <FlexColCenter mt={5}>
            <TableContainer component={Paper}>
              {candidatesList ? (
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead
                    sx={{
                      flex: 1,
                      background: "#fff",
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <b>Name of Candidate</b>
                      </TableCell>
                      {/* <TableCell>
                      <b>Actions</b>
                    </TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {candidatesList.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name.text[0].value}
                        </TableCell>
                        {/* <TableCell>
                          <Button onClick={toggleModal}>
                            <EditIcon sx={{ color: "black" }} />
                          </Button>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <FlexColCenter p={3}>
                  <Typography>No records Found</Typography>
                </FlexColCenter>
              )}
            </TableContainer>
          </FlexColCenter>
        </Container>
      </MainLayout>
      {edit && (
        <Modal
          open={edit}
          onClose={toggleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit
            </Typography>
            <TextField
              label="Name"
              sx={{ marginTop: "5%" }}
              fullWidth
            ></TextField>
            <ModalButton
              sx={{ marginTop: "5%", width: "100px", marginRight: "5%" }}
            >
              Edit
            </ModalButton>
            <StyledModalButton
              size="large"
              onClick={toggleModal}
              sx={{ marginTop: "5%", width: "100px" }}
            >
              Cancel
            </StyledModalButton>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default ConstituencyList;
