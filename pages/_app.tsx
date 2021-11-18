import React from "react";
import { AppProps } from "next/app";
import { wrapper } from "../store/store";
import "../styles/index.css";
import "@fontsource/poppins";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(MyApp);
