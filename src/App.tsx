import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './features/login/Login';
import Register from './features/register/Register';
import UserDashboard from './dashboard/UserDashboard';
import Dashboard from './components/Dashboard';
import TaskBoard from './features/Tasks/TaskBoard';
import AdminTasks from './features/Tasks/AdminTasks';
import Profile from './pages/Profile';
import Home from './pages/Home';
import About from './components/About';
import Error from './pages/Error';
import Admin from './components/Admin';
import ContactUs from './components/ContactUs';
import ContactSuccess from './components/ContactSuccess';
import Services from './components/Services';
import RouteProtection from './components/RouteProtection';
import AdminDashboard from './dashboard/AdminDashboard';
import UsersTable from './features/users_management/UsersTable';

const App: React.FC = () => {
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
      element: <RouteProtection element={AdminDashboard} role="admin" />,
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Admin />,
        },
        {
          path: 'tasks',
          element: <AdminTasks />,
        },
        {
          path: 'users',
          element: <UsersTable />,
        },
      ],
    },
    {
      path: 'userDashboard/*',
      element: <RouteProtection element={UserDashboard} role="user" />,
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Dashboard />,
        },
        {
          path: 'tasks',
          element: <TaskBoard />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: 'contact-us',
      element: <ContactUs />,
      errorElement: <Error />,
    },
    {
      path: 'contactSuccess',
      element: <ContactSuccess />,
      errorElement: <Error />,
    },
    {
      path: 'services',
      element: <Services />,
      errorElement: <Error />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
