// @ts-nocheck
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  TablePagination,
  TableContainer,
  TableBody,
  TableRow,
  Paper,
  Table,
  TableHead,
  Container,
  TextField,
  Box,
  Typography,
  Button,
} from "@material-ui/core";

import { DEV_URL } from "../Helper/apiUrl";
import { ValidUser } from "~/hooks";
import { ValidateExpiryToken } from "~/hooks";
import { reqHeaders } from "~/httpServices";
import {
  ActiveButton,
  CustomButton,
  FlexColCenter,
  FlexColEnd,
  FlexRowCenter,
  PendingButton,
  SideBarDrawerIcon,
  StyledContainer,
  StyledTableData,
  StyledTableHeader,
  StyledTableHeaderData,
  StyledTitle,
  TextButton,
} from "./elements";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useAppProvider } from "~/hooks";
import { MainLayout } from "~/components";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
interface Action {
  type: string;
  payload: any;
}

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "VOTERS_DATA":
      return {
        ...state,
        votersList: action.payload.items,
        pagination: action.payload.meta,
      };

    default:
      return state;
  }
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    padding: "2%",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 250,
    height: 150,
  },
  header: {
    backgroundColor: "#0CAE7D",
    color: "white",
    height: "auto",
  },
  tableCell: {
    textAlign: "start",
    borderBottom: 0,
    padding: 6,
  },
}));
export const Dashboard: React.FC<{}> = () => {
  const initialState = {
    votersList: [],
    pagination: [],
  };
  const history = useHistory();
  const [votersData, setVotersData] = useState([]);
  const [paginationData, setPaginationData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [startPageItem, setStartPageItem] = useState<number>(1);
  const [serialNo, setSerialNo] = useState<number>(1);
  const [totalPageItems, setTotalPageItems] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [handleChange, setHandleChange] = useState<boolean>(false);

  const [data, setData] = useState({});
  const [img, setImg] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const token = sessionStorage.getItem("token");
  const expiry = sessionStorage.getItem("expiry");
  const [state, dispatch] = useReducer(reducer, initialState);
  const isValid = ValidUser();
  const tokenExpired = ValidateExpiryToken();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { showSideNav, toggleSideNav } = useAppProvider();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // setCurrentPage(1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setCurrentPage(1);
  };
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (query.get("page")) {
      console.log("useEffect");

      // setLoading(true);
      const pageGet = query.get("page");
      setStartPageItem(pageGet);
      setSerialNo(pageGet * 10 - 9);
      fetchVoters(pageGet);
    } else {
      fetchVoters(startPageItem);
      history.push(`/admin?page=${startPageItem}`);
    }
  }, []);

  const fetchVoters = (startPageItem: number) => {
    setLoading(true);
    axios
      .get(`${DEV_URL}/users?page=${startPageItem}&limit=10`, {
        headers: reqHeaders,
      })
      .then((res) => {
        console.log(res.data);
        setCurrentPage(currentPage + 10);
        dispatch({ type: "VOTERS_DATA", payload: res.data });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        history.push("/");
      });
  };
  const fetchSearchVoters = (valueToSearch: string) => {
    axios
      .get(
        `${DEV_URL}/users?identity=${valueToSearch}&page=${startPageItem}&limit=10`,
        {
          headers: reqHeaders,
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "VOTERS_DATA", payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    setVotersData(state.votersList);
    setPaginationData(state.pagination);
    setCurrentPage(state.pagination.currentPage);
    setTotalPages(state.pagination.totalPages);
    setTotalPageItems(state.pagination.itemCount);
    setTotalItems(state.pagination.totalItems);
  }, [state.votersList]);

  const handleNext = () => {
    // setLoading(true);
    setHandleChange(true);
    setSerialNo(serialNo + 10);
    setStartPageItem(startPageItem + 1);
    fetchVoters(startPageItem + 1);
    history.push(`/admin?page=${startPageItem + 1}`);
    // setHandleChange(false);
  };

  const handlePrev = () => {
    // setLoading(true);
    setHandleChange(true);
    setSerialNo(serialNo - 10);
    setStartPageItem(startPageItem - 1);
    fetchVoters(startPageItem - 1);
    history.push(`/admin?page=${startPageItem - 1}`);
    // setHandleChange(false);
  };
  // if (!isValid || tokenExpired) {
  //   history.push("/");
  // }

  return (
    console.log(handleChange, "serial no."),
    (
      <>
        <MainLayout headerProps={{ heading: "Voters List" }} showFooter={false}>
          {/* <SideBarDrawerIcon open={showSideNav}>
          <IconButton
            style={{ color: "black" }}
            aria-label="open drawer"
            onClick={toggleSideNav}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </SideBarDrawerIcon> */}
          <StyledContainer $open={showSideNav} maxWidth="lg">
            <StyledTitle>VOTERS REGISTRATION PANEL</StyledTitle>
            <FlexColEnd width="100%" mb={2}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="input-with-sx"
                  label="Search"
                  variant="outlined"
                  onChange={(e: any) => {
                    setSearchValue(e.target.value);
                    fetchSearchVoters(e.target.value);
                  }}
                  style={{
                    borderRadius: "0",
                  }}
                />
                <SearchIcon
                  onClick={() => fetchSearchVoters(searchValue)}
                  style={{
                    backgroundColor: "#0cae7d",
                    color: "white",
                    padding: "6%",
                  }}
                />
              </Box>
            </FlexColEnd>
            <TableContainer component={Paper}>
              {votersData && (
                <Table aria-label="customized table">
                  <TableHead style={{ color: "white" }}>
                    <StyledTableHeader>
                      <StyledTableHeaderData>#</StyledTableHeaderData>
                      <StyledTableHeaderData>CNIC</StyledTableHeaderData>
                      <StyledTableHeaderData>
                        Passport Number
                      </StyledTableHeaderData>
                      <StyledTableHeaderData>
                        Registration Status
                      </StyledTableHeaderData>
                      <StyledTableHeaderData>Actions</StyledTableHeaderData>
                    </StyledTableHeader>
                  </TableHead>
                  <TableBody>
                    {votersData.length ? (
                      votersData.map((row, index) => (
                        <TableRow
                          key={index}
                          onClick={() => history.push("/details/" + row.uuid)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderBottom: "1px solid #DBDBDB",
                          }}
                        >
                          <StyledTableData>{serialNo + index}</StyledTableData>
                          <StyledTableData>
                            {row.national_identity}
                          </StyledTableData>
                          <StyledTableData>{row.passport_nr}</StyledTableData>
                          <StyledTableData>
                            {row.status == "ACTIVE" ? (
                              <ActiveButton>Active</ActiveButton>
                            ) : (
                              <PendingButton>Pending</PendingButton>
                            )}
                          </StyledTableData>
                          <StyledTableData>
                            <TextButton
                              variant="text"
                              onClick={() =>
                                history.push("/details/" + row.uuid)
                              }
                            >
                              View details
                            </TextButton>
                          </StyledTableData>
                        </TableRow>
                      ))
                    ) : (
                      <FlexRowCenter p={4}>
                        <Typography>No Records Found</Typography>
                      </FlexRowCenter>
                    )}
                  </TableBody>
                </Table>
              )}
              {votersData.length > 0 && (
                <Box
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  flexDirection="row"
                >
                  <Box p={2}>
                    <Typography>
                      {"Page " + currentPage + " of " + totalPages}
                    </Typography>
                  </Box>
                  <Box p={2}>
                    <Button
                      style={{ margin: 0, padding: 0, minWidth: "30px" }}
                      disabled={currentPage == 1 || loading}
                      onClick={handlePrev}
                    >
                      <KeyboardArrowLeftIcon />
                    </Button>
                    <Button
                      style={{ margin: 0, padding: 0, minWidth: "30px" }}
                      disabled={currentPage == totalPages || loading}
                      onClick={handleNext}
                    >
                      <KeyboardArrowRightIcon />
                    </Button>
                  </Box>
                </Box>
                // <TablePagination
                //   component="div"
                //   count={totalPages}
                //   page={currentPage}
                //   onPageChange={handleChangePage}
                //   rowsPerPage={10}
                //   rowsPerPageOptions={[10]}
                // />
              )}
            </TableContainer>
          </StyledContainer>
        </MainLayout>
      </>
    )
  );
};
