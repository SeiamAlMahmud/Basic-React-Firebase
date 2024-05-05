import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import Root from './foundation/Root'
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import UpdateStudent from './components/UpdateStudent';
import Error from './components/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <AddStudent></AddStudent>
      }, 
      {
        path: '/addStudent',
        element: <AddStudent></AddStudent>
      }, 
      {
        path: '/studentList',
        element: <StudentList></StudentList>
      }, 
      {
        path: '/updateStudet',
        element: <UpdateStudent></UpdateStudent>
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
