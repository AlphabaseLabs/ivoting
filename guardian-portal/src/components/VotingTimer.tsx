import { Box, Typography, CircularProgress } from "@mui/material";
export const VotingTimer: React.FC<{}> = () => {
  return (
    <Box display="flex">
      <CircularProgress
        variant="determinate"
        value={75}
        color="primary"
        size={60}
        thickness={3}
      />
      <Box
        ml={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItem="center"
      >
        <Typography>53/80</Typography>
        <Typography variant="caption">Votes Cated</Typography>
      </Box>
      {/* <Box
        position="absolute"
        mt={4}
        ml={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography align="center" variant="h5" color="secondary">
          21/54
        </Typography>
        <Typography
          variant="caption"
          width={100}
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Votes Casted
        </Typography>
      </Box> */}
    </Box>
  );
};
