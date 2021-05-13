import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Button from "./Button";
import Submit from "./Submit";
import Product from "../model/Product";
import productDAO from "../services/ProductDAO";

export default function CreateDialog() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please, enter a name"),
    price: yup
      .number()
      .required("Please, enter a price")
      .typeError("Please, enter a valid price")
      .positive("Please, enter a valid price"),
    stock: yup
      .number()
      .required("Please, enter a stock")
      .typeError("Please, enter a valid stock")
      .positive("Please, enter a valid stock")
      .integer("Please, enter a valid stock"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (product: Product) => {
    productDAO
    .createProduct(product)
    .then(() => {
      reset();
    }).catch((error: string) => {
      alert(error);
    });    
  };

  const useStyles = makeStyles({
    error: {
      color: "red",
    },
  });
  const classes = useStyles();

  return (
    <div>
      <Button
        color="purple"
        icon={<AddIcon />}
        handleClick={() => {
          handleOpen();
        }}
      >
        New
      </Button>

      <Dialog disableBackdropClick open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Data</DialogTitle>
          <DialogContent>
            <TextField
              {...register("name")}
              label="Name"
              type="text"
              fullWidth
            />
            {errors.name && (
              <Typography variant="body2" className={classes.error}>
                {errors.name.message}
              </Typography>
            )}

            <TextField
              {...register("price")}
              label="Price"
              type="text"
              fullWidth
            />
            {errors.price && (
              <Typography variant="body2" className={classes.error}>
                {errors.price.message}
              </Typography>
            )}

            <TextField
              {...register("stock")}
              label="Stock"
              type="text"
              fullWidth
            />
            {errors.stock && (
              <Typography variant="body2" className={classes.error}>
                {errors.stock.message}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              color="red"
              icon={<CloseIcon />}
              handleClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Submit color="green" icon={<CheckIcon />} disabled={isSubmitting}>
              Register
            </Submit>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
