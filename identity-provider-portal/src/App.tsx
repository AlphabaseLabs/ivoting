import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiCustomBreakPoints } from "~/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppProvider } from "~/components";
import { SignInPage, NotFoundPage, DetailPage, DashboardPage } from "~/pages";
import { ValidLogin } from "./hooks/useMetamaskLogin";
import { useEffect } from "react";

const App: React.FC<{}> = () => {
  const isLogin = ValidLogin();
  useEffect(() => {
    console.log(isLogin[0]);

    // isLogin[0].checkMetaMask();
  }, []);

  return (
    <AppProvider>
      <MuiThemeProvider theme={MuiCustomBreakPoints}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={SignInPage} />
            <Route path="/admin" exact component={DashboardPage} />
            <Route path="/details/:voterId" exact component={DetailPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </AppProvider>
  );
};

export default App;
