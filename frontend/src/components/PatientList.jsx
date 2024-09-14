import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';

const PatientList = ({ isAdmin }) => {
  const [patients, setPatients] = useState([]);
  const [prasads, setPrasads] = useState([]);

  useEffect(() => {
    // Fetch patients and prasads data from the backend
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        const patientsRes = await axios.get('/api/patients', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });
        setPatients(patientsRes.data);

        const prasadsRes = await axios.get('/api/prasads', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });
        setPrasads(prasadsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePrasadUpdate = async (barcode, prasadId) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      await axios.post(
        `/api/patients/${barcode}/prasad`,
        { prasadId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        }
      );
      // Update patient list after prasad status change
      const updatedPatients = patients.map((patient) =>
        patient.barcode === barcode
          ? { ...patient, prasadsTaken: [...patient.prasadsTaken, prasadId] }
          : patient
      );
      setPatients(updatedPatients);
    } catch (error) {
      console.error('Error updating prasad status:', error);
    }
  };

  // Define columns for react-table
  const columns = React.useMemo(() => {
    // Create a column for each prasad
    const prasadColumns = prasads.map((prasad) => ({
      Header: prasad.name,
      accessor: (row) => (row.prasadsTaken.includes(prasad._id) ? 'Taken' : 'Not Taken'),
      Cell: ({ row, value }) => (
        <button
          style={{
            backgroundColor: value === 'Taken' ? 'green' : 'red',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100px',
          }}
          disabled={value === 'Taken'}
          onClick={() => isAdmin && handlePrasadUpdate(row.original.barcode, prasad._id)}
        >
          {value}
        </button>
      ),
    }));

    return [
      {
        Header: 'Image',
        accessor: 'photo', // Assuming the patient's image is stored in the `photo` field
        Cell: ({ cell: { value } }) => (
          <img
            src={value}
            alt="Patient"
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'cover',
              borderRadius: '5px',
            }}
          />
        ),
      },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'Mobile', accessor: 'mobile' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      ...prasadColumns, // Include prasad columns
      {
        Header: 'Delete',
        accessor: '_id',
        Cell: ({ row }) => (
          <button
            onClick={() => handleDeletePatient(row.original._id)}
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        ),
      },
    ];
  }, [prasads, patients, isAdmin]);

  const handleDeletePatient = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/patients/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });

        setPatients(patients.filter((patient) => patient._id !== patientId));
        alert('Patient deleted successfully');
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert('Failed to delete patient');
      }
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: patients },
    useSortBy
  );

  return (
    <div style={{ overflow: 'scroll' }}>
      <h1>Patient List</h1>
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
