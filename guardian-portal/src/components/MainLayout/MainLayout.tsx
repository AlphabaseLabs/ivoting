import { Box } from "@mui/material";
import SideNav from "../SideNav/SideNav";
import { Header } from "./Header";

function MainLayout({ children, sideBar }: any) {
  return (
    <>
      <Header />
      {/* <Grid container> */}
        {/* <SideNav /> */}
        {/* <Grid item lg={9} md={8} sm={7} mt={12}> */}
        <Box mt={10}>
          {children}
          </Box>
        {/* </Grid> */}
      {/* </Grid> */}
    </>
  );
}

export default MainLayout;
