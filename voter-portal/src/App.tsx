import { createContext, useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation,
  Router,
  Redirect,
} from "react-router-dom";
import { connectToContract } from "./Services/accessProviderService";
import { electionAbi } from "./contracts/election";
import { createTheme, ThemeProvider } from "@mui/material";
import { SignIn } from "./pages/SignIn/SignIn";
import { VotingMain } from "./pages/Voting/Voting";

import ResetLoginPINMain from "./components/ResetLoginPIN/resetLoginPINMain";
import { I18nProvider, LOCALES } from "./i18n";
import { connect } from "react-redux";
import { useEffect } from "react";

import RegistrationMain from "./pages/Registration/RegistrationMain";
import Results from "./pages/Results/Results";
import Language from "./pages/Language/Language";
import { getSystemState } from "./Services/accessProviderService";
import Tallying from "./pages/Tallying/Tallying";
import UseCheckState from "./Hooks/useCheckState";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00B07B",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#0CAE7D",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#353535",
      // secondary: "#98C1B9",
      secondary: "#97B7AF",
      disabled: "#C4E5DD",
    },
    error: {
      main: "#F93D3D",
    },
    common: {
      white: "#E4F2EF",
    },
  },
  typography: {
    fontFamily: "Lato",
    h6: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    body2: {
      fontWeight: "bold",
      color: "black",
    },
    subtitle1: {
      fontWeight: "bold",
      color: "#565656",
      fontFamily: "Lato",
      fontSize: "13.5px",
    },
  },
});

const AppLanguage = createContext(LOCALES.ENGLISH);
function App(props: any) {
  let prevLang = sessionStorage.getItem("systemLang");
  let history = useHistory();
  const [lang, setLang] = useState<string>(
    prevLang ? prevLang : LOCALES.ENGLISH
  );
  const [currentState, setcurrentState] = useState("");
  useEffect(() => {
    setLang(props.systemLang);
  }, [props.systemLang]);

  useEffect(() => {
    console.log("getState");

    getState();
    // landingPage();
    // setcurrentState("Voting");
  }, []);

  const getState = async () => {
    let data: any = JSON.stringify({
      election_id: process.env.REACT_APP_ELECTION_ID,
      object_id: "abc",
    });
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      let apiState: any = await axios.put(
        `${process.env.REACT_APP_ACCESS_PROVIDER_URL}/api/v1/manifest/get-status/`,
        data,
        { headers }
      );

      console.log(apiState, "STATUSSSSSSSSSSSSSSSSSSSSSSs");

      const electionContract = await connectToContract(
        electionAbi,
        process.env.REACT_APP_ELECTION_CONTRACT_ADRESS || ""
      );
      let contractState = await electionContract.methods
        .getElectionStateString()
        .call();
      console.log("state from api is: ", apiState.data.status);
      console.log("state from contract is: ", contractState);
      if (apiState.data.status == "CLOSED" && contractState == "REGISTRATION") {
        setcurrentState("Registration");
        // return <RegistrationMain />;
      } else if (apiState.data.status == "OPEN" && contractState == "VOTING") {
        setcurrentState("Voting");
        // return <SignIn />;
      } else if (
        apiState.data.status == "CLOSED" &&
        contractState == "VOTING"
      ) {
        setcurrentState("Voting");
        // return <SignIn />;
      } else if (
        apiState.data.status == "CLOSED" &&
        contractState == "TALLYING"
      ) {
        setcurrentState("Tallying");
        // return <Tallying />;
      } else {
        setcurrentState("Registration");
        // return <RegistrationMain />;
      }
      // return state;

      // return status;
    } catch (error) {}
  };

  const landingPage = () => {
    console.log(
      window.location.pathname.includes("SignIn?step"),
      "PATHNAMEEEEE"
    );

    // if (!window.location.pathname.includes("step")) {
    if (currentState === "Registration") {
      if (window.location.pathname.includes("Register")) {
        return null;
      } else {
        history.push("/Register");
      }
      // return <RegistrationMain />;
    } else if (currentState === "Voting") {
      // return <SignIn />;
      if (
        window.location.pathname.includes("SignIn") ||
        window.location.pathname.includes("Voting")
      ) {
        return null;
      } else {
        history.push("/SignIn");
      }
    } else if (currentState === "Tallying") {
      // return <Tallying />;
      history.push("/Tallying");
    }
    // }
  };

  const enableRouting = () => {
    if (currentState === "Registration") {
      return <Route path="/Register" exact component={RegistrationMain} />;
    } else if (currentState === "Voting") {
      return (
        <>
          <Route path="/SignIn" exact component={SignIn} />
          <Route path="/Voting" exact component={VotingMain} />
        </>
      );
    } else if (currentState === "Tallying") {
      return (
        <>
          <Route path="/Tallying" exact component={Tallying} />;
          <Route path="/Results" exact component={Results} />
        </>
      );
    } else {
      return <Route path="/Results" exact component={Results} />;
    }
  };

  return (
    <>
      <AppLanguage.Provider value={lang}>
        <ThemeProvider theme={theme}>
          <I18nProvider locale={lang}>
            <Switch>
              <Route path="/chooseLanguage" exact component={Language} />
              {enableRouting()}
              <Route path="/ResetPin" exact component={ResetLoginPINMain} />
              <Redirect from="/" to="/chooseLanguage" exact />
            </Switch>
            {landingPage()}
          </I18nProvider>
        </ThemeProvider>
      </AppLanguage.Provider>
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    systemLang: state.rootReducer.systemLanguage,
  };
};

export default connect(mapStateToProps, null)(App);
export { AppLanguage };
