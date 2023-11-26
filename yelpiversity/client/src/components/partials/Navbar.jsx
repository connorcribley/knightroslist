import React, { useState, useEffect } from "react";

export const Navbar = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Fetch user authentication status from Express endpoint
        fetch('/api/check-authentication')
            .then((response) => response.json())
            .then((data) => {
                // Update state based on authentication status
                setIsLoggedIn(data.isLoggedIn);
            })
            .catch((error) => {
                // Handle errors
                console.error('Error checking authentication:', error);
            });
    }, []);

    return (
        <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Knightro's List</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" href="/universities">Locations</a>
                        <a className="nav-link" href="/universities/new">New Location</a>
                    </div>
                    <div className="navbar-nav ms-auto">
                        {!isLoggedIn ? (
                            <>
                                <a className="nav-link" href="/login">Login</a>
                                <a className="nav-link" href="/register">Register</a>
                            </>
                        ) : (
                            <form action="/logout" method="POST">
                                <button className="nav-link">Logout</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
