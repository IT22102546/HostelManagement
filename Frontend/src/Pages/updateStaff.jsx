
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState,useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate,useParams } from "react-router-dom";

export default function Updatestaff() {
    const[file,setFile]=useState(null);
    const[imageUploadProgress,setImageUploadProgress] = useState(null);
    const[imageUploadError,setImageUploadError] = useState(null);
    const [formData , setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const [name,setname] = useState ([])
    const[age,setage]=useState();
    const[email,setemail]=useState();
    const[image,setimage]=useState();
    const[number,setnumber]=useState();
    const[address,setaddress]=useState();
    const[task,settask]=useState();
    const[type,settype]=useState();
    const[salary,setsalary]=useState();

    

  const { id } = useParams();

  const navigate = useNavigate();
 
  const handleUploadImage = () =>{
    try {
      if(!file){
        setImageUploadError('please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime()+'-'+file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        
        (error) => {
          setImageUploadError("Image upload failed");
          console.error("Upload error:", error);
          setImageUploadProgress(null);
         
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({...formData, image: downloadURL});
          }
           
          );
        }
      );

    } catch (error) {
      setImageUploadError('Failed to upload image');
      setImageUploadProgress(null);
      console.log(error);
    }
  }



  useEffect(() => {
    try {
      const fetstaff= async () => {
        const res = await fetch(`/api/staff/getmember/${id}`);
        const data = await res.json();
        if (!res.ok) {
          console.log("error")
      
          return;
        }
        if (res.ok) {
            
            setname(data.Staffmembername)
            setFile(data.Age)
            setaddress(data.address)
            setemail(data.email)
            setnumber(data.phonenumber)
            settask(data.task)
            setage(data.Age)
            settype(data.stafftype)
            setsalary(data.salary)

            console.log(data)
        
         }
      };

      fetstaff();
    } catch (error) {
      console.log(error.message[0]);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/staff/updatemember/${id}`, {
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
      console.log(formData);

      if (res.ok) {
        setPublishError(null);
        navigate(`/dashboard?tab=profile`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Add Staff Member</h1>
        <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
        
         <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput type='file'accept='image/*' onChange={(e)=>setFile(e.target.files[0])}  />
            <Button onClick={handleUploadImage} type='button'gradientDuoTone='purpleToBlue'size='sm' outline disabled={imageUploadProgress}>
              {
                imageUploadProgress ?(
                <div className="w-16 h-16" >
                  <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}`}/>
                </div>
                ) :('Upload Image')

              }
            </Button>
        </div>
        {imageUploadError && (
          <Alert color='failure'>{imageUploadError}</Alert>
        )}
        {formData.image && (
          <img src={image} alt="upload" className="w-full h-82 object-cover"/>
        )}
        <TextInput type='text'placeholder='Member Name'required id='Member Name'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, membername: e.target.value })
            } defaultValue={name}/>
       
            <TextInput type='number'placeholder='Age'required id='Age'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, age: e.target.value })
            } defaultValue={age}/>
            <TextInput type='text'placeholder='Phone number'required id='Phone number'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, number: e.target.value })
            } defaultValue={number}/>
<TextInput type='email'placeholder='Email'required id='email'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            } defaultValue={email}/>
             <Select onChange={(e) => setFormData({ ...formData, type: e.target.value })} defaultValue={type}>
            <option value='Administrative staff'>Administrative staff</option>
            <option value='cleaning staff'>cleaning staff</option>
            <option value='Security staff'>Security staff</option>
            <option value='Technical staff'>Technical staff</option>
            <option value='Laundary staff'>Laundary staff</option>
          </Select>
            <TextInput type='text'placeholder='Address'required id='Address'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, Address: e.target.value })
            } defaultValue={address}/>

<TextInput type='number'placeholder='Salary 'required id='Salary'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            } defaultValue={salary}/>
          
            <TextInput type='text'placeholder='Task'required id='pos'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, task: e.target.value })
            } defaultValue={task}/>
            
            
        <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
        </form>
    </div>
  )
}