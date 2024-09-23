import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../Components/DashSideBar";
import DashProfile from "../Components/DashProfile";
import DashUsers from "../Components/DashUsers";
import DashCleanRequests from "../Components/DashRequests";
import DashRequests from "../Components/DashRequests";
import DashMyRequests from "../Components/DashMyRequests";







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
      {tab === 'requests' && <DashRequests/>}
      {tab === 'my_requests' && <DashMyRequests/>}
     

      {/*
      {tab === 'products' && <DashProduct/>}
      {tab == 'orders' && <DashOrders/>}
      {tab === 'myorders' && <DashMyOrders/>}

       */}

   
     
    </div>
  )
}
