import Intro from "./pages/Intro/Intro";
import About from "./pages/About/About.tsx";
import Experience from "./pages/Experience/Experience.tsx";
import Projects from "./pages/Projects/Projects.tsx";
import Skills from "./pages/Skills/Skills.tsx";
import Contact from "./pages/Contact/Contact.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import "./App.css";

export default function App() {

    return (
        <>
            <NavBar/>
            <main className="page" id="page">
                <Intro/>
                <About/>
                <Experience/>
                <Projects/>
                <Skills/>
                <Contact/>
            </main>
        </>
    );
}
