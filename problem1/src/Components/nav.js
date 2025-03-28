import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./App.css";

export default function NavBar() {
    return (
        <AppBar position="static" className="navbar">
            <Toolbar>
                <Typography variant="h6" className="logo">
                    AffordMed Tecnologies
                </Typography>

                
                <div className="nav-links">
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Services</Button>
                    <Button color="inherit">Contact</Button>
                    <Button color="success" variant="contained">Logout</Button>
                </div>

                 <IconButton edge="end" color="inherit" className="menu-button">
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}