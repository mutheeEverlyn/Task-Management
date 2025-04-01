import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiLogoutCircleLine, RiTaskLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { LayoutDashboard } from 'lucide-react';

interface UserPhoneDashboardProps {
  showItems: boolean;
}

const UserPhoneDashboard: React.FC<UserPhoneDashboardProps> = ({ showItems }) => {
  const handleLogout = () => {
    localStorage.removeItem('userDetails');
  };

  return (
    <div className={`md:hidden ${showItems ? 'block' : 'hidden'}`}>
      <div className="bg-gray-400 p-4 text-white">
        <ul>
          <li className="mb-2">
            <NavLink to="" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
              <LayoutDashboard className="mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="tasks" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
              <RiTaskLine className="mr-2" size={24} />
              My Tasks
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="profile" className={({ isActive }) => `flex items-center ${isActive ? 'text-amber-300' : 'text-white'}`}>
              <FaUserCircle size={30} className="mr-2" />
              My Profile
            </NavLink>
          </li>
          <li className="mt-4">
            <button onClick={handleLogout} className="flex items-center text-white hover:text-amber-300">
              <RiLogoutCircleLine className="mr-2" size={24} />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserPhoneDashboard;
