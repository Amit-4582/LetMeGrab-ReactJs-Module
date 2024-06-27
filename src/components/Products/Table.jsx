// REACT IMPORTS
import React, { useEffect, useState } from "react";

// MUI COMPONENTS IMPORTS
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Card,
  Container,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

// THIRD PARTY IMPORTS
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CUSTOM IMPORTS
import ViewProduct from "./ViewProduct";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

export default function Table() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products");
      if (response.status === 200 && response.data) {
        setTimeout(() => {
          setData(response.data);
          setLoading(false);
        }, 500);
      } else {
        toast.error("Something went wrong!");
      }
      setLoading(true);
    } catch (error) {
      console.log("Error ::: ", error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const openModal = (type, productId) => {
    setModalType(type);
    setSelectedProductId(productId);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProductId(null);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 300,
      sortable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 800,
      sortable: false,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      sortable: true,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="View">
              <IconButton
                color="primary"
                onClick={() => openModal("view", params.row.id)}
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit">
              <IconButton onClick={() => openModal("edit", params.row.id)}>
                <Edit />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() => openModal("delete", params.row.id)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        );
      },
      width: 250,
      sortable: false,
    },
  ];

  return (
    <Container maxWidth="xxl" sx={{ border: "none" }}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Card
            elevation={3}
            style={{
              background: "linear-gradient(to right, #6d6d6d, #bfbfbf)",
            }}
          >
            <Box p={2}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5">Product List</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <TextField
                  color="primary"
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  placeholder="Search By Title"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div
                style={{
                  height: "60vh",
                  width: "100%",
                  marginTop: 30,
                }}
              >
                <DataGrid
                  rows={filteredData}
                  columns={columns}
                  pagination
                  initialState={{
                    ...data.initialState,
                    pagination: { paginationModel: { pageSize: 10 } },
                  }}
                  pageSizeOptions={[10, 20, 30]}
                />
              </div>
            </Box>
          </Card>
        </>
      )}

      {modalType === "view" && (
        <ViewProduct
          open={true}
          onClose={closeModal}
          productId={selectedProductId}
        />
      )}
      {modalType === "edit" && (
        <EditProduct
          open={true}
          onClose={closeModal}
          productId={selectedProductId}
        />
      )}
      {modalType === "delete" && (
        <DeleteProduct
          open={true}
          onClose={closeModal}
          productId={selectedProductId}
        />
      )}
    </Container>
  );
}
