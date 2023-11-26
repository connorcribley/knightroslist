import { Navbar } from "./partials/Navbar";
import { Footer } from "./partials/Footer";

const Home = (props) => {


    return (
        <html lang="en">

            <body className="d-flex flex-column vh-100">
                <Navbar />
                <main className="container mt-5">

                    <main className="text-center align-self-end">
                        <h1 className="fw-bold">Welcome to Yelpiversity!</h1>
                        <a href="/universities" className="btn btn-lg btn-secondary text-secondary fw-bold bg-white">Go to Universities</a>
                    </main>

                </main>
                <Footer />
            </body>
        </html>
    );
};

export default Home;