import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Header from './Components/Header';
import DashBoard from './Pages/DashBoard';
import PrivateRoute from './Components/PrivateRoute';
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute';
import Addstaff from './Pages/Addstaff';
import Updatestaff from './Pages/updateStaff';


export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/addstaff" element={<Addstaff/>}/>
        <Route path="/updatestaff/:id" element={<Updatestaff/>}/>


        <Route element={<PrivateRoute/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/>
        <Route/>

        <Route element={<OnlyAdminPrivateRoute/>}>
          
        </Route>

      </Routes>

     


    </BrowserRouter>
  )
}
