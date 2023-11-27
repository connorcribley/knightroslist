// import React, { useState, useEffect } from "react";
import { Navbar } from "./partials/Navbar";
import { Footer } from "./partials/Footer";

const Error = (props) => {
    // const [backendData, setBackendData] = useState([{}]);

    // useEffect(() => {
    //     fetch('/api/err').then(
    //         response => response.json()
    //     ).then(
    //         data => {
    //             setBackendData(data)
    //         }
    //     )
    // }, [])

    return (
        <>
            <html lang="en">

                <body className="d-flex flex-column vh-100">
                    <Navbar />
                    <main className="container mt-5">

                        <div className="row">
                            <div className="col-6 offset-3">
                                <div className="alert alert-danger" role="alert">
                                    <h4 className="alert-heading">404: Not Found</h4>
                                    <p>The requested resource could not be found</p>
                                    {/* {(typeof backendData.err === 'undefined' && typeof backendData.statusCode === 'undefined') ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <>
                                        <h4 className="alert-heading">{err.statusCode}: {err.message}</h4>
                                        <p>{err.stack}</p>
                                        </>
                                    )} */}
                                </div>
                            </div>
                        </div>

                    </main>
                    <Footer />
                </body>
            </html>
        </>
    );
};



export default Error;