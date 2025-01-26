import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch(productsRequest());
    const { data } = await axios.get(
      `https://api.edamam.com/search?q=pizza&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=50`
    );
    dispatch(productsSuccess(data));
  } catch (error) {
    console.error(error);
    dispatch(productsFail());
  }
};
