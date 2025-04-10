import { Typography } from "@mui/material";
import translate from "../i18n/translate";

export const AreaLabel: React.FC<{}> = ({ user, assembly }: any) => {
  return (
    <Typography
      pt={1}
      pb={1}
      pr={2}
      pl={2}
      variant="body2"
      // color="primary"
      align="center"
      sx={{ backgroundColor: "#1F7F6226", color: "#1F7F62" }}
    >
      Voting For&nbsp;
      {/* {user && assembly == "NA" ? user["elections"][0] : user["elections"][1]} */}
      {assembly}
      {/* {translate("votLoc")} */}
    </Typography>
  );
};
