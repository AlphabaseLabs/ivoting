import Box from "@material-ui/core/Box";
import { headerHeight } from "~/styles";
import { useAppProvider } from "~/hooks";
import { Header, HeaderProps } from "./Header";
import { Footer } from "./Footer";
import { SideNav } from "./SideNav";
import { SearchContainer } from "./elements";

interface Props {
  headerProps?: HeaderProps;
  showHeader?: boolean;
  showFooter?: boolean;
}
export const MainLayout: React.FC<Props> = ({
  headerProps = { heading: "" },
  showHeader = true,
  showFooter = true,
  children,
}) => {
  const { showSideNav, toggleSideNav } = useAppProvider();

  return (
    <Box>
      {showHeader && <Header {...headerProps} />}
      {/* <SideNav open={showSideNav} togleSideNavBar={toggleSideNav} /> */}
      <SearchContainer
        open={showSideNav}
        marginTop={showHeader ? `${headerHeight}px` : 0}
      >
        {children}
      </SearchContainer>
      {showFooter && <Footer />}
    </Box>
  );
};
