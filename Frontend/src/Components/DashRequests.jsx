import React from "react";
import { Link } from "react-router-dom";

export default function DashRequests() {
  return (
    <>
      <div className="w-full ">
        <div className="flex flex-wrap gap-10 justify-evenly">
          {/* Gross Revenue Card */}
          <div className="p-12 bg-white rounded-lg shadow-md">
            <div className="text-gray-500">Gross Revenue</div>
            <div className="text-3xl font-bold">$2,480.32</div>
            <div className="flex items-center text-green-500 mt-2">
              <span className="mr-1">&#x2191; 2.15%</span>
            </div>
            <div className="text-sm text-gray-400">
              From Jan 01, 2024 - March 30, 2024
            </div>
          </div>

          <div className="p-12 bg-white rounded-lg shadow-md">
            <div className="text-gray-500">Gross Revenue</div>
            <div className="text-3xl font-bold">$2,480.32</div>
            <div className="flex items-center text-green-500 mt-2">
              <span className="mr-1">&#x2191; 2.15%</span>
            </div>
            <div className="text-sm text-gray-400">
              From Jan 01, 2024 - March 30, 2024
            </div>
          </div>

          <div className="p-12 bg-white rounded-lg shadow-md">
            <div className="text-gray-500">Gross Revenue</div>
            <div className="text-3xl font-bold">$2,480.32</div>
            <div className="flex items-center text-green-500 mt-2">
              <span className="mr-1">&#x2191; 2.15%</span>
            </div>
            <div className="text-sm text-gray-400">
              From Jan 01, 2024 - March 30, 2024
            </div>
          </div>
        </div>

        <div className="ml-16 mt-5 ">
          <Link to="cleaning_request">
            <button className="bg-blue-600 text-white hover:bg-blue-700 p-3 rounded-lg">
              Put a cleaning Request
            </button>
          </Link>
          
            <button className="bg-blue-600 text-white hover:bg-blue-700 p-3 rounded-lg ml-10">
              Generate Report
            </button>

        </div>
        
      </div>
    </>
  );
}
