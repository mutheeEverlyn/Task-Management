import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './components/About';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Admin from './components/Admin';
import Register from './features/register/Register';
import AdminDashboard from './dashboard/AdminDashboard';
import UserDashboard from './dashboard/UserDashboard';
import Login from './features/login/Login';
import Contact from './components/Contact';
import Tasks from './components/Tasks';
import RouteProtection from './components/RouteProtection';
import UsersTable from './features/users_management/UsersTable';
import Dashboard from './components/Dashboard';
const App:React.FC=()=> {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: 'register',
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: 'login',
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: 'about',
      element: <About />,
      errorElement: <Error />,
    },
    {
      path: 'adminDashboard/*',
      element: (<RouteProtection element={AdminDashboard} role="admin"/>),
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Admin />,
        },
        {
          path: 'Tasks',
          element: <Tasks/>,
        },
        {
          path: 'users',
          element: <UsersTable/>,
        },
      ],
    },
    {
      path: 'userDashboard/*',
      element: (<RouteProtection element={UserDashboard} role="user"/>),
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Dashboard />,
        },
        {
          path: 'profile',
          element: <Profile />,
          errorElement: <Error />,
        },
   
      ],
    },
    ,
    {
      path: 'contact',
      element: <Contact />,
      errorElement: <Error />,
    },
    {
      path: 'login',
      element: <Login />,
      errorElement: <Error />,
    },
  ]);
  return(
    <div>
    <RouterProvider router={router} />
    </div>
    ) 
}

export default App
