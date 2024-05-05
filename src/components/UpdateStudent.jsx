import { getDatabase, ref, update } from 'firebase/database'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from '../Firebase'
import { Helmet } from 'react-helmet'

const UpdateStudent = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [name, setName] = useState(location.state[1].username)
  const [number, setNumber] = useState(location.state[1].Number)
  const [admission, setAdmission] = useState(location.state[0])
  const [caughtFile,setCaughtFile] = useState(null)
  console.log(admission)
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setCaughtFile(file)
  }
  const submitHandle = async (e) => {
    // const db = getDatabase(app);
    e.preventDefault();
    const db = getDatabase(app);
    const storage = getStorage(app);


    const imageRef = storageRef(storage, 'students/images/' + admission)
    await uploadBytes(imageRef,caughtFile)
    const imgURL = await getDownloadURL(imageRef)
    console.log(imgURL, 'hello')


    const studentRef = ref(db, 'students/' + location.state[0])
    update(studentRef, {
      username: name,
      Number: number,
        imagePhoto: imgURL
    }).then(res => {
      navigate('/studentList')
    })

   
  }
  return (
    <>
     <Helmet>
        <title>
          Student Update
        </title>
      </Helmet>
    <div className='min-h-screen justify-center items-center'>
      

      <form onSubmit={submitHandle} className='flex flex-col min-h-screen gap-6 justify-center  items-center  py-1 px-7 rounded-md'>
        <input type="text" onChange={e => setName(e.target.value)} value={name} placeholder='name' className=' w-72 h-10 px-1' />
        <input type="text" disabled onChange={e => setAdmission(e.target.value)} value={admission} placeholder='Admission Roll' className=' w-72 h-10 px-1' />
        <input type="text" onChange={e => setNumber(e.target.value)} value={number} name="addmission" id="" placeholder='number' className=' w-72 h-10 px-1' />
        <input type="file" onChange={handleFileChange} name="" id="" accept=".jpg,.png,.svg" />

        <input type="submit" value="Update" className='bg-orange-700 border rounded-sm py-1 px-3 cursor-pointer' />
      </form>
    </div>
      </>
  )
}

export default UpdateStudent