import { Navbar } from "../partials/Navbar";
import { Footer } from "../partials/Footer";

const Register = (props) => {
    return (
        <>
            <html lang="en">

                <body className="d-flex flex-column vh-100">
                    <Navbar />
                    <main className="container mt-5">

                        <h1>Register</h1>
                        <form action="/register" method="POST" className="needs-validation" novalidate>

                            <div className="mb-3">
                                <label className="form-label" for="username">Username:</label>
                                <input className="form-control" type="text" id="username" name="username" required />
                                <div className="invalid-feedback">
                                    Please enter a valid username.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" for="email">Email:</label>
                                <input className="form-control" type="email" id="email" name="email" required />
                                <div className="invalid-feedback">
                                    Please enter a valid email.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" for="password">Password:</label>
                                <input className="form-control" type="password" id="password" name="password" required />
                                <div className="invalid-feedback">
                                    Please enter a valid password.
                                </div>
                            </div>
                            <button className="btn btn-success">Register</button>
                        </form>

                    </main>
                    <Footer />
                </body>
            </html>
        </>
    );
};



export default Register;