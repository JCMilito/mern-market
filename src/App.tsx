import { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import CreateDialog from "./components/CreateDialog";
import UpdateDialog from "./components/UpdateDialog";
import DeleteDialog from "./components/DeleteDialog";
import Product from "./model/Product";
import productDAO from "./services/ProductDAO";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 28,
  },
  body: {
    fontSize: 24,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    marginTop: 10,
  },
  button: {
    width: "120px",
    borderRadius: "8px",
  },
}));

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  productDAO
    .findProducts()
    .then((result) => setProducts(result))
    .catch((error) => {
      alert(error);
    });

  return (
    <TableContainer component={Paper}>
      <CreateDialog />
      <Table className={useStyles().table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Stock</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product: Product) => (
            <StyledTableRow key={product.name}>
              <StyledTableCell component="th" scope="row">
                {product.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                ${product.price.toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="right">{product.stock}</StyledTableCell>
              <StyledTableCell width="30" align="right">
                <UpdateDialog product={product} />
              </StyledTableCell>
              <StyledTableCell width="30" align="right">
                <DeleteDialog product={product} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
