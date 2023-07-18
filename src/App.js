//without validation
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [empId, setEmpId] = useState('');
//   const [empName, setEmpName] = useState('');
//   const [department, setDepartment] = useState('');
//   const [email, setEmail] = useState('');
//   const [data, setData] = useState([]);
//   const [editableRowId, setEditableRowId] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/getAll'); 
//       setData(response.data);
//     } catch (error) {
//       console.error('Error occurred while fetching data:', error);
//     }
//   };

//   const handleRowEdit = (rowId) => {
//     if (editableRowId === rowId) {
//       return;
//     }
//     setEditableRowId(rowId);
//   };

//   const handleRowSave = async (rowId) => {
//     try {
//       const updatedRow = data.find((item) => item.Emp_Id === rowId);
//       const updatedData = {
//         Emp_Name: updatedRow.Emp_Name,
//         Department: updatedRow.Department,
//         Email: updatedRow.Email,
//         Emp_Id: updatedRow.Emp_Id,
//       };

//       await axios.patch(`http://localhost:3000/api/update/${updatedRow._id}`, updatedData);
//       setEditableRowId(null);
//       fetchData();
//     } catch (error) {
//       console.error('Error occurred while updating data:', error);
//     }
//   };

//   const handleRowDelete = async (rowId) => {
//     try {
//       const deletedRow = data.find((item) => item.Emp_Id === rowId);
//       await axios.delete(`http://localhost:3000/api/delete/${deletedRow._id}`);
//       fetchData();
//     } catch (error) {
//       console.error('Error occurred while deleting data:', error);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const newEmployee = {
//         Emp_Id: empId,
//         Emp_Name: empName,
//         Department: department,
//         Email: email,
//       };
//       await axios.post('http://localhost:3000/api/post', newEmployee);
//       setEmpId('');
//       setEmpName('');
//       setDepartment('');
//       setEmail('');
//       fetchData();
//     } catch (error) {
//       console.error('Error occurred while adding new employee:', error);
//     }
//   };

//   return (
//     <>
//       <form className="form-inline" onSubmit={handleSubmit}>
//         <div className="List_view ">Employee List View</div>
//         <div className="form-group mx-sm-3 mb-10">
//           <input
//             type="number"
//             id="empId"
//             placeholder="EMP ID"
//             value={empId}
//             onChange={(event) => setEmpId(event.target.value)}
//           />
//           <input
//             type="text"
//             id="empName"
//             placeholder="Emp Name"
//             value={empName}
//             onChange={(event) => setEmpName(event.target.value)}
//           />
//           <input
//             type="text"
//             id="dept"
//             placeholder="Department"
//             value={department}
//             onChange={(event) => setDepartment(event.target.value)}
//           />
//           <input
//             type="email"
//             id="email"
//             placeholder="Email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//           />
//           <button
//             style={{ marginLeft: '2rem' }}
//             type="submit"
//             className="btn btn-primary mb-2"
//           >
//             Add
//           </button>
//         </div>
//         <br />

//         <div>
//           <table className="table">
//             <thead className="thead-dark">
//               <tr>
//                 <th>Emp Id</th>
//                 <th>Emp Name</th>
//                 <th>Emp Department</th>
//                 <th>Emp Email</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 <tr key={item.Emp_Id}>
//                   <td>{item.Emp_Id}</td>
//                   <td>
//                     {editableRowId === item.Emp_Id ? (
//                       <input
//                         type="text"
//                         value={item.Emp_Name}
//                         onChange={(event) => {
//                           const updatedRow = {
//                             ...item,
//                             Emp_Name: event.target.value,
//                           };
//                           setData((prevData) =>
//                             prevData.map((row) =>
//                               row.Emp_Id === item.Emp_Id ? updatedRow : row
//                             )
//                           );
//                         }}
//                       />
//                     ) : (
//                       <span>{item.Emp_Name}</span>
//                     )}
//                   </td>
//                   <td>
//                     {editableRowId === item.Emp_Id ? (
//                       <input
//                         type="text"
//                         value={item.Department}
//                         onChange={(event) => {
//                           const updatedRow = {
//                             ...item,
//                             Department: event.target.value,
//                           };
//                           setData((prevData) =>
//                             prevData.map((row) =>
//                               row.Emp_Id === item.Emp_Id ? updatedRow : row
//                             )
//                           );
//                         }}
//                       />
//                     ) : (
//                       <span>{item.Department}</span>
//                     )}
//                   </td>
//                   <td>
//                     {editableRowId === item.Emp_Id ? (
//                       <input
//                         type="email"
//                         value={item.Email}
//                         onChange={(event) => {
//                           const updatedRow = {
//                             ...item,
//                             Email: event.target.value,
//                           };
//                           setData((prevData) =>
//                             prevData.map((row) =>
//                               row.Emp_Id === item.Emp_Id ? updatedRow : row
//                             )
//                           );
//                         }}
//                       />
//                     ) : (
//                       <span>{item.Email}</span>
//                     )}
//                   </td>
//                   <td>
//                     {editableRowId === item.Emp_Id ? (
//                       <>
//                         <button
//                           onClick={() => handleRowSave(item.Emp_Id)}
//                           className="btn btn-success"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={() => setEditableRowId(null)}
//                           className="btn btn-danger ml-2"
//                         >
//                           Cancel
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => handleRowEdit(item.Emp_Id)}
//                           className="btn btn-primary"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleRowDelete(item.Emp_Id)}
//                           className="btn btn-danger ml-4"
//                         >
//                           Delete
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </form>
//     </>
//   );
// }

// export default App; 



//validation
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [empId, setEmpId] = useState('');
  const [empName, setEmpName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [editableRowId, setEditableRowId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getAll');
      setData(response.data);
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    }
  };

  const handleRowEdit = (rowId) => {
    if (editableRowId === rowId) {
      return;
    }
    setEditableRowId(rowId);
  };

  const handleRowSave = async (rowId) => {
    try {
      const updatedRow = data.find((item) => item.Emp_Id === rowId);
      const updatedData = {
        Emp_Name: updatedRow.Emp_Name,
        Department: updatedRow.Department,
        Email: updatedRow.Email,
        Emp_Id: updatedRow.Emp_Id,
      };
      await axios.patch(`http://localhost:3000/api/update/${updatedRow._id}`, updatedData);
      setEditableRowId(null);
      fetchData();
    } catch (error) {
      console.error('Error occurred while updating data:', error);
    }
  };

  const handleRowDelete = async (rowId) => {
    try {
      const deletedRow = data.find((item) => item.Emp_Id === rowId);
      await axios.delete(`http://localhost:3000/api/delete/${deletedRow._id}`);
      fetchData();
    } catch (error) {
      console.error('Error occurred while deleting data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!empId || !empName || !department || !email) {
        setError('Please fill in all fields.');
        return;
      }

      if (!/^[a-zA-Z\s]*$/.test(empName)) {
        setError('Invalid Employee Name. Only letters and spaces are allowed.');
        return;
      }

      if (!/^[a-zA-Z\s]*$/.test(department)) {
        setError('Invalid Department. Only letters and spaces are allowed.');
        return;
      }

      const newEmployee = {
        Emp_Id: empId,
        Emp_Name: empName,
        Department: department,
        Email: email,
      };
      await axios.post('http://localhost:3000/api/post', newEmployee);
      setEmpId('');
      setEmpName('');
      setDepartment('');
      setEmail('');
      setError('');
      fetchData();
    } catch (error) {
      console.error('Error occurred while adding a new employee:', error);
    }
  };

  return (
    <>
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="List_view">Employee List View</div>
        <div className="form-group mx-sm-3 mb-10">
          <input
            type="number"
            id="empId"
            placeholder="EMP ID"
            value={empId}
            onChange={(event) => setEmpId(event.target.value)}
            required
          />
          <input
            type="text"
            id="empName"
            placeholder="Emp Name"
            value={empName}
            onChange={(event) => setEmpName(event.target.value)}
            required
          />
          <input
            type="text"
            id="dept"
            placeholder="Department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button
            style={{ marginLeft: '2rem' }}
            type="submit"
            className="btn btn-primary mb-2"
          >
            Add
          </button>
        </div>
        {error && <div className="error">{error}</div>}
        <br />
        <div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Emp Id</th>
                <th>Emp Name</th>
                <th>Emp Department</th>
                <th>Emp Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.Emp_Id}>
                  <td>{item.Emp_Id}</td>
                  <td>
                    {editableRowId === item.Emp_Id ? (
                      <input
                        type="text"
                        value={item.Emp_Name}
                        onChange={(event) => {
                          const updatedRow = {
                            ...item,
                            Emp_Name: event.target.value,
                          };
                          setData((prevData) =>
                            prevData.map((row) =>
                              row.Emp_Id === item.Emp_Id ? updatedRow : row
                            )
                          );
                        }}
                      />
                    ) : (
                      <span>{item.Emp_Name}</span>
                    )}
                  </td>
                  <td>
                    {editableRowId === item.Emp_Id ? (
                      <input
                        type="text"
                        value={item.Department}
                        onChange={(event) => {
                          const updatedRow = {
                            ...item,
                            Department: event.target.value,
                          };
                          setData((prevData) =>
                            prevData.map((row) =>
                              row.Emp_Id === item.Emp_Id ? updatedRow : row
                            )
                          );
                        }}
                      />
                    ) : (
                      <span>{item.Department}</span>
                    )}
                  </td>
                  <td>
                    {editableRowId === item.Emp_Id ? (
                      <input
                        type="email"
                        value={item.Email}
                        onChange={(event) => {
                          const updatedRow = {
                            ...item,
                            Email: event.target.value,
                          };
                          setData((prevData) =>
                            prevData.map((row) =>
                              row.Emp_Id === item.Emp_Id ? updatedRow : row
                            )
                          );
                        }}
                      />
                    ) : (
                      <span>{item.Email}</span>
                    )}
                  </td>
                  <td>
                    {editableRowId === item.Emp_Id ? (
                      <>
                        <button
                          onClick={() => handleRowSave(item.Emp_Id)}
                          className="btn btn-success"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditableRowId(null)}
                          className="btn btn-danger ml-2"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleRowEdit(item.Emp_Id)}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRowDelete(item.Emp_Id)}
                          className="btn btn-danger ml-4"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}
export default App;
