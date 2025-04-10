import { Box, Typography } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import translate from "../../i18n/translate";
import "./votingtiming.css";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
export const VotingTimer: React.FC<{}> = () => {
  return (
    <Box display="flex">
      <CircularProgress
        variant="determinate"
        value={75}
        color="primary"
        size={130}
        thickness={3}
      />
      <Box
        position="absolute"
        margin={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography align="center" variant="h5" color="secondary">
          54:21
        </Typography>
        <Typography
          variant="caption"
          width={100}
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          {translate("votingTime")}
        </Typography>
      </Box>
    </Box>
  );
};
