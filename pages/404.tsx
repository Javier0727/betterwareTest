import { Box } from "@mui/system";
import Layout from "../components/layout";

const Custom404 = () => {
  return (
    <Layout>
      <Box height="60vh" display="flex" alignItems="center">
        La página que estás buscando no se pudo encontrar, prueba a ir a
        Productos
      </Box>
    </Layout>
  );
};

export default Custom404;
