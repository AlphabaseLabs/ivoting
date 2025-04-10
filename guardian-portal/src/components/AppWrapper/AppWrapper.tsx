import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RegistrationPage } from "../../pages/RegistrationPage";
import Login from "../../pages/Login";
import ConstituencyList from "../ConstituencyList/ConstituencyList";
import AccessControl from "../../pages/AccessControl";
import NADashboard from "../../pages/DashboardMain/NADashboard";
import PADashboard from "../..//pages/DashboardMain/PADashboard";
import Results from "../../pages/DashboardMain/Results";
import ResultGeneration from "../../pages/DashboardMain/ResultGeneration";
import LandingPage from "../../pages/LandingPage/LandingPage";
import ElectionControlAccess from "../../pages/LandingPage/electionControlAccess";
import Constituencies from "../../pages/Constituencies/Constituencies";

export const AppWrapper: React.FC<{}> = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/control-panel" exact component={LandingPage} />
          <Route path="/register" exact component={RegistrationPage} />
          <Route path="/constituences" exact component={Constituencies} />
          <Route path="/election-contest" exact component={NADashboard} />
          <Route
            path="/election-contest/national-assembly"
            exact
            component={NADashboard}
          />
          <Route
            path="/election-contest/provincial-assembly"
            exact
            component={PADashboard}
          />
          <Route path="/election-contest/result" exact component={Results} />
          <Route path="/results" exact component={Results} />
          <Route
            path="/election-contest/result-generation"
            exact
            component={ResultGeneration}
          />
          <Route path="/access-control" exact component={AccessControl} />
          <Route
            path="/constituency-list/:contestId"
            exact
            component={ConstituencyList}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};
