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
import AddRoom from './Pages/AddRoom';
import ProductPage from './Pages/ProductPage';
import PostProduct from './Pages/PostProduct';
import Cart from './Pages/Cart';
import UpdateProducts from './Pages/UpdateProducts';

import RoomPage from './Pages/RoomPage';
import UpdateRooms from './Pages/UpdateRooms';
import PostRoom from './Pages/PostRoom';

import Ordersummary from './Pages/OrderSummary';
import OrderSuccess from './Pages/OrderSuccess';
import UpdateOrder from './Pages/UpdateOrder';


import CleaningRequestForm from "./Pages/CleanRequestForm";
import RequestSuccessPage from "./Pages/RequestSuccessPage";
import UpdateRequestAdmin from "./Pages/UpdateRequestAdmin";
import UpdateCommentAdmin from "./Pages/UpdateCommentAdmin";
import UpdateCommentUser from "./Pages/UpdateCommentUser";import Addstaff from './Pages/Addstaff';
import Updatestaff from './Pages/updateStaff';
import AssignTask from './Pages/AssignTask';

import RoomIncomeMonthlySummary from "./Pages/RoomIncomeMonthlySummary";
import OrderIncomeMonthlySummary from './Pages/OrderIncomeMonthlySummary';



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/product-page" element={<ProductPage/>}/>

        <Route path="/room-page" element={<RoomPage/>}/>
        <Route path="/product/:productSlug" element={<PostProduct/>} />
        <Route path="/room/:roomSlug" element={<PostRoom/>} />


        <Route path="/product/:productSlug" element={<PostProduct/>} />        
        <Route path="/addstaff" element={<Addstaff/>}/>
        <Route path="/updatestaff/:id" element={<Updatestaff/>}/>
        <Route path="/taskassign/:id" element={<AssignTask/>}/>



        <Route element={<PrivateRoute />} />
        <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/update-product/:productId" element={<UpdateProducts/>}/>
          <Route path="/update-room/:roomId" element={<UpdateRooms/>}/>
          <Route path="/cart" element={<Cart/>}/> 
        <Route/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order-summary" element={<Ordersummary/>}/>
          <Route path="/order-pay-success" element={<OrderSuccess/>}/> 
          <Route path="/update-order/:id" element = {<UpdateOrder/>}/> 
        <Route />

        <Route element={<OnlyAdminPrivateRoute />}></Route>

        <Route path="/update-req/:id" element={<UpdateRequestAdmin/>}/>
        <Route path="/update-comment/:id" element={<UpdateCommentAdmin/>}/>
        <Route path="/dashboard/cleaning_request" element={<CleaningRequestForm />} />
        <Route path="/request-success" element={<RequestSuccessPage />} />
        <Route path="/update-comment-user/:id" element={<UpdateCommentUser/>}/>
        <Route element={<OnlyAdminPrivateRoute/>}>
           <Route path="/addproduct" element={<AddProducts/>}/>
           <Route path="/addroom" element={<AddRoom/>}/>
        </Route>
        <Route path="/roomsummary" element={<RoomIncomeMonthlySummary/>}/>
        <Route path="/ordermonthlysummary" element={<OrderIncomeMonthlySummary/>}/>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
