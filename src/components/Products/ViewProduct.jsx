// REACT IMPORTS
import React, { useEffect, useState } from "react";

// MUI COMPONENTS IMPORTS
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  CircularProgress,
  Box,
} from "@mui/material";

// THIRD PARTY IMPORTS
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewProduct = ({ open, onClose, productId }) => {
  const [product, setProduct] = useState(null);
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
            setProduct(response.data);
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

    if (open && productId) {
      fetchProduct();
    } else {
      setProduct(false);
    }
  }, [open, productId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Product Details</DialogTitle>
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
            {product && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card elevation={0}>
                    <CardMedia
                      component="img"
                      height="auto"
                      image={product.image}
                      alt={product.title}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={0}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {product.title}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Price: ${product.price}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {product.description}
                      </Typography>
                      <Divider />
                      <Typography variant="body2" gutterBottom>
                        Category: {product.category}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Rating: {product.rating.rate} (Count:{" "}
                        {product.rating.count})
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ViewProduct;
