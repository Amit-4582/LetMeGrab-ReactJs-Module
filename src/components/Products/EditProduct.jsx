// REACT IMPORTS
import React, { useEffect, useState } from "react";

// MUI COMPONENTS IMPORTS
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";

// THIRD PARTY IMPORTS
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = ({ open, onClose, productId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        if (response.status === 200 && response.data) {
          console.log("FETCH PRODUCT DATA RESPONSE ::: ", response);
          setTimeout(() => {
            const product = response.data;
            if (product) {
              setTitle(product.title);
              setDescription(product.description);
              setImage(product.image);
              setPrice(product.price);
              setCategory(product.category);
            }
            setLoading(false);
          }, 500);
        } else {
          toast.error("Something went wrong!");
        }
        setLoading(true);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        if (response.status === 200 && response.data) {
          console.log("CATEGORY DATA RESPONSE ::: ", response);
          setCategoryData(response.data);
        } else {
          toast.error("Something went wrong!");
        }
      } catch (error) {
        console.log("Error while getting category data ", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [productId]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${productId}`,
        {
          title,
          price,
          description,
          category,
          image,
        }
      );
      if (response.status === 200 && response.data) {
        console.log("HANDLE UPDATE RESPONSE ::: ", response);
        const alertMessage = `Title: ${title}\nDescription: ${description}\nPrice: ${price}\nImage: ${image}\nCategory: ${category}`;
        alert(alertMessage);
        toast.success(` Product ${productId} updated successfully`);
        onClose();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log("Error while updating category data ", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DialogContent>
            <TextField
              name="title"
              label="Title"
              fullWidth
              margin="normal"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              name="image"
              label="Image Url"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <TextField
              name="price"
              label="Price"
              fullWidth
              margin="normal"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Select Category"
              >
                {categoryData.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ marginTop: "20px" }}>
            <Button color="primary" variant="contained" onClick={handleUpdate}>
              Update
            </Button>
            <Button color="warning" variant="contained" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default EditProduct;
