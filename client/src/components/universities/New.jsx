import React, { useState, useEffect } from "react";
import { Navbar } from "../partials/Navbar";
import { Footer } from "../partials/Footer";

const New = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Check to see if the user is logged in
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
        <>
            <html lang="en">

                <body className="d-flex flex-column vh-100">
                    <Navbar />
                    <main className="container mt-5">

                        <div className="row">
                            <h1 className="text-center">New Location</h1>
                            <div className="col-6 offset-3">
                                {!isLoggedIn ? (
                                    <h4 className="text-center">You must <a href="/login">login</a> to create new login!</h4>
                                ) : (
                                    <form action="/universities" method="POST" novalidate className="needs-validation">
                                        <div className="mb-3">
                                            <label className="form-label" for="name">Location Name:</label>
                                            <input className="form-control" type="text" id="name" name="university[name]" required />
                                            <div className="invalid-feedback">
                                                Please provide the name.
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" for="location">Location Type:</label>
                                            <input className="form-control" type="text" id="location" name="university[location]" required />
                                            <div className="invalid-feedback">
                                                Please provide the location type.
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" for="image">Image URL:</label>
                                            <input className="form-control" type="text" id="image" name="university[image]" required />
                                            <div className="invalid-feedback">
                                                Please provide an image URL.
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" for="description">Description:</label>
                                            <textarea className="form-control" type="text" id="description" name="university[description]" required></textarea>
                                            <div className="invalid-feedback">
                                                Please provide a description.
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <button className="btn btn-success">Add Location</button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                    </main>
                    <Footer />
                </body>
            </html>




        </>
    );
};

export default New;