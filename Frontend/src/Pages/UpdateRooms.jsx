import {
  Alert,
  Button,
  FileInput,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateRooms() {
  const [formData, setFormData] = useState({
    roomtype: "",
    furnished: false,
    gender: "",
    price: "",
  });
  const [publishError, setPublishError] = useState(null);
  const { roomId } = useParams();
  console.log(roomId);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`/api/rooms/getrooms?roomId=${roomId}`);
        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        const room = data.rooms.find((r) => r._id === roomId);
        setFormData({ ...room, roomno: room.roomno });
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
      const res = await fetch(
        `/api/rooms/updateroom/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate("/dashboard?tab=products");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update Room details
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 ml-1 p-2 sm:flex-row justify">
          <label>Roon No :</label>
          <TextInput
            type="text"
            placeholder="Room-no"
            required
            id="roomno"
            className="flex flex-col gap-2 justify-between"
            onChange={(e) =>
              setFormData({ ...formData, roomno: e.target.value })
            }
            value={formData.roomno || ""}
          />
          <label className="gap-4">Price :</label>

          <TextInput
            type="number"
            placeholder="Price"
            id="price"
            className="flex flex-col gap-2 justify-center"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            value={formData.price || ""}
          />
        </div>

        <div className="flex flex-col gap-4 ml-3 justify-between">
          <Select
            onChange={(e) =>
              setFormData({ ...formData, roomtype: e.target.value })
            }
            value={formData.roomtype || ""}
          >
            {" "}
            <option value="">Select Room Type</option>
            <option value="single">Single Room</option>
            <option value="double">Double Room</option>
            <option value="triple">Triple Room</option>
          </Select>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div className="gap-2 items-start sm:flex-row border rounded-lg p-2 m-3">
            <label className="gap-2">Furnish Status</label>
            <div className="flex  items-start gap-3 p-1 m-1">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="furnished"
                  name="furnishStatus"
                  className="w-5"
                  onChange={() => setFormData({ ...formData, furnished: true })}
                  checked={formData.furnished === true}
                />
                <span>Furnished</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="unfurnished"
                  name="furnishStatus"
                  className="w-5"
                  onChange={() =>
                    setFormData({ ...formData, furnished: false })
                  }
                  checked={formData.furnished === false}
                />
                <span>Unfurnished</span>
              </div>
            </div>
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
                onChange={() => setFormData({ ...formData, gender: "male" })}
                checked={formData.gender === "male"}
              />
              <span className="ml-2">Male</span>
            </div>

            <div className=" items-center gap-2">
              <input
                type="checkbox"
                id="female"
                className="w-5"
                onChange={(e) => setFormData({ ...formData, gender: "female" })}
                checked={formData.gender === "female"}
              />
              <span className="ml-2">Female</span>
            </div>
          </div>
        </div>

        <Button type="submit" gradientDuoTone="purpleToBlue">
          Update
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
