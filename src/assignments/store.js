import { createSlice, configureStore } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "commonSlice",
  initialState: {
    name: "",
    email: "",
    age: 20,
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
      console.log("Email updated:", state.email);
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    resetForm(state) {
      state.name = "";
      state.email = "";
      state.age = 20;
    },
  },
});

export const { setName, setEmail, setAge, resetForm } = slice.actions;

const store = configureStore({
  reducer: {
    common: slice.reducer,
  },
});

export { store };
