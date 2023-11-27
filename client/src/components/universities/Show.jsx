import React, { useState, useEffect } from "react";
import { Navbar } from "../partials/Navbar";
import { Footer } from "../partials/Footer";
import { useParams } from 'react-router-dom';
import "./starability.css";

const Show = (props) => {
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
                            <div className="col-lg-6">
                                {(typeof backendData.university === 'undefined') ? (
                                    <p>Loading...</p>
                                ) : (
                                    <div className="card mb-3">
                                        <img className="card-img-top" src={backendData.university.image} alt={`${backendData.university.name}`} />
                                        <div className="card-body">
                                            <h5 className="card-title text-bold">{backendData.university.name}</h5>
                                            <p className="card-text">{backendData.university.description}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item text-secondary">{backendData.university.location}</li>
                                        </ul>
                                        {(isLoggedIn && typeof user !== 'undefined' && user._id === backendData.university.author._id) ? (
                                            <div className="card-body">
                                                <a href={`/universities/${id}/edit`} className="card-link btn btn-info mx-1">Edit</a>
                                                <form className="d-inline" action={`/universities/${id}?_method=DELETE`} method="POST">
                                                    <button className="btn btn-danger mx-1">Delete</button>
                                                </form>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        <div className="card-footer text-secondary">
                                            Submitted by: {backendData.university.author.username}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-6">
                                {(isLoggedIn) ? (
                                    (typeof backendData.university === 'undefined') ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <>
                                            <h2 className="text-center">Leave a Review</h2>
                                            <hr />
                                            <form action={`/universities/${id}/reviews`} method="POST" className="mb-3 needs-validation" novalidate>
                                                <div className="mb-3">
                                                    <fieldset className="starability-coinFlip">
                                                        <legend>Rating:</legend>
                                                        <input type="radio" id="no-rate" className="input-no-rate" name="review[rating]" value="1" defaultChecked aria-label="No rating." />
                                                        <input type="radio" id="first-rate1" name="review[rating]" value="1" />
                                                        <label for="first-rate1" title="Terrible">1 star</label>
                                                        <input type="radio" id="first-rate2" name="review[rating]" value="2" />
                                                        <label for="first-rate2" title="Not good">2 stars</label>
                                                        <input type="radio" id="first-rate3" name="review[rating]" value="3" />
                                                        <label for="first-rate3" title="Average">3 stars</label>
                                                        <input type="radio" id="first-rate4" name="review[rating]" value="4" />
                                                        <label for="first-rate4" title="Very good">4 stars</label>
                                                        <input type="radio" id="first-rate5" name="review[rating]" value="5" />
                                                        <label for="first-rate5" title="Amazing">5 stars</label>
                                                    </fieldset>
                                                </div>
                                                <div className="mb-3">
                                                    {/* <!-- <label className="form-label" for="body">Review</label> --> */}
                                                    <textarea className="form-control" name="review[body]" id="body" placeholder="Write a review here!" cols="30" rows="3" required></textarea>
                                                    <div className="invalid-feedback">
                                                        Review cannot be blank.
                                                    </div>
                                                </div>
                                                <button className="btn btn-success">Submit</button>
                                            </form>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <h2 className="text-center">Reviews</h2>
                                        <hr />
                                    </>
                                )}
                                {(typeof backendData.university === 'undefined') ? (
                                    <p>Loading...</p>
                                ) : (
                                    (typeof backendData.university.reviews === 'undefined') ? (
                                        <p>Loading...</p>
                                    ) : (backendData.university.reviews.map((review, i) => (
                                        <div key={i} className="card mb-3">
                                            <div key={i} className="card-body">
                                                <h5 key={i} className="card-title text-bold">{review.author.username}</h5>
                                                <p key={i} className="starability-result" data-rating={`${review.rating}`}>
                                                    Rated: {review.rating} stars
                                                </p>
                                                <p key={i} className="card-text">{review.body}</p>
                                                {(isLoggedIn && typeof user !== 'undefined' && user._id === review.author._id) ? (
                                                    <form key={i} action={`${id}/reviews/${review._id}?_method=DELETE`} method="POST">
                                                        <button key={i} className="btn btn-sm btn-danger">Delete</button>
                                                    </form>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    )))
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

export default Show