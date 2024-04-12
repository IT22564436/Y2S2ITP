import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./displayuser.css"; // Import your CSS file
import Swal from 'sweetalert2';

function Staff() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8175/user/staffdetails')
            .then(result => {
                console.log(result.data);
                setUsers(result.data.users || []);
            })
            .catch(err => console.log(err));
    }, []);
    
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleDelete = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Should you delete this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8175/user/deleteUser/${userId}`)
                    .then(() => {
                        setUsers(users.filter((user) => user._id !== userId));
                        Swal.fire({
                            title: "Deleted!",
                            text: "User deleted successfully.",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        console.error('Error deleting user:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete user. Please try again later.",
                            icon: "error"
                        });
                    });
            }
        });
    };
    

    return (
        <div className="container-fluid">
        {/* Add card-container class */}
        <div className="card-body">
            <Link to="/usercreate" className='btn btn-success btn-add'>Add +</Link> {/* Add btn-add class */}
            <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearch}
                className="form-control mt-3"
            />
            <p className='btn total-users'>Total Users: {users.length}</p> {/* Add total-users class */}

            <div style={{ overflowX: 'auto' }}> {/* Add style for horizontal scrolling */}
                <table className="table mt-3">
                    <thead className="thead-dark table-header"> {/* Add table-header class */}
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Number</th>
                            <th>Image</th> {/* Correct typo: 'image' to 'Image' */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.number}</td>
                                    <td><img src={user.image} alt="User" /></td>
                                    <td>
                                        <Link to={`/userupdate/${user._id}`} className='btn btn-success'>Update</Link>
                                        <button className='btn btn-danger ml-2' onClick={(e)=>handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}

export default Staff;