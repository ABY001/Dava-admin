import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await api.get("/users");
    return response.data;
});

// Create User
export const createUser = createAsyncThunk(
    "users/create",
    async (userData: { name: string; email: string; role: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/users", userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Update User
export const updateUser = createAsyncThunk(
    "users/update",
    async ({ id, name, email }: { id: string; name: string; email: string }) => {
        const response = await api.put(`/users/${id}`, { name, email });
        return response.data;
    }
);

// Delete User
export const deleteUser = createAsyncThunk("users/delete", async (id: string) => {
    await api.delete(`/users/${id}`);
    return id;
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.users = state.users.map((u) => (u._id === action.payload.id ? action.payload : u));
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((u) => u._id !== action.payload);
            });
    },
});

export default userSlice.reducer;
