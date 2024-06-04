import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";

interface ICategoryState {
  categories: [];
  loading: boolean;
  error: string | null;
}

const initialState: ICategoryState = {
  categories: [],
  loading: true,
  error: null,
};

//GET_CATEGORIES
export const getCategories = createAsyncThunk<[], undefined, { rejectValue: string }>(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    const response = await api.get("/products/categories");
    response.data.splice(0, 0, "All");
    if (!response || !response.data.length || response.status !== 200) {
      return rejectWithValue("Server Error!");
    }

    const data = response.data;
    return data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GetCategories
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default categorySlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
