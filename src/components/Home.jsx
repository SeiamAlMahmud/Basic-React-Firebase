import React from 'react'
import { Link, Outlet } from 'react-router-dom'
// import { getDatabase, ref, set } from 'firebase/database'


const Home = () => {

    return (
        <div className='flex flex-row'>
            <div className='bg-teal-700 min-h-screen w-1/6 flex-col flex items-center py-5 gap-5'>
            <Link to={'/addStudent'} className='border bg-cyan-200 py-1 px-3 hover:bg-cyan-500'>Add Student</Link>
            <Link to={'/studentList'} className='border bg-cyan-200 py-1 px-3 hover:bg-cyan-500'>Student List</Link>
            </div>
            <div className='bg-sky-400 w-5/6'>
              <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Home