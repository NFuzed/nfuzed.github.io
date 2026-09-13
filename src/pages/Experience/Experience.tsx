import {useEffect, useRef, useState} from "react";
import "./Experience.css";

const EXPERIENCE = [
    {
        id: "oxford-research",
        company: "University of Oxford · Google Deepmind",
        role: "Research Software Engineer",
        period: "Jul 2026 — Present",
        tag: "Current",
        location: "Oxford, UK",
        highlights: [
            /*

•
•
             */
            "Designing and implementing a Bayesian inference engine in Rust for computational biology applications.",
            "Implementing core probabilistic inference methods from first principles at the systems level.",
            "Selected as part of a competitive research-readiness cohort jointly run by Oxford and Google DeepMind.",
            "This project is still ongoing, however some samplers have been validated against distributions with known " +
            "answers, then timed them against Python.",
            "The data used was a regression model with 10 points. Both Rust and Python samplers ran 40 chains with a " +
            "chain size of 20,000. The processing time for Python was 3139.2ms and Rust at 261.8ms. The same sampler " +
            "ran 12x faster in Rust than in Python.",
        ],
        stack: ["Python", "Rust", "Statistics", "Bayes' Theorem", "Git"],
    },
    {
        id: "sopra-se",
        company: "Sopra Steria · Graffica",
        role: "Software Engineer",
        period: "Jan 2025 — Jul 2026",
        location: "London, UK",
        highlights: [
            "Trained a Tesseract OCR model and implemented symbol detection for GSDR, cutting schematic parsing time from hours to 10 minutes with 95% accuracy.",
            "Automated detection and approval of graph styling changes in integration tests, saving 2–3 hours per week of QA overhead.",
            "Led code reviews and mentored junior developers, reducing review turnaround from 2 days to under 1 day.",
            "Migrated project dependency management from Artifactory to Git, aligning with DevOps standards and reducing tooling overhead.",
        ],
        stack: ["Python", "Tesseract OCR", "Jenkins", "Java", "Git"],
    },
    {
        id: "sopra-jse",
        company: "Sopra Steria · Graffica",
        role: "Junior Software Engineer",
        period: "Mar 2023 — Dec 2024",
        location: "London, UK",
        tag: null,
        highlights: [
            "Built core features for HERMES, a nationwide rail simulation platform supporting multimillion-pound UK infrastructure assessments.",
            "Collaborated with engineers and analysts through Jira and Agile sprints to triage issues and implement high-priority simulation features.",
            "Completed ReactJS: Zero to Hero, expanding front-end capability across the full stack.",
        ],
        stack: ["Java", "JavaFX", "SQLite", "CSS", "Mockito", "Jira"],
    },
    {
        id: "qa",
        company: "QA Ltd",
        role: "Apprentice Software Engineer",
        period: "Jun 2022 — Aug 2022",
        location: "London, UK (Remote)",
        tag: null,
        highlights: [
            "Completed a Level 3 Apprenticeship with hands-on back-end development experience.",
            "Built an allergen management system serving 5,000 users, handling data input, storage, and retrieval.",
            "Gained expertise in Java, Spring Boot, Agile methodologies, Azure Cloud fundamentals, and SQL databases.",
        ],
        stack: ["Java", "Spring Boot", "SQL", "Azure"],
    }, {
        id: "starbucks",
        company: "Welcome Break · Starbucks",
        role: "Barista",
        period: "Mar 2021 - Aug 2022",
        location: "London, UK",
        tag: null,
        highlights: [
            "Served Coffee. I was the best.",
            "Starbucks could not have done it without me.",
        ],
        stack: ["Java (coffee haha)"],
    }
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

export default function Experience() {
    const {ref, inView} = useInView(0.05);
    const [active, setActive] = useState<string | null>(null);

    return (
        <section
            ref={ref}
            className={`exp${inView ? " exp--visible" : ""}`}
            id="experience"
        >
            <div className="exp__inner">

                {/* ── Header ── */}
                <div className="exp__header">
                    <div className="exp__section-label">
                        <span className="exp__label-line"/>
                        <span>Experience</span>
                    </div>
                    <h2 className="exp__heading">Where I've shipped.</h2>
                </div>

                {/* ── Timeline ── */}
                <div className="exp__timeline">
                    <div className="exp__timeline-rail"/>

                    {EXPERIENCE.map((job, i) => (
                        <div
                            key={job.id}
                            className={`exp__item${active === job.id ? " exp__item--open" : ""}`}
                            style={{animationDelay: `${i * 0.15}s`}}
                        >
                            {/* Timeline dot */}
                            <div className="exp__dot">
                                <div className="exp__dot-inner"/>
                            </div>

                            {/* Card */}
                            <div
                                className="exp__card"
                                onClick={() => setActive(active === job.id ? null : job.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === "Enter" && setActive(active === job.id ? null : job.id)}
                                aria-expanded={active === job.id}
                            >
                                <div className="exp__card-top">
                                    <div className="exp__card-meta">
                                        <div className="exp__card-title-row">
                                            <span className="exp__role">{job.role}</span>
                                            {job.tag && <span className="exp__tag">{job.tag}</span>}
                                        </div>
                                        <span className="exp__company">{job.company}</span>
                                    </div>
                                    <div className="exp__card-right">
                                        <span className="exp__period">{job.period}</span>
                                        <span className="exp__location">{job.location}</span>
                                    </div>
                                    <span className="exp__toggle" aria-hidden="true">
                    {active === job.id ? "−" : "+"}
                  </span>
                                </div>

                                {/* Expandable detail */}
                                <div className={`exp__detail${active === job.id ? " exp__detail--open" : ""}`}>
                                    <ul className="exp__highlights">
                                        {job.highlights.map((h) => (
                                            <li key={h} className="exp__highlight">
                                                <span className="exp__highlight-bullet" aria-hidden="true"/>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="exp__stack">
                                        {job.stack.map((s) => (
                                            <span key={s} className="exp__chip">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}