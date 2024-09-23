import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function AddRoom() {

  const [formData, setFormData] = useState({ 
    roomtype: '', 
    furnished: false, 
    gender: '', 
    price: '', });
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  console.log(formData);



  const handleChange = (e) => {
    if (
      e.target.id === "single" ||
      e.target.id === "double" ||
      e.target.id === "triple"
    ) {
      setFormData({
        ...formData,
        roomtype: e.target.id,
      });
    }

    if (e.target.id === "male" || e.target.id === "female") {
      setFormData({
        ...formData,
        gender: e.target.id,
      });
    }

    if (e.target.id === "furnished") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/rooms/add', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sends roomtype, furnished, and price
      });
  
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
  
      if (res.ok) {
        setPublishError(null);
        navigate(`/room/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
      console.error(error);
    }
  };
  
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Add Room</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 justify-between">
          <Select
            onChange={(e) =>
              setFormData({ ...formData, roomtype: e.target.value })
            }
          >
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
              onChange={handleChange}
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
                onChange={handleChange}
                checked={formData.gender === "male"}
              />
              <span className="ml-2">Male</span>
            </div>

            <div className=" items-center gap-2">
              <input
                type="checkbox"
                id="female"
                className="w-5"
                onChange={handleChange}
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
        <Button type="submit" className="bg-slate-400">
          Add Rooms
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
