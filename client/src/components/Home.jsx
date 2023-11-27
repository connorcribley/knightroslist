import { Navbar } from "./partials/Navbar";
import { Footer } from "./partials/Footer";
import Background from "./ucf1.png"

const Home = (props) => {


    return (
        <html lang="en">
        
            <div id="intro">
            <div id="overlay" style={{background: 'rgba(0, 0, 0, 0.2)'}}>
                <body style={{display: 'table', padding: 'table', backgroundImage: "url(" + Background + ")", backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundColor:"rgb(255,215,0)"}} className="d-flex flex-column vh-100">
                    <Navbar />
                    
                    <main className="container mt-5">
                    
                        <main className="text-center align-self-end" style={{background: "content-box black", outlineStyle:"groove", outlineColor:"black", textAlign:"center",blockSize:"105%"}}>
                            <h1 style={{border:"solid", borderBlockColor:"black",background:"yellow", justifyContent:"center"}}>Welcome to Knightro's List!</h1>
                            <a href="/universities" style={{}} className="btn btn-lg btn-secondary text-secondary fw-bold bg-white">Check Out Popular Locations</a>
                        </main>

                    </main>
                    
                    <Footer />
                </body>
                </div>
            </div>
        </html>
    );
};

export default Home;