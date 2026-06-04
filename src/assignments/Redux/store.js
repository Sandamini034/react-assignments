import { createSlice, configureStore } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "commonSlice",
  initialState: {
    name: "",
    email: "",
    age: 20,
  },
  reducers: {
    setForm(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetForm(state) {
      state.name = "";
      state.email = "";
      state.age = 20;
    },
  },
});

export const { setForm, resetForm } = slice.actions;

const store = configureStore({
  reducer: {
    common: slice.reducer,
  },
});

export { store };
