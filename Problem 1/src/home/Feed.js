import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";

export default function UserPost() {
    const [posts, setPosts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(""); 
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/Posts") 
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            })
            .catch(error => console.error("Error fetching posts:", error));
    }, []);

    // Extract unique user IDs from posts
    const uniqueUserIds = [...new Set(posts.map(post => post.userid))];

    // Handle user selection
    const handleUserChange = (event) => {
        const userId = event.target.value;
        setSelectedUser(userId);
        setFilteredPosts(posts.filter(post => post.userid === userId)); 
    };

    return (
        <div className="table-container">
            <h2>User Posts</h2>
            
            {/* User selection dropdown */}
            <FormControl style={{ marginBottom: "20px", width: "200px" }}>
                <InputLabel>Select User</InputLabel>
                <Select value={selectedUser} onChange={handleUserChange}>
                    {uniqueUserIds.map(userId => (
                        <MenuItem key={userId} value={userId}>User {userId}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Posts Table */}
            <TableContainer component={Paper} className="full-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>User ID</b></TableCell>
                            <TableCell><b>Content</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPosts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.id}</TableCell>
                                <TableCell>{post.userid}</TableCell>
                                <TableCell>{post.content}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
