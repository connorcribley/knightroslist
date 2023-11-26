import { Navbar } from "../partials/Navbar";
import { Footer } from "../partials/Footer";


const Login = (props) => {
    return (
        <>
            <html lang="en">

                <body className="d-flex flex-column vh-100">
                    <Navbar />
                    <main className="container mt-5">

                        <h1>Login</h1>
                        <form action="/login" method="POST" className="needs-validation" novalidate>

                            <div className="mb-3">
                                <label className="form-label" for="username">Username:</label>
                                <input className="form-control" type="text" id="username" name="username" required />
                                <div className="invalid-feedback">
                                    Please enter a valid username.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" for="password">Password:</label>
                                <input className="form-control" type="password" id="password" name="password" required />
                                <div className="invalid-feedback">
                                    Please enter a valid password.
                                </div>
                            </div>
                            <button className="btn btn-success">Login</button>
                        </form>

                    </main>
                    <Footer />
                </body>
            </html>
        </>
    );
};



export default Login;