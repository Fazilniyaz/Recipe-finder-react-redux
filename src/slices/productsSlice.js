import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    healthLabels: [],
    dietLabels: [],
    mealTypes: [],
  },
  reducers: {
    productsRequest(state, action) {
      return { ...state, loading: true };
    },
    productsSuccess(state, action) {
      const uniqueHealthLabels = new Set();
      const uniqueDietLabels = new Set();
      const uniqueMealTypes = new Set();

      action.payload.hits.forEach((item) => {
        if (item.recipe.healthLabels) {
          item.recipe.healthLabels.forEach((label) =>
            uniqueHealthLabels.add(label)
          );
        }
        if (item.recipe.dietLabels) {
          item.recipe.dietLabels.forEach((label) =>
            uniqueDietLabels.add(label)
          );
        }
        if (item.recipe.mealType) {
          item.recipe.mealType.forEach((type) => uniqueMealTypes.add(type));
        }
      });

      return {
        ...state,
        loading: false,
        products: action.payload.hits,
        healthLabels: Array.from(uniqueHealthLabels),
        dietLabels: Array.from(uniqueDietLabels),
        mealTypes: Array.from(uniqueMealTypes),
      };
    },
    productsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: "Something went wrong! Try again later.",
      };
    },
  },
});

const { actions, reducer } = productsSlice;

export const { productsRequest, productsSuccess, productsFail } = actions;

export default reducer;
