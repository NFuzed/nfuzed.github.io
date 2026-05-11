import "./NavBar.css";

const NAVITEMS = [
    {
        id: "about",
        name: "About",
        reference: "about"
    }, {
        id: "experience",
        name: "Experience",
        reference: "experience"
    }, {
        id: "projects",
        name: "Projects",
        reference: "projects"
    }, {
        id: "skills",
        name: "Skills",
        reference: "skills"
    }, {
        id: "contact",
        name: "Contact",
        reference: "contact"
    }
];

const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({behavior: "smooth"});
};

export default function NavBar() {
    return (
        <header className="nav">
            <nav className="links">
                <button className="navbar-home-button" onClick={() => scrollTo("intro")}>
                    Furqan Faruqui
                </button>

                {NAVITEMS.map((section) => (
                    <button
                        key={section.id}
                        className="navbar-button"
                        onClick={() => scrollTo(section.id)}
                        style={{animationDelay: `${NAVITEMS.indexOf(section) * 0.15}s`}}
                    >
                        {section.name}
                    </button>
                ))}
            </nav>
        </header>);
}