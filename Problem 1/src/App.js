import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./home/NavBar";
import DataTable from "./home/UseList";
import TrendingPosts from "./home/Trending";
import UserPost from "./home/Feed";
import HomePage from "./Home";
import "./App.css";
function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/top-users" element={<DataTable />} />
                <Route path="/trending" element={<TrendingPosts/>} />
                <Route path="/feed" element={<UserPost/>} />
            </Routes>
        </Router>
    );
}

export default App;
