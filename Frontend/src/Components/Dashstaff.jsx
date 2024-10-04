import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Dashstaff() {
    const { currentUser } = useSelector((state) => state.user);
    const [Staffmembers, setmembers] = useState([]);
    
    const [showModel , setShowModel] = useState(false);
    const [memberIDToDelete, setmemberIdToDelete] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
  

    useEffect(() => {
        const fetchs = async () => {
          try {
            const res = await fetch('/api/staff/get');
            const data = await res.json();
            if (res.ok) {
              setmembers(data);
              console.log(data)
             
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        if (currentUser.isAdmin) {
          fetchs();
        }
      }, []);

      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
       
      };
      const handleDeleteProduct = async () => {
        setShowModel(false);
        try {
          const res = await fetch(
            `/api/staff/delete/${memberIDToDelete}`,
            {
              method: 'DELETE',
            }
          );
          const data = await res.json();
          window.location.href="/dashboard?tab=staff"
          if (!res.ok) {
            console.log(data.message); 
          } 
        } catch (error) {
          console.log(error.message);
        }
      };
      

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    
    <input
          type="text"
          placeholder="Search members.."
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-2 w-150 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-2 h-10 dark:bg-slate-800  placeholder-gray-500"
        style={{marginLeft:"30%",width:"40%",marginBottom:"30px"}}/>
    
    
      {currentUser.isAdmin && Staffmembers.length>0?
      (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell> Image</Table.HeadCell>
              <Table.HeadCell>Age</Table.HeadCell>
            
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone number</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Staff type</Table.HeadCell>
              <Table.HeadCell>Task</Table.HeadCell>
              <Table.HeadCell>
                <span>Delete</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
             
            </Table.Head>
            { Staffmembers.filter((members) => {
                return searchTerm.toLowerCase() === ''
                  ? members
                  : members.Staffmembername.toLowerCase().includes(searchTerm) ;
              }).map(
                members=>{
          return(
                // eslint-disable-next-line react/jsx-key
                <Table.Body  className='divide-y'  key={members._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{members.Staffmembername}</Table.Cell>
                    <Table.Cell>
                
                       <img
                        src={members.Picture}
                        alt={members.Staffmembername}
                        className="w-20 h-10 object-cover bg-gray-500"
                       />
                   
                  </Table.Cell>
                  
                  <Table.Cell>{members.Age}</Table.Cell>
              
                  <Table.Cell>{members.email}</Table.Cell>
                  <Table.Cell>{members.phonenumber}</Table.Cell>
                  <Table.Cell>{members.address}</Table.Cell>
                  <Table.Cell>{members.stafftype}</Table.Cell>
                  <Table.Cell>{members.task}</Table.Cell>
                  <Table.Cell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer'
                        onClick={() => {
                          setShowModel(true);
                          setmemberIdToDelete(members._id);
                        }} 
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline'to={`/updatestaff/${members._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                 
                  </Table.Row>
                 
                </Table.Body>
                )})}
          </Table>
        
        </>

      ):(
        <p>You have no products to show</p>
      )}
        <Modal show={showModel} onClose={()=>setShowModel(false)} popup size='md'>
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete this Member</h3>
            </div>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteProduct}>
                Yes, I am sure
              </Button>
              <Button color='gray' onClick={() => setShowModel(false)}>
                No, cancel
              </Button>
            </div>
          </Modal.Body>
      </Modal>
    </div>
  )
}