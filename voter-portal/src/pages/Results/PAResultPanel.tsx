// @ts-nocheck
import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { candidatesList } from "../../Constants/candidates";
import bat from "../../assets/bat.png";

export default function PAResultPanel() {
  return (
    <Box
      mt={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box mr={1} display="flex" width="100%">
        <Box mr={8} display="flex" flexDirection="column" justifyContent="left">
          <Box>
            <Typography variant="caption">
              Total Provisional Assemble Candidates: 250
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption">Total Votes Casted: 26000</Typography>
          </Box>
        </Box>
        <Card
          raised
          sx={{ width: 200, borderStyle: "solid", borderColor: "green" }}
        >
          {/* <Box mr={4} ml={4}> */}
          <Typography sx={{ backgroundColor: "green" }} align="center">
            WINNER
          </Typography>
          <Box display="flex" justifyContent="center">
            <img src={bat} alt="winner candidate party sign" />
          </Box>
          <Typography align="center">Imran Khan</Typography>
          <Typography align="center">500 Votes</Typography>
          <Typography align="center">PTI</Typography>
          {/* </Box> */}
        </Card>
      </Box>

      <Box p={2} height="50vh" overflow="auto">
        <Grid container spacing={2} justifyContent="center">
          {candidatesList.map((item, index) => {
            return (
              <Grid item sm={4} md={4} lg={4}>
                <Card
                  sx={{
                    height: 75,
                    width: 175,
                    borderLeftStyle: "solid",
                    borderLeftColor: "green",
                  }}
                  raised
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box mr={1} style={{ overflow: "auto" }}>
                        <img
                          height="70%"
                          width="70%"
                          src={item.img}
                          alt="candidate party sign"
                        />
                      </Box>

                      <Box display="flex" flexGrow={1}>
                        <Typography variant="caption">{item.name}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
