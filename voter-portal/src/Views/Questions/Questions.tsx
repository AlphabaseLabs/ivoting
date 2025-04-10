// @ts-nocheck
import { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Hidden,
  TextField,
  Typography,
} from "@mui/material";

import {
  getSecurityQuestions,
  sendAnswers,
} from "../../Services/registrationServices";
import { getIsAuthenticated, getIsTokenSet } from "../../Store/rootAction";
import { FlexBox, FlexColCenter } from "../elements";
import translate from "../../i18n/translate";
import { InputLabel, SubHeading } from "../../pages/pagesElements";

interface IProps {
  handleNext: () => void;
  handleBack: () => void;
  systemLang: string;
  getIsAuthenticated: () => void;
  getIsTokenSet: () => void;
  isAuthenticated: boolean;
  isTokenSet: boolean;
  ans1: string;
  ans2: string;
  setAns: any;
}
interface QuesProps {
  id: number;
  value: string;
}

function Questions({
  handleNext,
  systemLang,
  getIsAuthenticated,
  getIsTokenSet,
  isAuthenticated,
  isTokenSet,
  handleBack,
  ans1,
  ans2,
  setAns,
}: IProps) {
  const [errorMsg, setErrorMsg] = useState<any>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [tokenSet, SetToken] = useState<boolean>(false);
  const [ques, setQues] = useState<any[]>([
    { id: 1, value: "What is your mother's name?" },
    { id: 2, value: "What is your date of birth?" },
  ]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getIsAuthenticated();
    getIsTokenSet();
  }, []);

  useEffect(() => {
    setAuthenticated(isAuthenticated);
    SetToken(isTokenSet);
  }, [isAuthenticated, isTokenSet]);

  useEffect(() => {
    const getQuestions = async () => {
      const res = await getSecurityQuestions();
      console.log(res);

      setQues(res);
    };
    let quesArray = [];
    if (
      sessionStorage.getItem("ques1") == null &&
      sessionStorage.getItem("ques2") == null
    ) {
      getQuestions();
    } else {
      let ques1 = JSON.parse(sessionStorage.getItem("ques1"));
      quesArray.push(ques1);
      let ques2 = JSON.parse(sessionStorage.getItem("ques2"));
      quesArray.push(ques2);
      setQues(quesArray);
    }
  }, []);

  const [ansArray, setAnsArray] = useState<any[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  let answers: any[] = [];
  const handleChange = (e: ChangeEvent<HTMLInputElement>, quesId: number) => {
    setHasError(false);

    if (e.target.name == "ans1") {
      setAns({ ans2, ans1: { id: "" + quesId + "", value: e.target.value } });
    } else {
      setAns({ ans1, ans2: { id: "" + quesId + "", value: e.target.value } });
    }
  };

  const handleSubmit = async () => {
    answers.push(ans1);
    answers.push(ans2);
    console.log(answers[0]);

    if (answers[0] && answers[0] != "" && answers[1] && answers[1] != "") {
      if (answers[0].value == undefined || answers[1].value == undefined) {
        setErrorMsg(translate("bothFieldsReq"));
        setHasError(true);
      } else {
        if (authenticated && tokenSet) {
          console.info("authenticated", authenticated, "tokenSet", tokenSet);
          handleNext();
        } else {
          console.info("authenticated", authenticated, "tokenSet", tokenSet);
          try {
            let userId = sessionStorage.getItem("uuid") as string;
            console.log(userId);

            const approve = await sendAnswers(userId, answers);
            sessionStorage.setItem("ques1", ques[0] && JSON.stringify(ques[0]));
            sessionStorage.setItem("ques2", ques[1] && JSON.stringify(ques[1]));
            sessionStorage.setItem("ans1", JSON.stringify(answers[0]));
            sessionStorage.setItem("ans2", JSON.stringify(answers[1]));
            console.info("Voter approved", approve);
            handleNext(3);
          } catch (error) {
            if (error.toString().includes("user must be a UUID")) {
              setErrorMsg(translate("notValidUser"));
            }
            console.info(error);
          }
        }
      }
    } else {
      setErrorMsg(translate("bothFieldsReq"));
    }
  };

  return (
    <>
      <Box>
        <FlexBox $direction={systemLang == "en-US" ? "start" : "end"}>
          <Hidden smDown>
            <SubHeading>{translate("quesHeader")}</SubHeading>
          </Hidden>
          <Hidden smUp>
            <FlexBox
              mt={1}
              $direction={systemLang == "en-US" ? "start" : "end"}
            >
              <Typography variant="body2">{translate("quesHeader")}</Typography>
            </FlexBox>
          </Hidden>
        </FlexBox>

        <Box mt={4}>
          <FlexBox
            display="flex"
            alignItems="center"
            $direction={systemLang == "en-US" ? "start" : "end"}
          >
            <InputLabel align="left">
              {ques[0] && ques[0].id != null && translate("q" + ques[0].id)}
            </InputLabel>
          </FlexBox>

          <Box mt={1} display="flex" alignItems="center">
            <TextField
              sx={{
                backgroundColor: "#E4F2EF",
                paddingTop: 1,
                paddingLeft: 0.5,
              }}
              variant="standard"
              fullWidth
              value={ans1 ? ans1.value : ""}
              name="ans1"
              onFocus={() => setErrorMsg("")}
              onChange={(e) => handleChange(e, ques[0].id)}
              inputProps={{ maxLength: 50 }}
            />
          </Box>
        </Box>
        <Box mt={4}>
          <FlexBox
            display="flex"
            alignItems="center"
            $direction={systemLang == "en-US" ? "start" : "end"}
          >
            <InputLabel align="left">
              {ques[1] && ques[1].id != null && translate("q" + ques[1].id)}
            </InputLabel>
          </FlexBox>

          <Box mt={1} display="flex" alignItems="center">
            <TextField
              sx={{
                backgroundColor: "#E4F2EF",
                paddingTop: 1,
                paddingLeft: 0.5,
              }}
              variant="standard"
              fullWidth
              value={ans2 ? ans2.value : ""}
              name="ans2"
              onFocus={() => setErrorMsg("")}
              onChange={(e) => handleChange(e, ques[1].id)}
              // inputProps={{ maxLength: 50 }}
            />
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          // alignItems="center"
        >
          <Box mt={4}>
            <Button
              sx={{
                textTransform: "none",
                backgroundColor: "white",
                borderColor: "#8F9D99",
                height: 45,
                width: 100,
                color: "#0CAE7D",
                border: "1px solid #0CAE7D",
                borderRadius: "8px",
              }}
              variant="outlined"
              onClick={handleBack}
            >
              <Typography
                variant="caption"
                color="secondary"
                sx={{ fontSize: "16px" }}
              >
                {translate("backBtn")}
              </Typography>
            </Button>
          </Box>

          <Box mt={4}>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              onClick={() => {
                // if (signIn) {
                //  history.push("Voting");
                // }
                handleSubmit();
              }}
              sx={{ height: 45, width: 100 }}
            >
              <Typography
                sx={{ textTransform: "none" }}
                variant="body2"
                color="common.white"
              >
                {translate("nextBtn")}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      {errorMsg && (
        <FlexColCenter mt={5}>
          <Alert severity="error" sx={{ textAlign: "center" }}>
            {errorMsg}
          </Alert>
        </FlexColCenter>
      )}
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.rootReducer.isAuthenticated,
    isTokenSet: state.rootReducer.isTokenSet,
    systemLang: state.rootReducer.systemLanguage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getIsAuthenticated: () => dispatch(getIsAuthenticated()),
    getIsTokenSet: () => dispatch(getIsTokenSet()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Questions);
