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

            {/* <div id="intro">
            <div id="overlay" style={{background: 'rgba(0, 0, 0, 0.2)'}}>
                <body style={{display: 'table', padding: 'table', backgroundImage: "url(" + Background + ")", backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundColor:"rgb(255,215,0)"}} className="d-flex flex-column vh-100">
                    <Navbar />
                    
                    <main className="container mt-5">
                    
                        <main className="text-center align-self-end" style={{background: "content-box black", outlineStyle:"groove", outlineColor:"black", textAlign:"center",blockSize:"105%"}}>
                            <h1 style={{border:"solid", borderBlockColor:"black",background:"yellow", justifyContent:"center"}}>Welcome to Knightro's List!</h1>
                            <a href="/universities" style={{}} className="btn btn-lg btn-secondary text-secondary fw-bold text-white bg-white">Check Out Popular Locations</a>
                        </main>

                    </main>
                    
                    <Footer />
                </body>
                </div>
            </div> */}
        </html>
    );
};

export default Home;