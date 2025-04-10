//@ts-nocheck
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Hidden,
} from "@mui/material";
import { candidatesList } from "../../Constants/candidates";
import generalLogo from "../../assets/general-logo.jpg";
import winner from "../../assets/winner.png";
import translate from "../../i18n/translate";
import { useEffect } from "react";

interface IProps {
  blue: boolean;
  results: any;
}
export default function NAResultPanel({ blue, results }: IProps) {
  results && console.log(results);

  const [keys, setKeys] = useState([]);
  // useEffect(() => {
  //   if (results.length) {
  //     let keyArray = Object.keys(results[0]["NA-53-contest"]);
  //     console.log(keyArray);

  //     setKeys(keyArray);
  //   }
  // }, [results]);
  const getImage = (img) => {
    return img ? img : winner;
  };
  return (
    console.log(results, "result panel"),
    (
      <Box m={2} width="100%" display="flex" justifyContent="center">
        <Box
          mr={2}
          ml={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {/* <Hidden mdDown> */}
          <Box mt={8} display={{ xs: "none", md: "block" }}>
            <Card
              sx={{
                width: 250,
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: blue ? "#366CBD" : "#3DB26C",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: blue ? "#366CBD" : "#3DB26C",
                  color: "white",
                  padding: "2%",
                }}
                align="center"
              >
                {translate("winner")}
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="center"
                  sx={{
                    backgroundColor: blue ? "#366CBD" : "#3DB26C",
                    width: "25%",
                    borderRadius: "80%",
                    padding: "4%",
                  }}
                >
                  <img
                    height={60}
                    width={40}
                    src={generalLogo}
                    alt="winner candidate"
                  />
                </Box>
              </Box>

              <Typography
                mt={1}
                color={blue ? "#366CBD" : "primary"}
                variant="body2"
                align="center"
              >
                {results &&
                  Object.keys(results).map((item, indexs) => {
                    if (blue) {
                      if (item.includes("PP")) {
                        return results[item]["winner"]["name"]["text"][0][
                          "value"
                        ];
                      }
                    } else {
                      if (item.includes("NA")) {
                        return results[item]["winner"]["name"]["text"][0][
                          "value"
                        ];
                      }
                    }
                  })}
              </Typography>
              {/* <Typography
                variant="subtitle2"
                align="center"
                sx={{ marginBottom: "4%" }}
              >
                5000 Votes
              </Typography> */}
            </Card>
          </Box>
          {/* </Hidden> */}
        </Box>
        <Box
          p={2}
          mr={2}
          height={{ xs: "50vh", md: "65vh", lg: "70vh" }}
          flexGrow={1}
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
          <Grid
            container
            spacing={1}
            // mt={2}
            // ml={3}
            display="flex"
            alignItems="center"
            // justifyContent="center"
          >
            {results &&
              Object.keys(results).map((item, index) => {
                let val;

                if (blue) {
                  if (item.includes("PP")) {
                    val = results[item];
                  }
                } else {
                  if (item.includes("NA")) {
                    val = results[item];
                  }
                }

                return (
                  <>
                    {val &&
                      Object.keys(val).map((items, indexs) => {
                        return (
                          <>
                            {items !== "party" && items !== "winner" && (
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                lg={4}
                                key={index}
                              >
                                <Card
                                  sx={{
                                    // height: 75,
                                    borderLeftStyle: "solid",
                                    borderLeftColor: blue
                                      ? "#366CBD"
                                      : "#3DB26C",
                                    borderLeftWidth: 4,
                                    height: "10vh",
                                  }}
                                  raised
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
                                        src={generalLogo}
                                        alt="candidate party sign"
                                      />
                                    </Box>

                                    <Box
                                      display="flex"
                                      flexDirection="column"
                                      flexGrow={1}
                                    >
                                      <Typography variant="body1">
                                        {items}
                                      </Typography>
                                      <Typography
                                        color={blue ? "#366CBD" : "#3DB26C"}
                                        variant="caption"
                                      >
                                        {val[items]} Votes
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Card>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                  </>
                );
              })}
          </Grid>
        </Box>
      </Box>
    )
  );
}
