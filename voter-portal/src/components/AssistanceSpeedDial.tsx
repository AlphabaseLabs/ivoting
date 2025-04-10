import { Box, Card, CardContent, SpeedDial } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

export default function BasicSpeedDial() {
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {/* {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))} */}
        <Card>
          <CardContent>hellloo</CardContent>
        </Card>
      </SpeedDial>
    </Box>
  );
}
