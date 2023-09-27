import { createContext } from "react";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { Cart } from "./component/cart/Cart";
import { CheckOutBill } from "./component/checkout/CheckOutBill";
import { ProductPage } from "./component/dashboards/ProductPage";
import { SignIn } from "./component/forms/SignIn";
import { SignUp } from "./component/forms/SignUp";
import { store } from "./redux/store";
import CheckoutForm from "./component/checkout/CheckoutForm";
export const UserContext = createContext();
function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/CheckoutForm" element={<CheckoutForm/>}/>
        <Route path="/Bill" element={<CheckOutBill/>}/>
      </>
    )
  );
  return (
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  );
}

export default App;
