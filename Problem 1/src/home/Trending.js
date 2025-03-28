import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";

export default function TrendingPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/posts")
            .then(response => response.json())
            .then(data => {
                const sortedPosts = data.sort((a, b) => {
                    const scoreA = (a.likes * 2) + (a.comments * 3) + (a.shares * 5);
                    const scoreB = (b.likes * 2) + (b.comments * 3) + (b.shares * 5);
                    return scoreB - scoreA; 
                });
                setPosts(sortedPosts);
            })
            .catch(error => console.error("Error fetching posts:", error));
    }, []);

    return (
        <div className="table-container">
            <h2>Trending Posts</h2>
            <TableContainer component={Paper} className="full-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Rank</b></TableCell>
                            <TableCell><b>Title</b></TableCell>
                            <TableCell><b>Content</b></TableCell>
                            <TableCell><b>Posted On</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post, index) => (
                            <TableRow key={post.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.content}</TableCell>
                                <TableCell>{new Date(post.date).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
