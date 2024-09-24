import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../Components/DashSideBar";
import DashProfile from "../Components/DashProfile";
import DashUsers from "../Components/DashUsers";
import Dashstaff from "../Components/Dashstaff";
import DashRequests from "../Components/DashRequests";
import DashMyRequests from "../Components/DashMyRequests";
import DashProduct from "../Components/DashProduct";
import DashRoom from "../Components/DashRoom";
import DashMyOrders from "../Components/DashMyOrders";
import DashRecievedOrders from "../Components/DashRecievedOrders";
import DashBookingRequests from "../Components/DashBookingRequests";



export default function DashBoard() {
  const location = useLocation();
  const[tab,setTab]= useState();

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search]);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSideBar/>
      </div>
      {tab==='profile' && <DashProfile/>}
      {tab === 'users' && <DashUsers/>}
      {tab === 'staff' && <Dashstaff/>}
      {tab === 'requests' && <DashRequests/>}
      {tab === 'my_requests' && <DashMyRequests/>}
      {tab === 'products' && <DashProduct/>}
      {tab === 'rooms' && <DashRoom/>}
      {tab === 'my_orders' && <DashMyOrders/>}
      {tab === 'recived_orders' && <DashRecievedOrders/>}
      {tab === 'bookings' && <DashBookingRequests/>}
      

     

      {/*
      {tab == 'orders' && <DashOrders/>}
      {tab === 'myorders' && <DashMyOrders/>}

       */}

   
     
    </div>
  )
}
