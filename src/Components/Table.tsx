import { useState } from 'react';
import { UserType } from '../types/userType'
import { PropsType } from '../types/userType'

export default function Table({ users, setUsers }: PropsType) {

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Calculate the indices for slicing the user data
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total number of pages
  const totalPages = Math.ceil(users.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const deleteUserData = (id: number) => {
    if (setUsers) {
      console.log('deleted')
      setUsers(users.filter((item: UserType) => id !== item.id))
    }
  }

  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<UserType | null>(null);

  const handleEdit = (user: UserType) => {
    setEditId(user.id);
    setEditData(user);
  };

  const handleUpdate = (id: number) => {
    if (editData && setUsers) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...editData } : user
        )
      );
      setEditId(null);
      setEditData(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <h2 className='sub-title'>User Data</h2>
      {
        users.length < 1
          ? <h4 className="my-2 text-sm">'No user data at the moment'</h4>
          : <table className='w-full'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>City</th>
                <th>District</th>
                <th>Province</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                currentUsers.map((user: UserType) => (
                  <tr key={user.id}>
                    {
                      Object.entries(user).filter(([key]) => key !== 'id' && key !== 'profilePic').map(([key, value]) => (
                        editId === user.id ? (
                          <td key={key}>
                            <input
                              type="text"
                              name={key}
                              value={(editData as any)[key]}
                              onChange={handleChange}
                            />
                          </td>
                        ) : (
                          <td key={key}>{value}</td>
                        )
                      ))
                    }
                    <td>
                      {
                        editId === user.id ? (
                          <>
                            <span className="text-green-500 text-xs mr-4" onClick={() => handleUpdate(user.id)}>Save</span>
                            <span className="text-gray-500 text-xs" onClick={() => setEditId(null)}>Cancel</span>
                          </>
                        ) : (
                          <>
                            <span className="text-blue-500 text-xs mr-4" onClick={() => handleEdit(user)}>Edit</span>
                            <span className="text-red-500 text-xs" onClick={() => deleteUserData(user.id)}>Delete</span>
                          </>
                        )
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      }

      {/* pagination */}
      <div className='my-4'>
        <button className='disabled:opacity-30'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button className='disabled:opacity-30'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages  || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  )
}
