//@ts-nocheck
import { Box, Card, Hidden, Typography } from "@mui/material";
import { useState } from "react";
import generalLogo from "../../assets/general-logo.jpg";
import translate from "../../i18n/translate";
import winner from "../../assets/winner.svg";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import NAResultPanel from "./ResultPanel";
import PAResultPanel from "./ResultPanel";
import { TabsButton } from "../../pages/pagesElements";
import SpeedDialComp from "../../components/SpeedDialComp/SpeedDialComp";
import { useEffect } from "react";
import { fetchResults } from "../../Services/ballotService";

function ResultComp(props: any) {
  const [value, setValue] = useState(0);
  const [results, setResults] = useState<any>();

  useEffect(() => {
    getResults();
  }, []);

  const [keys, setKeys] = useState([]);

  const getResults = async () => {
    try {
      let res = await fetchResults();
      setResults(res);
    } catch (err) {
      console.log("api fail");
    }

    // let keyArray = Object.keys(res);
    // console.log(keyArray);
    // setKeys(keyArray);
  };

  const tabContent = [
    <NAResultPanel blue={false} results={results} />,
    <PAResultPanel blue={true} results={results} />,
  ];
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="85vh"
      alignItems="center"
    >
      {results === false ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="100%"
        >
          <AutorenewIcon fontSize="large" />
          <Typography>
            Election is in progress please wait the election to end to get
            results.
          </Typography>
        </Box>
      ) : (
        <>
          <Box mt={2} display={{ lg: "none", md: "none" }}>
            <Card
              sx={{
                width: 200,
                height: 120,
                borderStyle: "solid",
                borderColor: value === 0 ? "#0CAE7D" : "#366CBD",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: value === 0 ? "#0CAE7D" : "#366CBD",
                  color: "white",
                }}
                align="center"
              >
                {translate("winner")}
              </Typography>
              <Box mt={1} display="flex" justifyContent="center">
                <img
                  height={40}
                  width={40}
                  src={generalLogo}
                  alt="winner candidate party sign"
                />
              </Box>
              <Typography
                mt={1}
                color="primary"
                variant="body2"
                align="center"
                sx={{
                  color: value === 0 ? "#0CAE7D" : "#366CBD",
                }}
              >
                {results &&
                  Object.keys(results).map((item, indexs) => {
                    if (value !== 0) {
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
              {/* <Typography variant="subtitle2" align="center">
              5000 Votes
            </Typography> */}
            </Card>
          </Box>

          <Box
            display="flex"
            mt={3}
            width="100%"
            flexDirection={{
              lg: "row",
              md: "column-reverse",
              xs: "column-reverse",
            }}
          >
            <Box
              mt={{ lg: 0, md: 2, xs: 2 }}
              ml={{ xs: 8, md: 4 }}
              display="flex"
              flexDirection="column"
            >
              <Box display="flex" alignItems="cente">
                {/* <Typography variant="caption">
                {translate("totalCand")}:
              </Typography>
              <Typography ml={1} variant="body2">
                250
              </Typography> */}
              </Box>

              <Box display="flex">
                {/* <Typography variant="caption">
                {translate("totalVotes")}:
              </Typography>
              <Typography ml={1} variant="body2">
                26000
              </Typography> */}
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
            >
              <TabsButton
                $bgColor={value === 0 ? "#0CAE7D" : "white"}
                $borderColor={value !== 0 ? "#CDCDCD" : "#0CAE7D"}
                onClick={() => setValue(0)}
                variant="outlined"
                disableRipple
                sx={{
                  "&:hover": {
                    background: "#0CAE7D",
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: value === 0 ? "white" : "black",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  {translate("nA")}
                </Typography>
              </TabsButton>
              <TabsButton
                disableRipple
                $bgColor={value === 1 ? "#0CAE7D" : "white"}
                $borderColor={value !== 1 ? "#0CAE7D" : "#0CAE7D"}
                onClick={() => setValue(1)}
                variant="outlined"
                sx={{
                  "&:hover": {
                    background: "#0CAE7D",
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: value === 1 ? "white" : "black",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  {translate("pA")}
                </Typography>
              </TabsButton>
            </Box>
          </Box>

          {tabContent[value]}
        </>
      )}
    </Box>
  );
}

export default ResultComp;
