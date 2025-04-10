import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Box } from "@mui/material";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
const actions = [
  {
    icon: <PhoneEnabledIcon />,
    name: "For any assistance Call 111 543 543",
  },
];

const useStyles = makeStyles((theme) => ({
  staticTooltipLabel: {
    borderTop: "5px solid  #0CAE7D",
    color: "black",
    fontWeight: "bold",
    width: "250px",
    padding: "24%",
  },
}));
function SpeedDialComp(props: any) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleToggle = () => setOpen(!open);
  return (
    <Box>
      <Box
        sx={{
          // height: 320,
          // transform: "translateZ(0px)",
          flexGrow: 1,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial uncontrolled open example"
          // sx={{ position: "absolute", bottom: 10, right: 16 }}
          icon={open ? <ClearIcon /> : <PhoneEnabledIcon />}
          onClick={handleToggle}
          open={open}
          direction="up"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              tooltipTitle={action.name}
              onClick={handleToggle}
              tooltipOpen
              classes={classes}
              icon={action.icon}
            />
          ))}
        </SpeedDial>
      </Box>
      {/* <img height={60} width={60} src={helpline} alt="helpline" /> */}
    </Box>
  );
}

export default SpeedDialComp;
