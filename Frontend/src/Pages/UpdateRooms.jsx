import { Alert, Button, FileInput, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


export default function UpdateRooms() {
 
  const [formData, setFormData] = useState({ 
    roomtype: '', 
    furnished: false, 
    gender: '', 
    price: '', });
  const [publishError, setPublishError] = useState(null);
  const {roomId} = useParams();
  console.log(roomId); 
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`/api/rooms/getrooms?roomId=${roomId}`);
        const data = await res.json();
        console.log(data)

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        const room = data.rooms.find(r => r._id === roomId);
        setFormData({ ...room, roomno: room.roomno  });
        setPublishError(null);
       
      } catch (error) {
        setPublishError(error.message);
      }
    };

    fetchRooms();
  }, [roomId]);


 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/rooms/updateroom/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate('/dashboard?tab=products');
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Products</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextInput type='text' placeholder='Room-no' required id='roomno' className='flex flex-col gap-4 justify-between' onChange={(e) =>
          setFormData({ ...formData, roomno: e.target.value })} value={formData.roomno || ''}/>
        
      <div className="flex flex-col gap-4 justify-between">
          <Select
            onChange={(e) => setFormData({ ...formData, roomtype: e.target.value })} value={formData.roomtype || ''}
          > <option value="">Select Room Type</option>
            <option value="single">Single Room</option>
            <option value="double">Double Room</option>
            <option value="triple">Triple Room</option>
          </Select>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div className="flex items-start gap-2">
            <label className="gap-2">Furnish status</label>
            <input
              type="checkbox"
              id="furnished"
              className="w-5"
              onChange={(e)=> setFormData({ ...formData, furnished: e.target.value})}
              checked={formData.furnished}
            />
            <span>Furnished</span>
          </div>
        </div>
        <div className=" gap-2 items-start  border rounded-lg p-4 m-3">
          <label className="mb-3">Select Gender</label>
          <div className=" gap-4">
            <div className=" items-center gap-2">
              <input
                type="checkbox"
                id="male"
                className="w-5"
                onChange={() => setFormData({ ...formData, gender: 'male' })}
                checked={formData.gender === 'male'}
              />
              <span className="ml-2">Male</span>
            </div>

            <div className=" items-center gap-2">
              <input
                type="checkbox"
                id="female"
                className="w-5"
                onChange={(e)=> setFormData({ ...formData, gender:'female'})}
                checked={formData.gender === "female"}
              />
              <span className="ml-2">Female</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="number"
            placeholder="Price"
            id="price"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
