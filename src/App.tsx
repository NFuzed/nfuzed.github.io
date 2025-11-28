import React from "react";
import Hero from "./sections/hero";
import Navbar from "./components/navbar";
import Projects from "./sections/projects/Projects.tsx";

function App(){
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Projects/>
            </main>
        </>
    )
}

export default App;