import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../interfaces/ICard";
import { api } from "../../api/api";

const book: ICard = {
  id: 0,
  name: "",
  author: "",
  price: 0,
  description: "",
  genre: "",
  img: "",
  year: 0,
};

interface IBookState {
  book: ICard;
  books: ICard[];
  loading: boolean;
  error: string | null;
}

const initialState: IBookState = {
  book,
  books: [],
  loading: true,
  error: null,
};

type BOOK = {
  title: string;
  description: string;
  author: string;
  userId: number;
};

//ADD_BOOK
export const addBook = createAsyncThunk<ICard, BOOK, { rejectValue: string }>(
  "book/addBook",
  async ({ title, description, author, userId }, { rejectWithValue }) => {
    const response = await api.post("/products", { title, description, author, userId });

    if (!response) {
      return rejectWithValue("Server Error!");
    }

    const data = response.data;
    return data;
  }
);

//GET_BOOK
export const getBook = createAsyncThunk<ICard, number, { rejectValue: string }>(
  "book/getBook",
  async (id, { rejectWithValue }) => {
    const response = await api.get(`/products/${id}`);

    if (!response) {
      return rejectWithValue("Server Error!");
    }

    const data = response.data;
    return data;
  }
);

//GET_BOOKS
export const getBooks = createAsyncThunk<ICard[], undefined, { rejectValue: string }>(
  "book/getBooks",
  async (_, { rejectWithValue }) => {
    const response = await api.get("/products");

    if (!response || !response.data.length || response.status !== 200) {
      return rejectWithValue("Server Error!");
    }

    const data = response.data;

    return data;
  }
);

//GET_BOOKS_BY_CATEGORY
export const getBooksByCategory = createAsyncThunk<ICard[], string, { rejectValue: string }>(
  "book/getBooksByCategory",
  async (category, { rejectWithValue }) => {
    const response = await api.get(`/products/category/${category}`);

    if (!response || !response.data.length || response.status !== 200) {
      return rejectWithValue("Server Error!");
    }

    const data = response.data;

    return data;
  }
);

//SEARCH_BOOKS
export const searchBooks = createAsyncThunk<ICard[], string, { rejectValue: string }>(
  "book/searchBooks",
  async (search, { rejectWithValue }) => {
    const response = await api.get(`/products/search/${search}`);

    if (!response || !response.data.length || response.status !== 200) {
      return rejectWithValue("Server Error!");
    }

    const data = response.data;

    return data;
  }
);

//DELETE_BOOK
export const deleteBook = createAsyncThunk<ICard, number, { rejectValue: string }>(
  "book/deleteBook",
  async (id, { rejectWithValue }) => {
    const response = await api.delete(`/products/${id}`);

    if (!response) {
      return rejectWithValue("Server Error!");
    }

    const data = response.data;
    return data;
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //AddBook
    builder.addCase(addBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.books.push(action.payload);
      state.loading = false;
    });
    //GetBook
    builder.addCase(getBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.book = action.payload;
      state.loading = false;
    });
    //GetBooks
    builder.addCase(getBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });
    //GetBooksByCategory
    builder.addCase(getBooksByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBooksByCategory.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });
    //SearchBooks
    builder.addCase(searchBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });
    //DeleteBook
    builder.addCase(deleteBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload.id);
      state.loading = false;
    });

    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      // console.log(state.error);

      state.loading = false;
    });
  },
});

export default bookSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
