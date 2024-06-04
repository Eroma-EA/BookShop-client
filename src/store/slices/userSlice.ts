import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { api } from "../../api/api";

const user: IUser = {
  id: 0,
  email: "",
  password: "",
  banned: false,
  banReason: "",
};

interface IUserState {
  user: IUser;
  loading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user,
  loading: false,
  error: null,
};

type LOGIN = {
  email: string;
  password: string;
};

//LOGIN
export const login = createAsyncThunk<IUser, LOGIN, { rejectValue: string }>(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    const response = await api.post("/auth/login", { email, password });

    if (!response) {
      return rejectWithValue("Server Error!");
    }

    localStorage.setItem("token", response.data.token);
    const data = response.data.user;
    // console.log(data);

    return data;
  }
);

export const registration = createAsyncThunk<IUser, LOGIN, { rejectValue: string }>(
  "user/registration",
  async ({ email, password }, { rejectWithValue }) => {
    const response = await api.post("/auth/registration", { email, password });

    if (!response) {
      return rejectWithValue("Server Error!");
    }
    localStorage.setItem("token", response.data.accessToken);
    const data = response.data.user;
    return data;
  }
);

export const tokenIsValid = createAsyncThunk<IUser, undefined, { rejectValue: string }>(
  "user/tokenIsValid",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/tokenIsValid", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      return rejectWithValue("Server Error!");
    }

    const data = response.data;
    return data;
  }
);

export const logout = createAsyncThunk<IUser, undefined, { rejectValue: string }>(
  "user/logout",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const response = await api.post("/auth/logout", { token });

    if (!response) {
      return rejectWithValue("Server Error!");
    }

    localStorage.removeItem("token");
    const data = response.data;

    return data;
  }
);

//USERSLICE Redusers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    //Registration
    builder.addCase(registration.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    //TokenIsValid
    builder.addCase(tokenIsValid.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(tokenIsValid.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = { id: 0, email: "", password: "", banned: false, banReason: "" };
      state.loading = false;
    });

    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
