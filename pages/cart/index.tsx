import { Box } from "@mui/system";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Footer from "../../components/footer";
import Header from "../../components/header";

const Cart: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  return (
    <Box>
      <Head>
        <title>Prueba técnica Betterware Carrito de compras</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Box p="5rem">
        {/* <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          {products.map((product) => (
            <Grid key={product.code} item xs={3}>
              <ProductCard data={product} />
            </Grid>
          ))}
        </Grid> */}
      </Box>
      <Footer />
    </Box>
  );
};

export default Cart;
