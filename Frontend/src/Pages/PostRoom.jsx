import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Alert, Button, TextInput } from 'flowbite-react';
import { FaPlus, FaMinus, FaChair } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';


export default function PostRoom() {
  const { roomSlug } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ visible: false, message: '' });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/rooms/getrooms?slug=${roomSlug}`);

        if (!res.ok) {
          const errorMessage = await res.text();
          setError(errorMessage);
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (data.rooms.length === 0) {
          setError('Room not found');
          setLoading(false);
          return;
        }

        setRoom(data.rooms[0]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomSlug]);



 

  const showNotification = (message) => {
    setNotification({ visible: true, message });
    setTimeout(() => {
      setNotification({ visible: false, message: '' });
    }, 3000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert color="failure">{error}</Alert>;
  }

  const handleBooking = async (room) => {
    if (!user) {
      showNotification("Please log in to book a room.");
      return;
    }
  
    try {
      const bookingData = {
        userId: user._id,
        roomId: room._id,
        furnished: room.furnished,
        roomtype: room.roomtype,
        gender: room.gender,
        roomno: room.roomno,
        price: room.price,
        slug: room.slug,
      };
  
      const res = await fetch('/api/bookings/addbooking', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Include token if required
        },
        body: JSON.stringify(bookingData),
      });
  
      if (res.ok) {
        const savedBooking = await res.json();
        showNotification("Room booked successfully!");
      } else {
        const errorData = await res.json();
        showNotification(errorData.message || "Failed to book room.");
      }
    } catch (error) {
      console.error(error);
      showNotification("An error occurred while booking.");
    }
  };

  return (
    <div className="p-3 max-w-5xl mx-auto min-h-screen">
      {notification.visible && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          {notification.message}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-6">
        
        <div className="sm:w-2/3">
        
          <h1 className="text-3xl my-7 font-semibold justify-center">Room Type - {room.roomtype}</h1>
          <h1 className="text-3xl my-7 font-semibold justify-center">Room No - RNO{room.roomno}</h1>

          <div className={`p-2 flex items-center justify-center font-semibold ${
              room.furnished ? "text-blue-800" : "text-red-600"}`} >
                  <FaChair className="text-2xl mr-2" />
                  <span>{room.furnished ? "FURNISHED" : "UNFURNISHED"}</span>
         </div>          
         <h1 className="text-3xl my-7 font-semibold justify-center">Gender - {room.gender}</h1>
          <div className="flex items-center mt-4 gap-2 justify-center">
          <div className=" gap-4 sm:flex-row justify-between mt-4">
            Price: Rs. {room.price}
          </div>
            
          </div>
          
          
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="block w-full text-center py-2 mt-2 bg-slate-200 border border-slate-200 text-black hover:bg-slate-400 rounded hover:border-slate-300 hover:text-white hover:font-semibold"
              onClick={() => handleBooking(room)}
            >
              Book
            </button>
          
          </div>
        </div>
      </div>
      
    </div>
  );
}
