import React from "react";
import { useNavigate } from "react-router-dom";
import "../../frontend/src/home/Home.css";
export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Welcome to Our Platform</h1>
            <div className="cards-container">
                <div className="card">
                    <img src="https://images.freeimages.com/365/images/previews/990/3d-icons-5-vector-2529.jpg" alt="Top Users" />
                    <div className="card-content">
                        <h2>Top Users</h2>
                        <p>Discover the most active users with the highest posts and engagement.</p>
                        <button onClick={() => navigate("/top-users")}>View Users</button>
                    </div>
                </div>
                <div className="card">
                    <img src="https://png.pngtree.com/png-clipart/20200225/original/pngtree-trending-topic-vector-logo-icon-or-symbol-set-png-image_5304011.jpg" alt="Trending Posts" />
                    <div className="card-content">
                        <h2>Trending Posts</h2>
                        <p>Explore the latest trending posts and discussions happening right now.</p>
                        <button onClick={() => navigate("/trending")}>View Posts</button>
                    </div>
                </div>
                <div className="card">
                    <img src="https://cdn2.iconfinder.com/data/icons/viral-trending-illustration/3000/Viral-20-512.png" alt="Feed" />
                    <div className="card-content">
                        <h2>Feed</h2>
                        <p>Stay updated with the latest posts from users in real-time.</p>
                        <button onClick={() => navigate("/feed")}>View Feed</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
