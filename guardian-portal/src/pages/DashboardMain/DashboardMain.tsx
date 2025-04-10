import { Container } from "@mui/material";
import MainLayout from "../../components/MainLayout/MainLayout";
import NADashboard from "./NADashboard";
import PADashboard from "./PADashboard";
import { Route, useRouteMatch, Switch } from "react-router-dom";

function DashboardMain(props: any) {
  const { path, url }: any = useRouteMatch();

  const getComp = () => {
    console.log("url", url);
    return (
      <>
        <Switch>
          <Route path={url + "/national-assembly"} component={NADashboard} />
          <Route path={url + "/provincial-assembly"} component={PADashboard} />
        </Switch>
      </>
    );
  };

  return (
    <>
      <MainLayout topBar={true}>
        <Container maxWidth={false}>{getComp()}</Container>
      </MainLayout>
    </>
  );
}

export default DashboardMain;
