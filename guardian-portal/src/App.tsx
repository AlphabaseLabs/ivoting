import { AppWrapper } from "./components/AppWrapper/AppWrapper";
import { AppProvider } from "./components/AppProvider";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00B07B",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#0CAE7D",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#353535",
      // secondary: "#98C1B9",
      secondary: "#97B7AF",
      disabled: "#C4E5DD",
    },
    error: {
      main: "#F93D3D",
    },
    common: {
      white: "#E4F2EF",
    },
  },
  typography: {
    // fontFamily: "Lato",
    h6: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    body2: {
      // fontWeight: "bold",
      color: "#D3D3D3",
    },
    subtitle1: {
      fontWeight: "bold",
      color: "#565656",
      fontFamily: "Lato",
      fontSize: "13.5px",
    },
  },
});

export const App: React.FC<{}> = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <AppWrapper />
      </ThemeProvider>
    </AppProvider>
  );
};
