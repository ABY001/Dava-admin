import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: string,
  imageUrl: string,
  amazonLink: string,
  ocadoLink: string,
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Fetch Products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await api.get("products");
  return response.data;
});

// Create Product
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData: Product, { rejectWithValue }) => {
    try {
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }: { id: string; data: Partial<Product> }) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk("products/delete", async (id: string) => {
  await api.delete(`/products/${id}`);
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((p) => (p.id === action.payload.id ? action.payload : p));
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
