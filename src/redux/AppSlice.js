const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  products: [], //products array
  searchedArray: [], //search products array
  error: "",
  loading: "block",
  checkoutDetails:{}
};
// method to fetch products through API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    const element = await response.json();
    return element;
  }
);
// slice
export const AppSlice = createSlice({
  name: "eCommerceApp",
  initialState,
  reducers: {
    // to search products
    handleSearch: (state, action) => {
      state.searchedArray.push(action.payload);
    },
    // clear search
    deleteSearch: (state, action) => {
      state.searchedArray = [];
    },
    handleCheckoutDetails:(state,action)=>{
      state.checkoutDetails={...action.payload}
    }
  },
  extraReducers: (builder) => {
    /*--------Fetch Products-------*/
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = "block";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = "none";
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = "none";
      state.products = [];
      state.error = action.error.message;
    });
  },
});
export const {handleSearch, deleteSearch,handleCheckoutDetails } =
  AppSlice.actions;
export default AppSlice.reducer;
