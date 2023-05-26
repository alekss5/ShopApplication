import Product from "./pages/Product";
import Home from "./pages/Home";
import HomeLogedIn from "./pages/HomeLogedIn";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import CreateProduct from "./pages/CreateProguct"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import {createBrowserRouter,RouterProvider}from 'react-router-dom'
const router = createBrowserRouter([
    {
      path: '/',
      element:<Home/>
    },
  {
        path: '/logedin',
        element:<HomeLogedIn/>
      },
  {
        path: '/cart',
        element:<Cart/>
      },
    {
          path: '/login',
          element:<Login/>
        }
      ,
      {
            path: '/register',
            element:<Register/>
          }

        ,
      {
            path: '/product',
            element:<Product/>
          }
        ,
      {
            path: '/productList',
            element:<ProductList/>
          }
        ,
      {
            path: '/createProduct',
            element:<CreateProduct/>
          }
  ])
  
  
  
  
  
  
  
  function App() {
  
  
  
  
    return (
  
  
  
  
      <div className="App">
  
  
  
  
       <RouterProvider router={router}/>
  
  
  
  
      </div>
  
  
  
  
    );
  
  
  
  
  }
  
  
  
  
   
  
  
  
  
  export default App;