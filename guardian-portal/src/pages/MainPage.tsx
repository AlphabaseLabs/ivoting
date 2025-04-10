import { Button } from "@mui/material";
import { UseMainLayout } from "../components/MainLayout/UseMainLayout";
import { FlexColCenter, FlexColEnd, ShadowContainer } from "../elements";
export const MainPage: React.FC<{}> = () => {
  return (
    <>
      <UseMainLayout>
        <ShadowContainer maxWidth="md" sx={{ mt: 20 }}>
          <FlexColCenter sx={{ width: "100%" }}>
            <Button variant="contained">Login</Button>
          </FlexColCenter>
        </ShadowContainer>
      </UseMainLayout>
    </>
  );
};
