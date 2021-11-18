import { Box } from "@mui/system";
import type { NextPage } from "next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header";
import Head from "next/head";
import { Grid } from "@mui/material";
import { AppState } from "../store/reducers/main.types";
import ProductCard from "../components/productCard/productCard";
import Footer from "../components/footer";

const Home: NextPage = () => {
  const products = useSelector((state: AppState) => state.main.products);

  return (
    <Box>
      <Head>
        <title>Prueba técnica Betterware</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Box p="5rem" >
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          {products.map((product) => (
            <Grid key={product.code} item xs={12} md={3}>
              <ProductCard data={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
