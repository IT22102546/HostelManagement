import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Header from "./Components/Header";
import DashBoard from "./Pages/DashBoard";
import PrivateRoute from "./Components/PrivateRoute";
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute";
import Footer from "./Components/Footer";
import CleaningRequestForm from "./Pages/CleanRequestForm";
import RequestSuccessPage from "./Pages/RequestSuccessPage";
import UpdateRequestAdmin from "./Pages/UpdateRequestAdmin";
import UpdateCommentAdmin from "./Pages/UpdateCommentAdmin";
import UpdateCommentUser from "./Pages/UpdateCommentUser";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<PrivateRoute />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route />

        <Route element={<OnlyAdminPrivateRoute />}></Route>

        <Route path="/update-req/:id" element={<UpdateRequestAdmin/>}/>
        <Route path="/update-comment/:id" element={<UpdateCommentAdmin/>}/>
        <Route path="/dashboard/cleaning_request" element={<CleaningRequestForm />} />
        <Route path="/request-success" element={<RequestSuccessPage />} />
        <Route path="/update-comment-user/:id" element={<UpdateCommentUser/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
