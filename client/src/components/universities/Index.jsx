import React, { useState, useEffect } from "react";
import { Navbar } from "../partials/Navbar";
import { Footer } from "../partials/Footer";


const Index = (props) => {

    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch("/universities/api").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, [])


    return (
        <>
            <html lang="en">

                <body className="d-flex flex-column vh-100">
                    <Navbar />
                    <main className="container mt-5">

                        <h1>Popular Locations on Campus</h1>
                        {(typeof backendData.universities === 'undefined') ? (
                            <p>Loading...</p>
                        ) : (
                            backendData.universities.map((location, i) => (
                                <div key={i} className="card mb-3">
                                    <div key={i} className="row">
                                        <div key={i} className="col-md-4">
                                            <img key={i} src={location.image} alt="" className="img-fluid" />
                                        </div>
                                        <div key={i} className="col-md-8">
                                            <div key={i} className="card-body">
                                                <h5 key={i} className="card-title">{location.name}</h5>
                                                <p key={i} className="card-text">{location.description}</p>
                                                <p key={i} className="card-text">
                                                    <small key={i} className="text-secondary">{location.location}</small>
                                                </p>
                                                <a key={i} href={`/universities/${location._id}`} className="btn btn-primary">View {location.name}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </main>
                    <Footer />
                </body>
            </html>
        </>
    );
};

export default Index;