import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { IReview } from "../../interfaces/IReview";

interface IReviewState {
  reviews: IReview[];
  loading: boolean;
  error: string | null;
}

const initialState: IReviewState = {
  reviews: [],
  loading: true,
  error: null,
};

type REVIEW = {
  content: string;
  userId: number;
  productId: number;
};

//ADD_REVIEW
export const addReview = createAsyncThunk<IReview, REVIEW, { rejectValue: string }>(
  "review/addReview",
  async ({ content, productId, userId }, { rejectWithValue }) => {
    const response = await api.post("/reviews", { content, productId, userId });

    if (response.status !== 201) {
      return rejectWithValue("Server Error!");
    }

    const data = response.data;
    return data;
  }
);

//GET_REVIEWS
export const getReviews = createAsyncThunk<IReview[], number, { rejectValue: string }>(
  "review/getReviews",
  async (bookId, { rejectWithValue }) => {
    const response = await api.get(`/reviews/${bookId}`);
    console.log(response);

    if (response.status !== 200) {
      return rejectWithValue("Server Error!");
    }

    console.log(response.data);

    const data = response.data;
    return data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //AddReview
    builder.addCase(addReview.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload);
      state.loading = true;
    });
    //GetReviews
    builder.addCase(getReviews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
    });

    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default reviewSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
