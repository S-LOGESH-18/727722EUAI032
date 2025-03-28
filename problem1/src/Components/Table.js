import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField
} from "@mui/material";
import "../App.css"; 

export default function DataTable() {
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editedUser, setEditedUser] = useState({ id: "", name: "", age: "" });
    const [newUser, setNewUser] = useState({ name: "", age: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch("http://localhost:8080/api/users")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching data:", error));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/users/${id}`, { method: "DELETE" })
            .then(() => fetchUsers())
            .catch(error => console.error("Error deleting user:", error));
    };

    const handleEdit = (user) => {
        setEditMode(user.id);
        setEditedUser(user);
    };

    const handleSave = () => {
        fetch(`http://localhost:8080/api/users/${editedUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedUser)
        })
        .then(() => {
            setEditMode(null);
            fetchUsers();
        })
        .catch(error => console.error("Error updating user:", error));
    };

    const handleCreate = () => {
        if (!newUser.name || !newUser.age) {
            alert("Please enter both name and age.");
            return;
        }

        fetch("http://localhost:8080/api/users/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        .then(() => {
            setNewUser({ name: "", age: "" });
            fetchUsers();
        })
        .catch(error => console.error("Error creating user:", error));
    };

    return (
        <div className="table-container">
            <div className="create-user">
                <TextField
                    label="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    style={{ marginRight: "10px" }}
                />
                <TextField
                    label="Age"
                    type="number"
                    value={newUser.age}
                    onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                    style={{ marginRight: "10px" }}
                />
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Add User
                </Button>
            </div>

            <TableContainer component={Paper} className="full-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {editMode === row.id ? (
                                        <TextField
                                            value={editedUser.name}
                                            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                        />
                                    ) : (
                                        row.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editMode === row.id ? (
                                        <TextField
                                            type="number"
                                            value={editedUser.age}
                                            onChange={(e) => setEditedUser({ ...editedUser, age: e.target.value })}
                                        />
                                    ) : (
                                        row.age
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editMode === row.id ? (
                                        <Button variant="contained" color="primary" onClick={handleSave}>
                                            Save
                                        </Button>
                                    ) : (
                                        <Button variant="contained" color="secondary" onClick={() => handleEdit(row)}>
                                            Edit
                                        </Button>
                                    )}
                                    <Button variant="contained" color="error" onClick={() => handleDelete(row.id)} style={{ marginLeft: "10px" }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
