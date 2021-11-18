import type { NextPage } from "next";
import { Grid } from "@mui/material";
import { AppState } from "../store/reducers/main.types";
import ProductCard from "../components/productCard/productCard";
import Layout from "../components/layout";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const products = useSelector((state: AppState) => state.main.products);

  return (
    <Layout>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {products.map((product) => (
          <Grid key={product.code} item xs={12} md={3}>
            <ProductCard data={product} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Home;
