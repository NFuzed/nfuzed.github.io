import {useEffect, useRef, useState} from "react";
import "./Contact.css";

const LINKS = [
    {
        label: "Email",
        value: "furqanfaruqui@gmail.com",
        href: "mailto:furqanfaruqui@gmail.com",
        display: "furqanfaruqui@gmail.com",
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/furqan-faruqui",
        href: "https://www.linkedin.com/in/furqan-faruqui",
        display: "/in/furqan-faruqui",
    },
    {
        label: "GitHub",
        value: "github.com/nfuzed",
        href: "https://github.com/nfuzed",
        display: "github.com/nfuzed",
    },
];

function useInView(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    obs.disconnect();
                }
            },
            {threshold}
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return {ref, inView};
}

export default function Contact() {
    const {ref, inView} = useInView(0.1);
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText("furqanfaruqui@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            ref={ref}
            className={`contact${inView ? " contact--visible" : ""}`}
            id="contact"
        >
            <div className="contact__inner">

                {/* ── Big CTA heading ── */}
                <div className="contact__cta">
                    <div className="contact__section-label">
                        <span className="contact__label-line"/>
                        <span>Contact</span>
                    </div>
                    <h2 className="contact__heading">
                        Let's work<br/>
                        <span className="contact__heading-accent">together.</span>
                    </h2>
                    <p className="contact__sub">
                        Open to full-time roles, freelance projects, and research collaborations.
                        Based in London — happy to work remotely.
                    </p>

                    <button className="contact__email-btn" onClick={copyEmail}>
                        <span className="contact__email-addr">furqanfaruqui@gmail.com</span>
                        <span className="contact__email-action">
              {copied ? "✓ copied" : "copy"}
            </span>
                    </button>
                </div>

                {/* ── Links ── */}
                <div className="contact__links">
                    {LINKS.map((l, i) => (
                        <a
                            key={l.label}
                            href={l.href}
                            target={l.label !== "Email" ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="contact__link"
                            style={{animationDelay: `${0.2 + i * 0.1}s`}}
                        >
                            <div className="contact__link-left">
                                <span className="contact__link-label">{l.label}</span>
                                <span className="contact__link-value">{l.display}</span>
                            </div>
                            <span className="contact__link-arrow">↗</span>
                        </a>
                    ))}
                </div>

            </div>

            {/* ── Footer ── */}
            <footer className="contact__footer">
                <span className="contact__footer-name">Furqan Faruqui</span>
                <span className="contact__footer-copy">
          Built with React · {new Date().getFullYear()}
        </span>
            </footer>
        </section>
    );
}