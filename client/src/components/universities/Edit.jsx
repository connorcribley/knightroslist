import React, { useState, useEffect } from "react";
import { Navbar } from "../partials/Navbar";
import { Footer } from "../partials/Footer";
import { useParams } from 'react-router-dom';

const Edit = (props) => {
    const [backendData, setBackendData] = useState([{}]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetch(`/universities/${id}/api`).then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        ).catch((error) => {
            console.error('Error fetching university data:', error);
        });
        // Fetch user authentication status from Express endpoint
        fetch('/api/check-authentication')
            .then((response) => response.json())
            .then((data) => {
                // Update state based on authentication status
                setIsLoggedIn(data.isLoggedIn);
                if (isLoggedIn) setUser(data.user);
            })
            .catch((error) => {
                // Handle errors
                console.error('Error checking authentication:', error);
            });
    });

    return (
        <>
            <html lang="en">

                <body className="d-flex flex-column vh-100">
                    <Navbar />
                    <main className="container mt-5">

                        <div className="row">
                        <h1 className="text-center">Edit Location</h1>
                            {(typeof backendData.university === 'undefined') ? (
                                <p>Loading...</p>
                            ) : (
                                (!isLoggedIn) ? (
                                    <h4 className="text-center">You must <a href="/login">login</a> to edit a university.</h4>
                                ) : (
                                    (typeof user === 'undefined' || user._id !== backendData.university.author._id) ? (
                                        <h4 className="text-center">You cannot edit a location you did not create!</h4>
                                    ) : (
                                        <>
                                            <div className="col-6 offset-3">
                                                <form action={`/universities/${id}?_method=PUT`} method="POST" novalidate className="needs-validation">

                                                    <div className="mb-3">
                                                        <label className="form-label" for="name">Location Name:</label>
                                                        <input className="form-control" type="text" id="name" name="university[name]" defaultValue={backendData.university.name} required />
                                                        <div className="invalid-feedback">
                                                            Please provide the name.
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label" for="location">Location Type:</label>
                                                        <input className="form-control" type="text" id="location" name="university[location]" defaultValue={backendData.university.location} required />
                                                        <div className="invalid-feedback">
                                                            Please provide the location type .
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label" for="image">Image URL:</label>
                                                        <input className="form-control" type="text" id="image" name="university[image]" defaultValue={backendData.university.image} required />
                                                        <div className="invalid-feedback">
                                                            Please provide an image URL.
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label" for="description">Description:</label>
                                                        <textarea className="form-control" type="text" id="description" name="university[description]" required>
                                                            {backendData.university.description}
                                                        </textarea>
                                                        <div className="invalid-feedback">
                                                            Please provide a description.
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <button className="btn btn-info">Update Location</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </>
                                    )
                                )
                            )}
                        </div>

                    </main>
                    <Footer />
                </body>
            </html>

        </>
    );
};

export default Edit;