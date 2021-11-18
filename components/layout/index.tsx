import { useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { FC } from "react";
import Footer from "../footer";
import Header from "../header";

interface LayoutI {
  children: React.ReactNode;
  title?: string;
}

const Layout: FC<LayoutI> = ({
  children,
  title = "Prueba técnica Betterware",
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Box px={matches ? "5rem" : "1.5rem"} pb="5rem" pt="3rem">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
