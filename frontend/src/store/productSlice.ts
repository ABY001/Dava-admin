import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    status: string;
    imageUrl: string;
    amazonLink: string;
    ocadoLink: string;
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
export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("products");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
        }
    }
);

// Create Product
export const createProduct = createAsyncThunk(
    "products/create",
    async (productData: {
        name: string;
        price: number;
        stock: number;
        status: string;
        imageUrl: string;
        amazonLink: string;
        ocadoLink: string
    }, { rejectWithValue }) => {
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
    async ({ id, name, price, stock, status, amazonLink, ocadoLink, imageUrl }: { id: string; name: string, status: string, price: number, stock: number, amazonLink: string, ocadoLink: string, imageUrl: string }) => {
        const response = await api.put(`/products/${id}`, { name, status, price, stock, amazonLink, ocadoLink, imageUrl });
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
                state.products = state.products.map((p) => (p._id === action.payload.id ? action.payload : p));
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((p) => p._id !== action.payload);
            });
    },
});

export default productSlice.reducer;
