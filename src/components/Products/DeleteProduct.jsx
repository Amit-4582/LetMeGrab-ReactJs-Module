// REACT IMPORTS
import React from "react";

// MUI COMPONENTS IMPORTS
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

// THIRD PARTY IMPORTS
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteProduct = ({ open, onClose, productId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${productId}`
      );
      if (response.status === 200 && response.data) {
        toast.success(`Product ${productId} deleted successfully`);
        onClose();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the product with ID {productId}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button onClick={handleDelete} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProduct;
