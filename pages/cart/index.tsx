import { NextPage } from "next";
import { useSelector } from "react-redux";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { AppState } from "../../store/reducers/main.types";
import Layout from "../../components/layout";
import ProductCardCart from "../../components/productCardCart";
import { formatCurrency } from "../../helpers/formatCurrency";

const Cart: NextPage = () => {
  const [open, setopen] = useState(false);
  const shoppingCart = useSelector(
    (state: AppState) => state.main.shoppingCart
  );

  const totalAmount = () => {
    return formatCurrency(
      shoppingCart
        .map((product) => {
          let value = 0;
          if (product.inOffer) {
            value =
              (product.price - product.price * product.discount) *
              product.quantity;
          } else {
            value = product.price * product.quantity;
          }
          return value;
        })
        .reduce((prev, curr) => prev + curr, 0)
    );
  };

  return (
    <Layout title="Prueba Técnica Betterware Carrito">
      <Box fontSize="1.5rem" textAlign="center">
        Tu carrito (
        {shoppingCart
          .map((product) => product.quantity)
          .reduce((prev, curr) => prev + curr, 0)}
        )
      </Box>
      <Box height="0.1rem" bgcolor="black" mt="4rem" mb="2rem"></Box>
      <Grid sx={{ flexGrow: 1 }} container spacing={4}>
        <Grid item md={8} xs={12}>
          {shoppingCart.map((shoppingProduct) => (
            <ProductCardCart
              key={shoppingProduct.code}
              data={shoppingProduct}
            />
          ))}
        </Grid>
        <Grid item md={4} xs={12}>
          <Box fontSize="1.2rem">RESUMEN DEL PEDIDO</Box>
          <Box
            mt={3}
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            fontSize="0.9rem"
            color="#53565a"
          >
            <Box>Subtotal</Box>
            <Box>
              {formatCurrency(
                shoppingCart
                  .map((product) => product.price * product.quantity)
                  .reduce((prev, curr) => prev + curr, 0)
              )}
            </Box>
          </Box>
          <Box
            my={3}
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            fontSize="0.9rem"
            color="#53565a"
          >
            <Box width="40%">Descuentos por promociones</Box>
            <Box>
              -
              {formatCurrency(
                shoppingCart
                  .map((product) => product.price * product.discount)
                  .reduce((prev, curr) => prev + curr, 0)
              )}
            </Box>
          </Box>
          <Divider />
          <Box
            mt={3}
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            fontSize="1.2rem"
            fontWeight={900}
            color="#53565a"
          >
            <Box width="40%">Subtotal con descuentos</Box>
            <Box>{totalAmount()}</Box>
          </Box>
          <Box
            my={3}
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            fontSize="0.9rem"
            color="#53565a"
          >
            <Box width="40%">Gastos de Envío</Box>
            <Box>Gratis</Box>
          </Box>
          <Divider />
          <Box
            my={3}
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            fontSize="1.2rem"
            fontWeight={900}
            color="#53565a"
          >
            <Box width="40%">Total</Box>
            <Box>{totalAmount()}</Box>
          </Box>
          <Button
            fullWidth
            style={{ backgroundColor: "#f96f00", color: "white" }}
            onClick={() => setopen(true)}
          >
            Realizar pedido
          </Button>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setopen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
};

export default Cart;
