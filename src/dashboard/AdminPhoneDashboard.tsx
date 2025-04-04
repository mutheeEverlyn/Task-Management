import { Link } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa";
import { useGetUserByIdQuery } from '../features/users_management/UsersApi';
interface mobile{
  showItems:boolean;
}
const AdminPhoneDashboard =({showItems}:mobile) => {
   
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <div>Error: No user is logged in.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;
  const { data, error, isLoading } = useGetUserByIdQuery(user_id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  return (
    
    <div
    className={`${
      showItems ? "right-0" : "-left-[100%]"
    } fixed bottom-0 top-16 z-20 flex h-screen w-[75%] flex-col justify-between   px-8 pb-6 pt-6  transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
  >
    <div className="card bg-black">
    <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
          <h1 className="pt-2 text-white">Welcome {data.full_name}</h1>
          </div>
        </div>
    <div className="mt-2">
    <ul className="space-y-2 text-xl px-5">
        <li><button><Link to='' className='hover:border-b-2 hover:text-amber-300 mb-2 inline-block text-white'>Dashboard</Link></button></li>
        <li><button><Link to='tasks'  className='hover:border-b-2 hover:text-amber-300 mb-2 inline-block text-white'>Tasks List</Link></button></li>
        <li><button><Link to='users'  className='hover:border-b-2 hover:text-amber-300 mb-2 inline-block text-white'>Manage Users</Link></button></li>
        
      </ul>
    </div>

    </div>
    </div>
  )
}

export default AdminPhoneDashboard
