import Image from "next/image";
import { Box } from "@mui/system";
import { Badge, Button, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AppState } from "../../store/reducers/main.types";
import { useEffect } from "react";

const Header = () => {
  const router = useRouter();
  const shoppingCart = useSelector(
    (state: AppState) => state.main.shoppingCart
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingX="2rem"
      paddingY="1.5rem"
      borderBottom="4px solid #00AEC7"
    >
      <Box onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
        <Image
          alt="Betterware"
          src="https://img.betterware.com.mx/oKY1ddZiIh_g95G-EuHrrUYL02s=/1000x0/https%3A%2F%2Fstorage.googleapis.com%2Fbetterware-media%2Fcontent%2Fimages%2Ftheme%2Flogo-betterware.png"
          width={170}
          height={40}
        />
      </Box>
      <Box>
        <Button
          style={{ textTransform: "capitalize" }}
          variant="text"
          onClick={() => router.push("/")}
        >
          <Box fontSize="1.2rem" color="#53565a">
            Productos
          </Box>
        </Button>
      </Box>
      <Box>
        <IconButton onClick={() => router.push("/cart")}>
          <Badge
            badgeContent={shoppingCart
              .map((product) => product.quantity)
              .reduce((prev, curr) => prev + curr, 0)}
            color="warning"
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
