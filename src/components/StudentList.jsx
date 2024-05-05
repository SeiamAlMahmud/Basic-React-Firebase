import { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, remove } from 'firebase/database'
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage'
import { app } from '../Firebase'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ImagePopup from './ImagePopup';
import { Helmet } from 'react-helmet';

const StudentList = () => {
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();
  const db = getDatabase(app);
  const storage = getStorage(app)
  useEffect(() => {
    const refStudent = ref(db, 'students')
    onValue(refStudent, (snapShort) => {
      const data = snapShort.val();
      setStudentData(data)
      console.log(data);
    })
  }, [])
  const handleDelete = (key) => {
    const myRef = storageRef(storage, `students/images/${key}`)
    const refStudent = ref(db, 'students/' + key);
    deleteObject(myRef)
      .then(res => {

        remove(refStudent)
      })
      .catch(err => {
        console.log(err)
      })

  }
  return (
    <>
      <Helmet>
        <title>
          Student  List
        </title>
      </Helmet>
      <div className='overflow-x-auto'> <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell > Photo</TableCell>
              <TableCell align="center"> Name</TableCell>
              <TableCell align="center"> Phone Number</TableCell>
              <TableCell align="center">Admission Number</TableCell>
              <TableCell align="center">Update</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData && (
              <>
                {
                  Object.entries(studentData).map(([key, value]) => {
                    return (


                      <TableRow
                        key={key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {/* <Avatar
  alt={value.username}
  src={value.imagePhoto}
  sx={{ width: 56, height: 56 }}
/> */}
                          <ImagePopup alt={value.username}
                            src={value.imagePhoto} />
                        </TableCell>
                        <TableCell align="center">{value.username}</TableCell>
                        <TableCell align="center">{value.Number}</TableCell>
                        <TableCell align="center">{key}</TableCell>
                        <TableCell align="center"><button onClick={() => navigate('/updateStudet', { state: [key, value] })}><FileOpenRoundedIcon className='text-green-700 text-xl' /></button></TableCell>
                        <TableCell align="center"><button onClick={() => handleDelete(key)}><DeleteForeverIcon className='text-red-700 text-xl' /></button></TableCell>
                      </TableRow>
                    )
                  })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      </div>
    </>
  )
}

export default StudentList