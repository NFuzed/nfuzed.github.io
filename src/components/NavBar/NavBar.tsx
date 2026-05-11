import {useState} from "react";
import "./NavBar.css";

const NAV_ITEMS = [
    {id: "about", name: "About"},
    {id: "experience", name: "Experience"},
    {id: "projects", name: "Projects"},
    {id: "skills", name: "Skills"},
    {id: "contact", name: "Contact"},
];

const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({behavior: "smooth"});
};

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavClick = (id: string) => {
        scrollToSection(id);
        setMenuOpen(false);
    };

    return (
        <>
            <header className="nav">
                <nav className="links">
                    <button
                        className="navbar-home-button"
                        onClick={() => handleNavClick("intro")}
                    >
                        Furqan Faruqui
                    </button>

                    {/* Desktop links */}
                    <div className="nav__items">
                        {NAV_ITEMS.map((section, index) => (
                            <button
                                key={section.id}
                                className="navbar-button"
                                onClick={() => handleNavClick(section.id)}
                                style={{animationDelay: `${index * 0.15}s`}}
                            >
                                {section.name}
                            </button>
                        ))}
                    </div>

                    {/* Hamburger (mobile only) */}
                    <button
                        className={`nav__hamburger${menuOpen ? " nav__hamburger--open" : ""}`}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        <span className="nav__hamburger-line"/>
                        <span className="nav__hamburger-line"/>
                        <span className="nav__hamburger-line"/>
                    </button>
                </nav>
            </header>

            {/* Mobile drawer */}
            <div className={`nav__drawer${menuOpen ? " nav__drawer--open" : ""}`}>
                {NAV_ITEMS.map((section) => (
                    <button
                        key={section.id}
                        className="nav__drawer-button"
                        onClick={() => handleNavClick(section.id)}
                    >
                        {section.name}
                    </button>
                ))}
            </div>
        </>
    );
}