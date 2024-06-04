import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { ILiked } from "../../interfaces/ILiked";

interface ILikeState {
  likes: ILiked[];
  loading: boolean;
  error: string | null;
}

const initialState: ILikeState = {
  likes: [],
  loading: true,
  error: null,
};

type LIKE = {
  productId: number;
  userId: number;
};

//ADD_LIKE
export const addLike = createAsyncThunk<ILiked[], LIKE, { rejectValue: string }>(
  "like/addLike",
  async ({ productId, userId }, { rejectWithValue }) => {
    const response = await api.post("/liked", { productId, userId });
    console.log(response.data);

    if (response.status !== 201) {
      return rejectWithValue("Server Error!");
    }

    const data = response.data;
    return data;
  }
);

//GET_LIKES
export const getLikes = createAsyncThunk<ILiked[], number, { rejectValue: string }>(
  "like/getLikes",
  async (userId, { rejectWithValue }) => {
    const response = await api.get(`/liked/${userId}`);

    console.log(response.data);
    if (response.status !== 200) {
      return rejectWithValue("Server Error!");
    }

    const data = response.data;
    return data;
  }
);

//DELETE_LIKE
export const deleteLike = createAsyncThunk<number, LIKE, { rejectValue: string }>(
  "like/deleteLike",
  async ({ productId, userId }) => {
    await api.delete(`/liked/${productId}=${userId}`);

    return productId;
  }
);

//LIKESLICE Redusers
const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //AddLike
    builder.addCase(addLike.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addLike.fulfilled, (state, action) => {
      state.likes = action.payload;
      state.loading = false;
    });
    //GetLikes
    builder.addCase(getLikes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getLikes.fulfilled, (state, action) => {
      state.likes = action.payload;
      state.loading = false;
    });
    //DeleteLike
    builder.addCase(deleteLike.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteLike.fulfilled, (state, action) => {
      state.likes = state.likes.filter((like) => like.productId !== +action.payload);
      state.loading = false;
    });

    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default likedSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
