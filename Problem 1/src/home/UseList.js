import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import "../App.css"; 

export default function DataTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:4000/users");
            const data = await response.json();

            // Convert object to array of { id, name }
            const usersArray = Object.entries(data).map(([id, name]) => ({
                id,
                name
            }));

            setUsers(usersArray);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="table-container">
            <TableContainer component={Paper} className="full-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
