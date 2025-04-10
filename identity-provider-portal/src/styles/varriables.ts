import { createMuiTheme } from "@material-ui/core/styles";

// Material ui custom break points

export const MuiCustomBreakPoints = createMuiTheme({
  typography: {
    fontFamily: ["Fira Sans"].join(","),
    h5: { textTransform: "capitalize" },
    h6: { textTransform: "capitalize" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
  },
});

// colors

// Primary
export const wildWaterMelon = "#FF5A60";
export const teelish = "#2AA39A";
export const background = "#f7f7f7";

// text colors

export const darkBlue = "#203541";
export const white = "#ffffff";
export const darkGrey = "#26292d";
export const smokeGrey = "#7B7B7B";
export const ashWhite = "#BBBBBB";
export const lightAshWhite = "#E1E1E1";
export const vulcanGrey = "#373A40";
// z-index

export const headerHeight = 75;

export const tabHeaderZIndex = 100;
export const headerZindex = 9999;
export const menuZIndex = headerZindex + 1;

// break-points
export const desktopXlWidthPixels = 1650;
export const desktopLgWidthPixels = 1400;
export const desktopLgWidth = `${desktopLgWidthPixels}px`;
export const desktopWidthPixels = 1200;
export const desktopWidth = `${desktopWidthPixels}px`;
export const tabletLandscapeWidthPixels = 1024;
export const tabletLandscapeWidth = `${tabletLandscapeWidthPixels}px`;
export const tabletWidthPixels = 768;
export const tabletWidth = `${tabletWidthPixels}px`;
export const mobileLandscapeWidthPixels = 576;
export const mobileLandscapeWidth = `${mobileLandscapeWidthPixels}px`;
export const mobileWidthPixels = 320;
export const mobileWidth = `${mobileWidthPixels}px`;
