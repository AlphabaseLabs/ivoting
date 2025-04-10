import React, { useState, useEffect } from "react";
import { Header } from "../../components/MainLayout/Header";
import {
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useAllTransanctions } from "../../Hooks/useAllTransanctions";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export default function Constituencies() {
  const [data, setData] = useState();

  function createData(contest_name, candidate, party) {
    return { contest_name, candidate, party };
  }

  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    async function getData() {
      const rows = [];

      let res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_DEV_URL}/api/v1/manifest/get-all-`,
      });
      console.log(res, "constituency");

      Object.keys(res.data).map((item1, index) => {
        let singleConstituency = res.data[item1];
        singleConstituency.map((item2) => {
          return rows.push(
            createData(item1, item2.name.text[0].value, item2.party_id)
          );
        });
      });

      setData(rows);
    }
    getData();
  }, []);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const rows = [];

    let res = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_DEV_URL}/api/v1/manifest/get-all-?query=${e.target.value}`,
    });
    console.log(res, "constituency");

    Object.keys(res.data).map((item1, index) => {
      let singleConstituency = res.data[item1];
      singleConstituency.map((item2) => {
        return rows.push(
          createData(item1, item2.name.text[0].value, item2.party_id)
        );
      });
    });

    setData(rows);
  };

  // ];
  return (
    console.log(data, "ROWSSSSSSSS"),
    (
      <>
        <Header />
        <Box display="flex" py={4} mt={10} justifyContent="center">
          <Paper elevation={8} sx={{ width: "96%" }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItem="center"
              my={4}
              p={4}
            >
              <Box
                sx={{
                  backgroundColor: "#CCD5D8",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
                p={2}
              >
                <Box
                  m={2}
                  display="flex"
                  justifyContent="center"
                  alignItem="center"
                >
                  <TextField
                    sx={{ backgroundColor: "white", width: "350px" }}
                    placeholder="Search Contest / Candidate Name"
                    onChange={(e) => handleChange(e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <TableContainer component={Paper} sx={{ width: "600px" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Contest Name</TableCell>
                        <TableCell align="center">Candidate</TableCell>
                        <TableCell align="center">Party</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data ? (
                        data.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">
                              {row.contest_name}
                            </TableCell>
                            <TableCell align="center">
                              {row.candidate}
                            </TableCell>
                            <TableCell align="center">{row.party}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center">
                            <Box
                              // width="100%"
                              display="flex"
                              height={100}
                              // justifyContent="center"
                              alignItems="center"
                            >
                              <CircularProgress />
                            </Box>
                          </TableCell>
                          <TableCell align="center"></TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Paper>
        </Box>
        {/* <Paper
        // sx={{
        //   width: "90vw",
        //   marginTop: 12,
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
      >
        <Box>
          
        </Box>
      </Paper> */}
      </>
    )
  );
}
