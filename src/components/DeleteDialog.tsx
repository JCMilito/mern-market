import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { DialogContentText } from '@material-ui/core';

import Button from './Button';
import Product from '../model/Product';
import productDAO from "../services/ProductDAO";

type Props = {
  product: Product;
};

export default function DeleteDialog({ product }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirm = () => {
    productDAO
    .deleteProduct(product._id!)
    .then(() => {
      setOpen(false);
    }).catch((error: string) => {
      alert(error);
    });
  }

  return (
    <div>
      <Button
        color='red'
        icon={<CreateIcon />}
        handleClick={() => {
          handleOpen();
        }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will not be able to undo this action after confirming
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color='red'
            icon={<CloseIcon />}
            handleClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            color='green'
            icon={<CheckIcon />}
            handleClick={() => {
              confirm();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
