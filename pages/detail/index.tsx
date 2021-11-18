import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  Divider,
  ButtonGroup,
  Button,
  Snackbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Image from "next/image";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { AppState } from "../../store/reducers/main.types";
import Layout from "../../components/layout";
import { formatCurrency } from "../../helpers/formatCurrency";
import { forwardRef, useState } from "react";
import { addProductToCart } from "../../store/actions/main";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DetailProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state: AppState) => state.main.products);
  const [counter, setcounter] = useState(1);
  const [open, setopen] = useState(false);
  const { id } = router.query;
  const product = products.find((prod) => prod.code === id);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setopen(false);
  };

  const handleAdd = () => {
    dispatch(addProductToCart(product!.code, counter));
    setcounter(1);
    setopen(true);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  if (product !== undefined) {
    return (
      <Layout title="Prueba técnica Betterware Detalle Producto">
        <Grid container sx={{ flexGrow: 1 }} spacing={matches ? 7 : 0}>
          <Grid item md={2} xs={0}>
            <Box
              width="100%"
              sx={{ boxShadow: 2 }}
              style={{ cursor: "pointer" }}
            >
              <Image
                layout="responsive"
                height="100%"
                width="100%"
                objectFit="cover"
                alt={product!.title}
                src={product!.image[0]}
              />
            </Box>
          </Grid>
          <Grid item md={5} xs={12}>
            <Box
              width="100%"
              height="100%"
              padding={matches ? 1 : 0}
              style={{ cursor: "pointer" }}
              sx={{ boxShadow: 2 }}
              position="relative"
            >
              <Image
                layout="responsive"
                height="100%"
                width="100%"
                objectFit="cover"
                alt={product!.title}
                src={product!.image[0]}
              />
            </Box>
          </Grid>
          <Grid item md={5} xs={12}>
            <Box
              style={{ textTransform: "uppercase" }}
              fontSize="1.5rem"
              mb={2}
              mt={matches ? 0 : 4}
            >
              {product.title}
            </Box>
            <Box mb={3} fontSize="0.8rem">
              {product.description}
            </Box>
            <Divider />
            <Box
              mt={3}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box fontSize="1.2rem" fontWeight={800}>
                {formatCurrency(product.price)}
              </Box>
              {product.inOffer && (
                <>
                  <Box
                    fontSize="0.8rem"
                    bgcolor="#f96f00"
                    color="white"
                    p={1}
                    borderRadius="5px"
                    display="flex"
                    alignItems="center"
                  >
                    <NewReleasesIcon style={{ color: "white" }} />
                    <Box ml={1}>Hiperoferta</Box>
                  </Box>
                  <Box fontSize="1.2rem" color="#f96f00" fontWeight={800}>
                    {formatCurrency(
                      product.price - product.price * product.discount
                    )}
                  </Box>
                </>
              )}
            </Box>
            <Box fontSize="0.8rem" mt={1}>
              Con envío <span style={{ fontWeight: 900 }}>GRATIS</span>
            </Box>
            <Box mt={3} mb={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
              >
                <Box sx={{ boxShadow: 2 }} width="30%" borderRadius="3px">
                  <ButtonGroup fullWidth>
                    <Button
                      disabled={counter === 1}
                      variant="text"
                      onClick={() => setcounter(counter - 1)}
                    >
                      <Box color="#f96f00">-</Box>
                    </Button>
                    <Button disabled variant="text">
                      <Box color="black">{counter}</Box>
                    </Button>
                    <Button
                      disabled={counter === product.stock}
                      variant="text"
                      onClick={() => setcounter(counter + 1)}
                    >
                      <Box color="#f96f00">+</Box>
                    </Button>
                  </ButtonGroup>
                </Box>
                <Box width="55%">
                  <Button variant="text" onClick={handleAdd}>
                    <Box
                      bgcolor="#f96f00"
                      color="white"
                      paddingX="2rem"
                      paddingY="0.5rem"
                      borderRadius="1rem"
                      style={{ textTransform: "capitalize" }}
                    >
                      Agregar al carrito
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box marginY={3} fontSize="0.8rem">
              {product.moreAbout}
            </Box>
            <Divider />
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Se agregó correctamente
          </Alert>
        </Snackbar>
      </Layout>
    );
  } else {
    return (
      <Layout title="Prueba técnica Betterware Detalle Producto">
        Producto no encontrado
      </Layout>
    );
  }
};

export default DetailProduct;
