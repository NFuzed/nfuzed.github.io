import {useEffect, useRef, useState} from "react";
import "./Skills.css";

const SKILL_GROUPS = [
    {
        id: "languages",
        label: "Languages",
        skills: ["Python", "Java", "C++", "Kotlin", "SQL", "Bash", "Lua", "Rust"],
    },
    {
        id: "ml",
        label: "ML & Vision",
        skills: ["PyTorch", "TensorFlow", "OpenCV", "Scikit-learn", "Faster R-CNN", "CLIP", "Tesseract OCR",
            "MCMC Sampling", "Bayesian Inference"],
    },
    {
        id: "frameworks",
        label: "Frameworks & Libraries",
        skills: ["ReactJS", "JavaFX", "Spring Boot", "Pandas", "NumPy", "Matplotlib", "PySide6", "Mockito"],
    },
    {
        id: "infra",
        label: "Infrastructure & Tools",
        skills: ["Docker", "Jenkins", "Git", "PostgreSQL", "RabbitMQ", "WebSockets", "REST APIs", "Jira"],
    },
];

const CERTS = [
    {title: "Azure Fundamentals", issuer: "Microsoft"},
    {title: "ReactJS: Zero to Hero", issuer: "Online"},
    {title: "PCEP — Certified Entry-Level Python Programmer", issuer: "Python Institute"},
    {title: "Software Development Bootcamp — Level 3", issuer: "QA Ltd"},
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

export default function Skills() {
    const {ref, inView} = useInView(0.05);

    return (
        <section
            ref={ref}
            className={`skills${inView ? " skills--visible" : ""}`}
            id="skills"
        >
            <div className="skills__inner">

                {/* ── Header ── */}
                <div className="skills__header">
                    <div className="skills__section-label">
                        <span className="skills__label-line"/>
                        <span>Skills</span>
                    </div>
                    <h2 className="skills__heading">The toolbox.</h2>
                </div>

                {/* ── Skill groups ── */}
                <div className="skills__groups">
                    {SKILL_GROUPS.map((group, i) => (
                        <div
                            key={group.id}
                            className="skills__group"
                            style={{animationDelay: `${i * 0.1}s`}}
                        >
                            <div className="skills__group-label">{group.label}</div>
                            <div className="skills__chips">
                                {group.skills.map((s, j) => (
                                    <span
                                        key={s}
                                        className="skills__chip"
                                        style={{animationDelay: `${i * 0.1 + j * 0.04}s`}}
                                    >
                    {s}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Divider ── */}
                <div className="skills__divider"/>

                {/* ── Certifications ── */}
                <div className="skills__certs-header">
                    <div className="skills__section-label">
                        <span className="skills__label-line"/>
                        <span>Certifications</span>
                    </div>
                </div>

                <div className="skills__certs">
                    {CERTS.map((c, i) => (
                        <div
                            key={c.title}
                            className="skills__cert"
                            style={{animationDelay: `${0.4 + i * 0.08}s`}}
                        >
                            <span className="skills__cert-dot" aria-hidden="true"/>
                            <div className="skills__cert-body">
                                <span className="skills__cert-title">{c.title}</span>
                                <span className="skills__cert-issuer">{c.issuer}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}