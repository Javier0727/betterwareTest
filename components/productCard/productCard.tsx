import { Paper, Box, ButtonGroup, Button, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { FC, forwardRef, useState } from "react";
import { productI } from "../../store/reducers/main.types";
import Image from "next/image";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../store/actions/main";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductCard: FC<{ data: productI }> = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [counter, setcounter] = useState(1);
  const [open, setopen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setopen(false);
  };

  const handleAdd = () => {
    dispatch(addProductToCart(data.code, counter));
    setcounter(1);
    setopen(true);
  };

  const handleClick = () => {
    router.push(`/detail?id=${data.code}`);
  };

  return (
    <Paper elevation={2} square style={{ cursor: "pointer" }}>
      <Box padding="0.5rem" height="100%">
        <Box
          fontWeight={700}
          color="#53565a"
          style={{ textTransform: "uppercase" }}
          onClick={handleClick}
        >
          {data.title}
        </Box>
        <Box
          width="100%"
          position="relative"
          marginBottom="0.5rem"
          onClick={handleClick}
        >
          <Image
            alt={data.title}
            src={data.image[0]}
            layout="responsive"
            height="100%"
            width="100%"
            objectFit="cover"
          />
          {data.inOffer && (
            <Box
              position="absolute"
              top={0}
              right={0}
              paddingX="1rem"
              paddingY="0.5rem"
              bgcolor="#f96f00"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="0 0 0 1rem"
            >
              <NewReleasesIcon style={{ color: "white" }} />
            </Box>
          )}
        </Box>
        <Box fontSize="0.8rem" onClick={handleClick}>
          Código {data.code}
        </Box>
        <Box fontSize="0.8rem" marginY="0.3rem" onClick={handleClick}>
          {data.inOffer ? (
            <span>
              {formatCurrency(data.price)} o llévalo por{" "}
              <span style={{ color: "#f96f00", fontWeight: 1000 }}>
                {formatCurrency(data.price - data.price * data.discount)}
              </span>
            </span>
          ) : (
            formatCurrency(data.price)
          )}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box sx={{ boxShadow: 2 }} width="40%" borderRadius="3px">
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
                disabled={counter === data.stock}
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
                padding="7px"
                borderRadius="0 1rem 1rem 0"
                style={{ textTransform: "capitalize" }}
              >
                Agregar al carrito
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Se agregó correctamente
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ProductCard;
