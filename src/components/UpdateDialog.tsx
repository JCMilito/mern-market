import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

import Button from './Button';
import Submit from "./Submit";
import Product from '../model/Product';
import productDAO from "../services/ProductDAO";

type Props = {
  product: Product;
};

export default function UpdateDialog({ product }: Props) {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    reset();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().min(1, 'Please, enter a name'),
    price: yup
      .number()
      .typeError("Please, enter a valid price")
      .positive("Please, enter a valid price"),
    stock: yup
      .number()
      .typeError("Please, enter a valid stock")
      .positive("Please, enter a valid stock")
      .integer("Please, enter a valid stock")
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: Product) => {
    productDAO
    .updateProduct(new Product(data.name, data.price, data.stock, product._id))
    .then(() => {
      setOpen(false);
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
        color="blue"
        icon={<CreateIcon />}
        handleClick={() => {
          handleOpen();
        }}
      >
        Update
      </Button>

      <Dialog disableBackdropClick open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Data</DialogTitle>
          <DialogContent>
            <TextField
              {...register("name")}
              id="name"
              defaultValue={product.name}
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
              defaultValue={product.price}
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
              defaultValue={product.stock}
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

