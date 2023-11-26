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
        fetch(`/universities/${id}`).then(
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
                        <h1 className="text-center">Edit University</h1>
                            {(typeof backendData.university === 'undefined') ? (
                                <p>Loading...</p>
                            ) : (
                                (!isLoggedIn) ? (
                                    <h4 className="text-center">You must <a href="/login">login</a> to edit a university.</h4>
                                ) : (
                                    (typeof user === 'undefined' || user._id !== backendData.university.author._id) ? (
                                        <h4 className="text-center">You cannot edit a university you did not create!</h4>
                                    ) : (
                                        <>
                                            <div className="col-6 offset-3">
                                                <form action={`/universities/${id}?_method=PUT`} method="POST" novalidate className="needs-validation">

                                                    <div className="mb-3">
                                                        <label className="form-label" for="name">University Name:</label>
                                                        <input className="form-control" type="text" id="name" name="university[name]" defaultValue={backendData.university.name} required />
                                                        <div className="invalid-feedback">
                                                            Please provide the name.
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label" for="location">University Location:</label>
                                                        <input className="form-control" type="text" id="location" name="university[location]" defaultValue={backendData.university.location} required />
                                                        <div className="invalid-feedback">
                                                            Please provide the location.
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label" for="ISTuition">In-State Tuition:</label>
                                                        <div className="input-group">
                                                            <span className="input-group-text" id="ISTuition-label">$</span>
                                                            <input type="text" className="form-control" id="ISTuition" placeholder="0" aria-label="ISTuition"
                                                                aria-describedby="ISTuition-label" name="university[ISTuition]" defaultValue={backendData.university.ISTuition} required />
                                                            <span className="input-group-text">.00</span>
                                                            <div className="invalid-feedback">
                                                                Please provide the in-state tuition.
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label" for="OOSTuition">Out-Of-State Tuition:</label>
                                                        <div className="input-group">
                                                            <span className="input-group-text" id="OOSTuition-label">$</span>
                                                            <input type="text" className="form-control" id="ISTuition" placeholder="0" aria-label="OOSTuition"
                                                                aria-describedby="OOSTuition-label" name="university[OOSTuition]" defaultValue={backendData.university.OOSTuition} required />
                                                            <span className="input-group-text">.00</span>
                                                            <div className="invalid-feedback">
                                                                Please provide the out-of-state tuition.
                                                            </div>
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
                                                        <button className="btn btn-info">Update University</button>
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