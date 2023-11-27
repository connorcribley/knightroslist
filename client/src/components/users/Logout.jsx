import { Navbar } from "../partials/Navbar";
import { Footer } from "../partials/Footer";

const Logout = (props) => {
    return (
        <>
            <html lang="en">

                <body className="d-flex flex-column vh-100">
                    <Navbar />
                    <main className="container mt-5">
                        
                        <h2 className="text-center">You have logged out. Goodbye!</h2>

                    </main>
                    <Footer />
                </body>
            </html>
        </>
    );
};

export default Logout;