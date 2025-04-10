// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Hidden,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadPhotoExample from "../../assets/uploadPhotoExample.svg";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import translate from "../../i18n/translate";
import { FlexBox, FlexColCenter } from "../../Views/elements";
import { connect } from "react-redux";
import Webcam from "react-webcam";
import { Alert } from "@mui/material";
import { InputLabel, SubHeading } from "../../pages/pagesElements";
interface IProps {
  handleNext: (type: string) => void;
  handlechange: (e: any) => void;
  systemLang: string;
  displayImg: any;
  handleBack: () => void;
  setFile: (file: any) => void;
  verifyUserImage: () => void;
  userImgFile: any;
  setDisplayImg: (file: any) => void;
  errorMsg: string;
}

function UploadPicture({
  handleNext,
  systemLang,
  verifyUserImage,
  handlechange,
  displayImg,
  setFile,
  errorMsg,
  handleBack,
  userImgFile,
  setDisplayImg,
  setError,
}: IProps) {
  const [startWebcam, setStartWebcam] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 6000);

    return () => clearTimeout(timeout);
  }, [errorMsg]);

  const webcamRef = React.useRef(null);
  const photoInput: any = useRef();
  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };

  const takePhotoBtn = (e: any) => {
    e.preventDefault();
    setDisplayImg(null);
    setFile(null);
    setStartWebcam(true);
    sessionStorage.removeItem("userImg");
  };

  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  const handleWebCamImg = React.useCallback(() => {
    if (webcamRef !== null && webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(webcamRef.current.getScreenshot(), "web image");
      urltoFile(imageSrc, "hello.jpeg", "image/jpeg").then((res) =>
        setFile(res)
      );
      // setFile(urltoFile(imageSrc, "hello.txt", "text/plain"));
      setDisplayImg(imageSrc);
    }
  }, [webcamRef]);

  const handleImgFunc = () => {
    if (displayImg != null) {
      return (
        <Box style={{ margin: 30 }}>
          <img height={200} width={350} src={displayImg} alt="upload example" />
        </Box>
      );
    } else if (startWebcam) {
      return (
        <>
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <Button
            sx={{ textTransform: "none", marginTop: "3%" }}
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleWebCamImg}
          >
            {translate("captureBtn")}
          </Button>
          <Typography
            mt={1}
            align="center"
            variant="caption"
            width={120}
            sx={{ fontWeight: "bold" }}
          >
            {translate("pictureDec")}
          </Typography>
        </>
      );
    } else {
      return (
        <img
          height={150}
          width={150}
          src={UploadPhotoExample}
          alt="upload example"
        />
      );
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      // alignItems="center"
    >
      <Hidden smDown>
        <FlexBox mt={1} $direction={systemLang == "en-US" ? "start" : "end"}>
          <SubHeading>{translate("pictureHeader")}</SubHeading>
        </FlexBox>
      </Hidden>
      <Hidden smUp>
        <FlexBox mt={1} $direction={systemLang == "en-US" ? "start" : "end"}>
          <Typography variant="body2">{translate("pictureHeader")}</Typography>
        </FlexBox>
      </Hidden>

      <FlexBox mt={1} $direction={systemLang == "en-US" ? "start" : "end"}>
        <InputLabel variant="subtitle1">
          {translate("pictureSubHeader")}
        </InputLabel>
      </FlexBox>

      <Box
        mt={2}
        display="flex"
        flexDirection="column"
        sx={{
          borderStyle: "dotted",
          borderColor: "#CCCCCC",
          backgroundColor: "#CCCCCC33",
        }}
      >
        <Box mt={2} display="flex" justifyContent="center" alignItems="center">
          <Box mr={1}>
            <input
              ref={photoInput}
              accept="image/*"
              onChange={handlechange}
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
            />
            <Button
              size="small"
              color="secondary"
              variant="contained"
              sx={{ height: 45, width: 150, textTransform: "none", padding: 0 }}
              onClick={() => photoInput.current.click()}
              startIcon={<CloudUploadOutlinedIcon />}
            >
              {translate("uploadBtn")}
            </Button>
          </Box>
          <Box>
            <Button
              sx={{ height: 45, width: 150, textTransform: "none", padding: 0 }}
              size="small"
              variant="contained"
              color="secondary"
              onClick={takePhotoBtn}
              startIcon={<CameraAltOutlinedIcon />}
            >
              {translate("takePhotoBtn")}
            </Button>
          </Box>
        </Box>
        <Box
          mt={2}
          mb={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {handleImgFunc()}
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box mt={1}>
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "white",
              borderColor: "#8F9D99",
              height: 45,
              width: 100,
              color: "#0CAE7D",
              border: "1px solid #0CAE7D",
              borderRadius: "8px",
            }}
            variant="outlined"
            onClick={handleBack}
          >
            <Typography
              variant="caption"
              color="secondary"
              sx={{ fontSize: "16px" }}
            >
              {translate("backBtn")}
            </Typography>
          </Button>
        </Box>

        <Box mt={1}>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={() => verifyUserImage()}
            sx={{ height: 45 }}
          >
            <Typography
              sx={{ textTransform: "none" }}
              variant="body2"
              color="common.white"
            >
              {translate("submitBtn")}
            </Typography>
          </Button>
        </Box>
      </Box>

      {errorMsg && (
        <FlexColCenter>
          {/* <Snackbar
          open={errorMsg}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={() => setError("")}
        > */}
          <Alert severity="error" sx={{ textAlign: "center" }}>
            {errorMsg}
          </Alert>
          {/* </Snackbar> */}
        </FlexColCenter>
      )}
    </Box>
  );
}
const mapStateToProps = (state: any) => {
  return {
    systemLang: state.rootReducer.systemLanguage,
  };
};

export default connect(mapStateToProps, null)(UploadPicture);
