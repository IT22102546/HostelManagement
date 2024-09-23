import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Header from './Components/Header';
import DashBoard from './Pages/DashBoard';
import PrivateRoute from './Components/PrivateRoute';
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute';
import Footer from './Components/Footer';
import AddProducts from './Pages/AddProducts';
import ProductPage from './Pages/ProductPage';
import PostProduct from './Pages/PostProduct';
import Cart from './Pages/Cart';
import UpdateProducts from './Pages/UpdateProducts';
import Ordersummary from './Pages/OrderSummary';
import OrderSuccess from './Pages/OrderSuccess';
import UpdateOrder from './Pages/UpdateOrder';



export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/product-page" element={<ProductPage/>}/>
        <Route path="/product/:productSlug" element={<PostProduct/>} />


        <Route element={<PrivateRoute/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/update-product/:productId" element={<UpdateProducts/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order-summary" element={<Ordersummary/>}/>
          <Route path="/order-pay-success" element={<OrderSuccess/>}/> 
          <Route path="/update-order/:id" element = {<UpdateOrder/>}/> 
        <Route/>

        <Route element={<OnlyAdminPrivateRoute/>}>

           <Route path="/addproduct" element={<AddProducts/>}/>
        </Route>

      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
