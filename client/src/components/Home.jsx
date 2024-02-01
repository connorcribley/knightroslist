import { Navbar } from "./partials/Navbar";
import { Footer } from "./partials/Footer";
import "./Home.css";
import Background from "./ucf1.png"

const Home = (props) => {


    return (
        <html lang="en">
            <Navbar />
            <body className="d-flex text-center text-white bg-dark home-body">
                <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column justify-content-center">
                    <main className="px-3 main-home m rounded">
                        <h1 className="mt-2">Knightro's List</h1>
                        <p className="lead">Explore popular locations at the University of Central Florida!</p>
                        <a href="/universities" className="btn btn-lg btn-secondary font-weight-bold text-dark bg-light mb-3">View Locations</a>
                    </main>
                </div>
            </body>
            <Footer />
        </html>
    );
};

export default Home;