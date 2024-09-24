import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashMyBookingRequests() {
  const { currentUser } = useSelector((state) => state.user);
  const [userBookingRequests, setUserBookingRequests] = useState([]);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await fetch(`/api/bookings/getbookings`);
        const data = await res.json();

        if (res.ok) {
          // Filter the bookings based on the current user's email
          const userBookingRequests = data.bookings.filter(
            (booking) => booking.email === currentUser.email
          );

          // Set the total number of bookings and filter for completed bookings
          const totalBookings = userBookingRequests.length;
          const completedBookings = userBookingRequests.filter(
            (booking) => booking.bookingstatus === true
          ).length;

          // Update state
          setUserBookingRequests(userBookingRequests);
          setCompleteStatus(completedBookings);
          setTotalOrders(totalBookings);

        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    // Only fetch bookings if there is a valid currentUser
    if (currentUser?.email) {
      fetchMyBookings();
    }
  }, [currentUser]);

  

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar">

      {currentUser.isAdmin && userBookingRequests.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date </Table.HeadCell>
            <Table.HeadCell>Room No</Table.HeadCell>
            <Table.HeadCell>Room Type</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
            <Table.HeadCell>Price(RS.)</Table.HeadCell>
            <Table.HeadCell>Furnished Status</Table.HeadCell>
            <Table.HeadCell>Booking Status</Table.HeadCell>
          </Table.Head>
          {userBookingRequests.map((booking) => (
            <Table.Body className="divide-y" key={booking._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  {new Date(booking.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{booking.roomno}</Table.Cell>
                <Table.Cell>{booking.roomtype}</Table.Cell>
                <Table.Cell>{booking.gender}</Table.Cell>
                <Table.Cell>{booking.price}</Table.Cell>
                <Table.Cell>
                  {booking.furnished ? "FURNISHED" : "UNFURNISHED"}
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      booking.bookingstatus
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.bookingstatus ? "Accepted" : "Pending..."}
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      ) : (
        <p>No bookings available to show</p>
      )}
    </div>
  );
}
