import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import html2pdf from 'html2pdf.js';

export default function DashBookingRequests() {
  const { currentUser } = useSelector((state) => state.user);
  const [userBookingRequests, setUserBookingRequests] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [bookingdToDelete, setBookingIdToDelete] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`/api/bookings/getbookings?searchTerm=${searchTerm}`);
        const data = await res.json();
        if (res.ok) {
          setUserBookingRequests(data.bookings); // Assuming 'bookings' is the correct array name
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBookings();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteBooking = async () => {
    setShowModel(false);
    try {
      const res = await fetch(
        `/api/bookings/deletebooking/${bookingdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserBookingRequests((prev) =>
          prev.filter((booking) => booking._id !== bookingdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const generatePDFReport = () => {
    const content = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
          font-size: 14px; /* Adjust font size */
        }
        td {
          font-size: 12px; /* Adjust font size */
        }
      </style>
      <h1><b>Room Details Report</b></h1>
      <table>
        <thead>
          <tr>
            <th>Updated At</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Room No</th>
            <th>Room Type</th>
            <th>Gender</th>
            <th>Price</th>
            <th>Furnished Status</th>
          </tr>
        </thead>
        <tbody>
          ${userBookingRequests.map((booking) => `
            <tr>
              <td>${new Date(booking.updatedAt).toLocaleDateString()}</td>
              <td>${booking.username}</td>
              <td>${booking.email}</td>
              <td>${booking.roomno}</td> 
              <td>${booking.roomtype}</td>
              <td>${booking.gender}</td>
              <td>${booking.price}</td>
              <td>${booking.furnished ? 'FURNISHED' : 'UNFURNISHED'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    html2pdf().from(content).set({ margin: 1, filename: 'Booking_Request_report.pdf' }).save();
  };

  const handleGenerateReport = () => {
    generatePDFReport();
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search Booking Request.."
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-2 w-150 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-2 h-10 dark:bg-slate-800 placeholder-gray-500"
        />
        <Button
          gradientDuoTone="purpleToBlue"
          outline
          onClick={handleGenerateReport}
        >
          Generate Report
        </Button>
      </div>

      {currentUser.isAdmin && userBookingRequests.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>User Name</Table.HeadCell>
            <Table.HeadCell>User Email</Table.HeadCell>
            <Table.HeadCell>Room No</Table.HeadCell>
            <Table.HeadCell>Room Type</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
            <Table.HeadCell>Price(RS.)</Table.HeadCell>
            <Table.HeadCell>Furnished Status</Table.HeadCell>
            <Table.HeadCell>delete</Table.HeadCell>
          </Table.Head>
          {userBookingRequests.map((booking) => (
            <Table.Body className="divide-y" key={booking._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{new Date(booking.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{booking.username}</Table.Cell>
                <Table.Cell>{booking.email}</Table.Cell>
                <Table.Cell>{booking.roomno}</Table.Cell> 
                <Table.Cell>{booking.roomtype}</Table.Cell>
                <Table.Cell>{booking.gender}</Table.Cell>
                <Table.Cell>{booking.price}</Table.Cell>
                <Table.Cell>{booking.furnished ? 'FURNISHED' : 'UNFURNISHED'}</Table.Cell>
                <Table.Cell>
                  <Button color="failure"onClick={() => {
                        setShowModel(true);
                        setBookingIdToDelete(booking._id);
                      }}>Delete</Button>
                </Table.Cell>
                
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      ) : (
        <p>No bookings available to show</p>
      )}

      <Modal show={showModel} onClose={() => setShowModel(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">
              Are you sure you want to delete this booking?
            </h3>
          </div>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteBooking}>Yes, delete</Button>
            <Button color="gray" onClick={() => setShowModel(false)}>No, cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
