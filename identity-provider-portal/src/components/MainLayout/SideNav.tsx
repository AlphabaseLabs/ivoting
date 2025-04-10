import { useHistory } from "react-router-dom";
import { useState } from "react";
import { DrawerProps } from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Close from "@material-ui/icons/Close";
import ArrowForward from "@material-ui/icons/ArrowForward";
import {
  FlexRowCenter,
  FlexRowSpaceBetween,
  FlexColCenter,
} from "~/components";
import {
  Drawer,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  StyledLink,
  StyledTypography,
  drawerWidthClose,
} from "./elements";
import { wildWaterMelon } from "~/styles";
import { ecpLogo } from "~/assets";
import { useAppProvider, useIsMobile } from "~/hooks";
import ListIcon from "@material-ui/icons/List";
import LinkIcon from "@material-ui/icons/Link";
import RedoIcon from "@material-ui/icons/Redo";
import { FlexColStart } from "../elements";
interface Props {
  togleSideNavBar: () => void;
}

export const SideNav: React.FC<Props & DrawerProps> = (props) => {
  const isMobile = useIsMobile();
  const { setShowSideNav } = useAppProvider();
  const history = useHistory();
  const [expandedPreIco, setExpandedPreIco] = useState(
    history?.location?.pathname.toLowerCase().includes("pre-ico")
  );
  const [expandedMarketPlace, setExpandedMarketPlace] = useState(
    history?.location?.pathname.toLowerCase().includes("marketplace")
  );
  const { open, togleSideNavBar } = props;
  // hack for active link styles
  const homelinkStyles: React.CSSProperties =
    history?.location?.pathname === "/" ||
    history?.location?.pathname.includes("/certificate-claim")
      ? { fontWeight: "bold" }
      : { fontWeight: "normal" };

  const hideSideNavOnMobile = () => {
    if (isMobile) setShowSideNav(false);
  };

  return (
    <Drawer variant="permanent" {...props}>
      <FlexRowSpaceBetween>
        <Box />
        <IconButton
          style={{ fontSize: "18px" }}
          aria-label="search"
          onClick={() => togleSideNavBar()}
        >
          <>
            <Hidden xsDown> {open ? <ArrowBack /> : <ArrowForward />}</Hidden>
            <Hidden smUp> {<Close />}</Hidden>
          </>
        </IconButton>
      </FlexRowSpaceBetween>

      <FlexColStart mt="50px">
        <StyledLink
          onClick={() => {
            hideSideNavOnMobile();
          }}
          activeStyle={homelinkStyles}
          to="/"
        >
          <StyledTypography>
            <IconButton>
              <ListIcon />
            </IconButton>
            Voters List
          </StyledTypography>
        </StyledLink>

        <StyledLink
          onClick={() => {
            hideSideNavOnMobile();
          }}
          to="/users"
        >
          <StyledTypography>
            <IconButton>
              <LinkIcon />
            </IconButton>
            Voter Election Mapping
          </StyledTypography>
        </StyledLink>
        <StyledLink
          onClick={() => {
            hideSideNavOnMobile();
          }}
          to="/users"
        >
          <StyledTypography>
            <IconButton>
              <RedoIcon />
            </IconButton>
            Vote Recast Requests
          </StyledTypography>
        </StyledLink>
        {/* <ExpansionPanel
          expanded={expandedMarketPlace}
          onChange={(_, isExpanded) => setExpandedMarketPlace(isExpanded)}
        >
          <ExpansionPanelSummary>
            <StyledTypography>
              <IconButton>
                <RedoIcon />
              </IconButton>
              Vote Recast Requests
            </StyledTypography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <StyledLink
              onClick={() => {
                hideSideNavOnMobile();
              }}
              to="/marketplace/overview"
            >
              <StyledTypography></StyledTypography>
            </StyledLink>
            <StyledLink
              onClick={() => {
                hideSideNavOnMobile();
              }}
              to="/marketplace/configure"
            >
              <StyledTypography>Configure</StyledTypography>
            </StyledLink>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
        {/* <ExpansionPanel
          expanded={expandedPreIco}
          onChange={(_, isExpanded) => setExpandedPreIco(isExpanded)}
        >
          <ExpansionPanelSummary>
            <StyledTypography>Pre ICO</StyledTypography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <StyledLink
              onClick={() => {
                hideSideNavOnMobile();
              }}
              to="/pre-ico/contract-interaction"
            >
              <StyledTypography>Contract</StyledTypography>
            </StyledLink>
            <StyledLink
              onClick={() => {
                hideSideNavOnMobile();
              }}
              to="/pre-ico/transactions"
            >
              <StyledTypography>Transactions</StyledTypography>
            </StyledLink>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
      </FlexColStart>
    </Drawer>
  );
};
