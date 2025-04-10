import {
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { FlexColCenter, FlexColStart } from "../../elements";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { StyledAccordionDetails } from "../compElements";

function SideNav() {
  return (
    <>
      <Grid item lg={2} md={3} sm={4}>
        <FlexColCenter mt="80px" p={2}>
          <Alert
            severity="info"
            icon={false}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Election will Start in 45 days
          </Alert>
        </FlexColCenter>
        <FlexColStart pl={5}>
          <Accordion sx={{ boxShadow: "0px 0px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ boxShadow: "0px 0px" }}
            >
              <Typography>
                <IconButton>
                  <FormatListBulletedIcon />
                </IconButton>
                Election Contests
              </Typography>
            </AccordionSummary>
            <StyledAccordionDetails>
              <Typography>
                <Link
                  to="/election-contest/national-assembly"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <IconButton>
                    <LabelImportantIcon />
                  </IconButton>
                  National Assembly
                </Link>
              </Typography>
            </StyledAccordionDetails>
            <StyledAccordionDetails>
              <Typography>
                <Link
                  to="/election-contest/provincial-assembly"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <IconButton>
                    <LabelImportantIcon />
                  </IconButton>
                  Provincial Assembly
                </Link>
              </Typography>
            </StyledAccordionDetails>
          </Accordion>

          <Accordion sx={{ boxShadow: "0px 0px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ boxShadow: "0px 0px" }}
            >
              <Typography>
                <IconButton>
                  <MenuOpenIcon />
                </IconButton>
                Access Control
              </Typography>
            </AccordionSummary>
            <StyledAccordionDetails>
              <Typography>
                <Link
                  to="/access-control"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <IconButton>
                    <LabelImportantIcon />
                  </IconButton>
                  Guardian
                </Link>
              </Typography>
            </StyledAccordionDetails>
            {/* <StyledAccordionDetails>
              <Typography>
                <IconButton>
                  <LabelImportantIcon />
                </IconButton>
                Identity Provider
              </Typography>
            </StyledAccordionDetails> */}
            {/* <StyledAccordionDetails>
              <Typography>
                <IconButton>
                  <LabelImportantIcon />
                </IconButton>
                Other Roles
              </Typography>
            </StyledAccordionDetails> */}
          </Accordion>

          <Accordion sx={{ boxShadow: "0px 0px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ boxShadow: "0px 0px" }}
            >
              <Typography>
                <IconButton>
                  <FormatListBulletedIcon />
                </IconButton>
                Elections Results
              </Typography>
            </AccordionSummary>

            {/* <StyledAccordionDetails>
              <Typography>
                <Link
                  to="/election-contest/result-generation"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <IconButton>
                    <LabelImportantIcon />
                  </IconButton>
                  Result Generation
                </Link>
              </Typography>
            </StyledAccordionDetails> */}

            <StyledAccordionDetails>
              <Typography>
                <Link
                  to="/election-contest/result"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <IconButton>
                    <LabelImportantIcon />
                  </IconButton>
                  Results
                </Link>
              </Typography>
            </StyledAccordionDetails>
          </Accordion>
        </FlexColStart>
      </Grid>
      <Grid item>
        <Divider orientation="vertical" sx={{ height: "100vh" }} />
      </Grid>
    </>
  );
}

export default SideNav;
