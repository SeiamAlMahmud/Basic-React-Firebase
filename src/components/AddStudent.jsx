import React, { useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const AddStudent = () => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [admission, setAdmission] = useState('')
  const [selectFile, setSelectFile] = useState(null)
  const navigate = useNavigate()
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectFile(file)
  }
  const submitHandle = async (e) => {
    e.preventDefault();
    const db = getDatabase(app);
    const storage = getStorage(app);


    const imageRef = storageRef(storage, `students/images/${admission}`)
    await uploadBytes(imageRef,selectFile)
    const imgURL = await getDownloadURL(imageRef)


      set(ref(db, "students/" + admission), {
        username: name,
        Number: number,
        imagePhoto: imgURL
      })
        .then(res => {
          navigate('/studentList')
          setName('')
          setNumber('')
          setAdmission('')
        });


  }
  // console.log(name, number);
  return (
    <>
      <Helmet>
        <title>
         Add New Student
        </title>
      </Helmet>
    <div className='min-h-screen justify-center items-center'>

      <form onSubmit={submitHandle} className='flex flex-col min-h-screen gap-6 justify-center items-center  py-1 px-7 rounded-md'>
        <input type="text" onBlur={e => setName(e.target.value)} placeholder='name' className=' w-72 h-10 px-1' />
        <input type="text" onBlur={e => setAdmission(e.target.value)} placeholder='Admission Roll' className=' w-72 h-10 px-1' />
        <input type="text" onBlur={e => setNumber(e.target.value)} name="addmission" id="" placeholder='number' className=' w-72 h-10 px-1' />
        <input type="file" onChange={handleFileChange} name="" id="" accept=".jpg,.png,.svg" />
        <input type="submit" value="Submit" className='bg-teal-700 border rounded-sm py-1 px-3 cursor-pointer' />
      </form>
    </div>
      </>
  )
}

export default AddStudent