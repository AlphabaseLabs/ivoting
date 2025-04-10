import React, { useState } from "react";
import InputMask from "react-input-mask";
import { Button, TextField, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  underline: {
    "&:before": {
      borderBottom: "none",
    },
    "&:hover": {
      borderBottom: "none",
    },
  },
});

// interface IProps {
//   handleNext: (stateElement: string) => void;
// }

function SignInForm({ handleNext }: any) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickDrop = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDrop = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <>
        <Box mt={2}>
          <Typography variant="h6" color="secondary">
            Add your details
          </Typography>
        </Box>

        <form onSubmit={handleNext}>
          <Box mt={3}>
            <Box mb={1} display="flex">
              <Typography variant="body2">CNIC Number </Typography>
              <Typography color="error" variant="body2">
                {" "}
                *
              </Typography>
            </Box>

            <InputMask
              mask="99999 - 9999999 - 9"

              //   value={cnic}
              //   onChange={(v) =>
              //     setState({
              //       cnic: v.target.value.replace(/\s/g, ""),
              //       passport,
              //       phone,
              //     })
              //   }
            >
              {() => (
                <TextField
                  sx={{
                    backgroundColor: "#E4F2EF",
                    paddingLeft: 1,
                    paddingRight: 1,
                  }}
                  variant="standard"
                  fullWidth
                  placeholder="35200 - 1254088 - 6"
                  InputProps={{ classes }}
                  //   error={cnicError}
                  required
                />
              )}
            </InputMask>
            {/* {cnicError && (
              <Typography color="error" variant="caption">
                Invalid CNIC
              </Typography>
            )} */}
          </Box>

          <Box mt={3}>
            <Box mb={1}>
              <Typography variant="body2">Login PIN</Typography>
            </Box>

            <InputMask
              mask="999999"

              //   value={passport}
              //   onChange={(v) =>
              //     setState({
              //       cnic,
              //       passport: v.target.value.replace(/\s/g, ""),
              //       phone,
              //     })
              //   }
            >
              {() => (
                <TextField
                  fullWidth
                  variant="standard"
                  sx={{
                    backgroundColor: "#E4F2EF",
                    paddingLeft: 1,
                    paddingRight: 1,
                  }}
                  InputProps={{ classes }}
                  //   error={passportError}
                  required
                  size="medium"
                />
              )}
            </InputMask>
            {/* {passportError && (
              <Typography color="error" variant="caption">
                Invalid Passport
              </Typography>
            )} */}
          </Box>

          <Box width="100%" display="flex" justifyContent="end" mt={4}>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              type="submit"
              sx={{ height: 45, width: 100 }}
            >
              <Typography
                sx={{ textTransform: "none" }}
                variant="body2"
                color="common.white"
              >
                Continue
              </Typography>
            </Button>
          </Box>
        </form>
      </>
    </>
  );
}

export default SignInForm;
