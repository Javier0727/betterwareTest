import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  ButtonGroup,
  Button,
  Divider,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  addProductToCart,
  removeProductToCart,
} from "../../store/actions/main";
import { shoppingCartProductI } from "../../store/reducers/main.types";
import { formatCurrency } from "../../helpers/formatCurrency";

const ProductCardCart: FC<{ data: shoppingCartProductI }> = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const handleAdd = () => {
    dispatch(addProductToCart(data.code));
  };

  const handleClick = () => {
    router.push(`/detail?id=${data.code}`);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box pb="2rem">
      <Box mb="1rem" pl={matches ? "6rem" : "0rem"}>
        <Grid container spacing={5}>
          <Grid item md={5} xs={12}>
            <Image
              alt={data.title}
              src={data.image[0]}
              layout="responsive"
              height="100%"
              width="100%"
              objectFit="cover"
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <Box color="#9b9da2">Código {data.code}</Box>
            <Box my="0.7rem">{data.title}</Box>
            <Box mb="0.7rem">{formatCurrency(data.price)}</Box>
            <Box width="20%">
              <Divider />
            </Box>
            <Box my="0.7rem" display="flex" alignItems="center">
              <Box>
                1x{" "}
                {data.inOffer ? (
                  <span style={{ color: "red" }}>
                    {formatCurrency(data.price - data.price * data.discount)}
                  </span>
                ) : (
                  formatCurrency(data.price)
                )}
              </Box>
              <Box ml={4} color="#9b9da2">
                {data.inOffer ? "Hiper Oferta" : "Regular"}
              </Box>
            </Box>
            <Box mb="2rem" display="flex" alignItems="center">
              <Box>Total</Box>
              <Box ml={9}>{formatCurrency(data.price * data.quantity)}</Box>
            </Box>
            <Box>
              <Box sx={{ boxShadow: 2 }} width="100%" borderRadius="3px">
                <ButtonGroup fullWidth>
                  <Button
                    variant="text"
                    onClick={() => dispatch(removeProductToCart(data.code))}
                  >
                    <Box color="#f96f00" fontSize="1.5rem">
                      -
                    </Box>
                  </Button>
                  <Button disabled variant="text">
                    <Box color="black" fontSize="1.5rem">
                      {data.quantity}
                    </Box>
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => dispatch(addProductToCart(data.code))}
                  >
                    <Box color="#f96f00" fontSize="1.5rem">
                      +
                    </Box>
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </Box>
  );
};

export default ProductCardCart;
