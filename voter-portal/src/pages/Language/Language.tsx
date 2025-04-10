import { Box, Button, Hidden, Paper, Typography } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import HeaderMain from "../../components/Header/Header";
import translate from "../../i18n/translate";
import { ContainedButton, HeadingTypo } from "../pagesElements";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { connect } from "react-redux";
import { changeSystemLanguage } from "../../Store/rootAction";
import { LOCALES } from "../../i18n";
import { useHistory, useLocation } from "react-router-dom";

function Language({ systemLang, changeSystemLanguage }: any) {
  const history = useHistory();

  const handleLangChange = (lang: string) => {
    console.log("lang", lang);
    if (lang == "urdu") {
      changeSystemLanguage(LOCALES.URDU);
    } else {
      changeSystemLanguage(LOCALES.ENGLISH);
    }
    history.push("/Register");
  };
  return (
    <>
      <HeaderMain />
      <Hidden smUp>
        <Box
          display="flex"
          pt={7}
          justifyContent="center"
          sx={{ backgroundColor: "#EAF4F2" }}
        >
          <Paper
            sx={{
              width: "95vw",
              boxShadow: "none",
              borderRadius: "40px",
              border: "10px solid white",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              minHeight="83vh"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h5">Please Select your Language</Typography>
              <Typography variant="h5">
                براہ کرم اپنی زبان منتخب کريں
              </Typography>
              <ContainedButton
                disableRipple
                sx={{
                  "&:hover": {
                    background: "#0CAE7D",
                  },
                }}
                onClick={() => handleLangChange("eng")}
              >
                <Typography>English</Typography>
                <ArrowForwardIcon />
              </ContainedButton>
              <ContainedButton
                sx={{
                  "&:hover": {
                    background: "#0CAE7D",
                  },
                }}
                onClick={() => handleLangChange("urdu")}
              >
                <Typography>اردو</Typography>
                <ArrowForwardIcon />
              </ContainedButton>
            </Box>
          </Paper>
        </Box>
      </Hidden>

      <Hidden smUp>
        <Footer />
      </Hidden>
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    systemLang: state.rootReducer.systemLanguage,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    changeSystemLanguage: (lang: string) =>
      dispatch(changeSystemLanguage(lang)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Language);
