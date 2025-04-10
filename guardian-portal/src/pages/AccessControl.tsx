import {
  Box,
  Container,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout/MainLayout";
import { FlexColCenter } from "../elements";
import {
  StyledTableRow,
  StyledTableCell,
  ModalButton,
  StyledModalButton,
} from "./elements";
import { getGuardians } from "../Services/loginServices";

function AccessControl() {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [guardians, setGuardians] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      let res: any = await getGuardians("NA");
      console.log(res);

      setGuardians(res);
    };
    fetchData();
  }, []);
  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <>
      <MainLayout topBar={true}>
        <Container maxWidth="lg">
          <FlexColCenter mt={2}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead
                  sx={{
                    background: "#fff",
                  }}
                >
                  <TableRow>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      <b>Name of Candidate</b>
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      <b>Url</b>
                    </StyledTableCell>
                    {/* <StyledTableCell sx={{ textAlign: "center" }}>
                      <b>Actions</b>
                    </StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    height: "600px",
                  }}
                >
                  {guardians &&
                    guardians.map((row, index) => (
                      <StyledTableRow key={index} $rowIdx={index}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          sx={{ textAlign: "center" }}
                        >
                          {row.guardian_id}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          sx={{ textAlign: "center" }}
                        >
                          {row.url}
                        </StyledTableCell>
                        {/* <StyledTableCell sx={{ textAlign: "center" }}>
                        <TableButton
                          sx={{ width: "85px" }}
                          onClick={() => {
                            setOpen(!open);
                            setModalContent("Add");
                          }}
                        >
                          Add
                        </TableButton>
                        <TableButton
                          sx={{ width: "85px" }}
                          onClick={() => {
                            setOpen(!open);
                            setModalContent("Revoke");
                          }}
                        >
                          Revoke
                        </TableButton>
                      </StyledTableCell> */}
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </FlexColCenter>
        </Container>

        {/* <Grid container spacing={1} mt={4} ml={3}>
          {PPcandidatesList.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Card
                  sx={{
                    cursor: "pointer",
                    height: "10vh",
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
                    padding: "5%",
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
                    <Typography variant="body1">{item.name}</Typography>
                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined primary button group"
                      sx={{ marginTop: "2%" }}
                    >
                      <Button
                        sx={{ width: "85px" }}
                        onClick={() => {
                          setOpen(!open);
                          setModalContent("Add");
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        sx={{ width: "85px" }}
                        onClick={() => {
                          setOpen(!open);
                          setModalContent("Revoke");
                        }}
                      >
                        Revoke
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid> */}
        {open && (
          <Modal
            open={open}
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
                {modalContent} Address
              </Typography>
              <TextField
                label="Address"
                sx={{ marginTop: "5%" }}
                fullWidth
              ></TextField>
              <ModalButton
                sx={{ marginTop: "5%", width: "100px", marginRight: "5%" }}
              >
                {modalContent}
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
      </MainLayout>
    </>
  );
}

export default AccessControl;
