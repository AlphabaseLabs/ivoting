import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { wildWaterMelon } from "~/styles";
import { FlexColCenter, Button } from "~/components";

export const NotFoundPage: React.FC<{}> = () => {
  const history = useHistory();
  return (
    <FlexColCenter my="auto" mt="200px">
      <Typography
        component="h2"
        style={{ fontSize: "24px" }}
      >{`All who wanders are not lost but the page you're looking for is not found.`}</Typography>
      <Box mt="40px">
        <Button
          style={{ color: "white", background: wildWaterMelon }}
          onClick={() => history.push("/admin")}
        >
          Go to home page
        </Button>
      </Box>
    </FlexColCenter>
  );
};
