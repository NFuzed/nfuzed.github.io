import React from "react";
import Hero from "./sections/hero";
import Navbar from "./components/navbar";

function App(){
    return (
        <>
            <Navbar />
            <main>
                <Hero />
            </main>
        </>
    )
}

export default App;