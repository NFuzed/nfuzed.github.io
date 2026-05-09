import {useEffect, useRef, useState} from "react";
import "./Projects.css";

const PROJECTS = [
    {
        id: "symbol-trainer",
        index: "01",
        title: "Schematic Symbol Trainer",
        period: "Feb 2025 — Jun 2025",
        category: "Computer Vision · AI Tooling",
        github: "https://github.com/NFuzed/Schematic-Symbol-Trainer-Graphical",
        summary:
            "An interactive desktop tool that lets engineers define, annotate, and train object detection models from as few as 10–20 examples per symbol — turning legacy schematic digitisation from a multi-day job into minutes.",
        highlights: [
            "Built annotation and snipping tools to generate synthetic datasets with minimal labelled data",
            "Supports Faster R-CNN, HOG + SVM, OpenCV template matching, and OpenAI CLIP pipelines",
            "Achieved 93% symbol matching accuracy on unseen test schematics",
            "Reduced model iteration time from days to hours via flexible dataset pipeline architecture",
        ],
        stack: ["Python", "PySide6", "PyTorch", "OpenCV", "Faster R-CNN", "CLIP"],
        accent: "#378add",
        accentDim: "rgba(55,138,221,0.08)",
        accentBorder: "rgba(55,138,221,0.22)",
        metric: {value: "93%", label: "accuracy on unseen schematics"},
        images: [
            "home-page.png",
            "diagrams-page.png",
            "entities-page.png",
            "populated-home-page.png",
            "results.png"
        ] as string[],
    },
    {
        id: "minecraft-turtle",
        index: "02",
        title: "Minecraft Turtle Integration System",
        period: "Mar 2024 — Jun 2024",
        category: "Systems Architecture · Full Stack",
        github: "https://github.com/NFuzed/Computer-Craft-Kotlin",
        summary:
            "A microservices-based system that bridges Minecraft's ComputerCraft environment with real-world backend infrastructure — demonstrating robotics pipeline patterns through real-time command dispatching and 3D visualisation.",
        highlights: [
            "Designed two-way WebSocket communication between Minecraft and external services",
            "Built a modular 3D ReactJS front-end visualising turtle positions and environment state in real time",
            "Introduced RabbitMQ for reliable command dispatching and PostgreSQL for persistent world state",
            "Enabled authorised external control of in-game agents via a REST API",
        ],
        stack: ["Kotlin", "ReactJS", "WebSockets", "RabbitMQ", "PostgreSQL", "REST APIs"],
        accent: "#1d9e75",
        accentDim: "rgba(29,158,117,0.07)",
        accentBorder: "rgba(29,158,117,0.2)",
        metric: {value: "2-way", label: "real-time game ↔ backend sync"},
        images: [
            // Import your images at the top of this file and reference them here, e.g.:
            // minecraft1,
            // minecraft2,
        ] as string[],
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

export default function Projects() {
    const {ref, inView} = useInView(0.05);
    const [hovered, setHovered] = useState<string | null>(null);
    const [lightbox, setLightbox] = useState<string | null>(null);

    // Close lightbox on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(null);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
        <section
            ref={ref}
            className={`proj${inView ? " proj--visible" : ""}`}
            id="projects"
        >
            <div className="proj__inner">

                {/* ── Header ── */}
                <div className="proj__header">
                    <div className="proj__section-label">
                        <span className="proj__label-line"/>
                        <span>Projects</span>
                    </div>
                    <div className="proj__header-row">
                        <h2 className="proj__heading">Things I've built.</h2>
                        <p className="proj__subheading">
                            Independent work alongside professional roles —
                            tools that solve real problems in technical domains.
                        </p>
                    </div>
                </div>

                {/* ── Project cards ── */}
                <div className="proj__list">
                    {PROJECTS.map((p, i) => (
                        <article
                            key={p.id}
                            className={`proj__card${hovered === p.id ? " proj__card--hovered" : ""}`}
                            style={{
                                animationDelay: `${i * 0.18}s`,
                                "--accent": p.accent,
                                "--accent-dim": p.accentDim,
                                "--accent-border": p.accentBorder,
                            } as React.CSSProperties}
                            onMouseEnter={() => setHovered(p.id)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Left: index + metric */}
                            <div className="proj__card-left">
                                <span className="proj__index">{p.index}</span>
                                <div className="proj__metric">
                                    <span className="proj__metric-value">{p.metric.value}</span>
                                    <span className="proj__metric-label">{p.metric.label}</span>
                                </div>
                            </div>

                            {/* Right: content */}
                            <div className="proj__card-right">
                                <div className="proj__card-top">
                                    <div>
                                        <div className="proj__category">{p.category}</div>
                                        <h3 className="proj__title">{p.title}</h3>
                                        <span className="proj__period">{p.period}</span>
                                    </div>
                                    {p.github && (
                                        <a
                                            href={p.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="proj__github-link"
                                        >
                                            <svg viewBox="0 0 24 24" fill="currentColor"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                            </svg>
                                        </a>
                                    )}
                                </div>

                                <p className="proj__summary">{p.summary}</p>

                                {/* ── Image strip ── */}
                                {p.images.length > 0 && (
                                    <div className="proj__images">
                                        {p.images.map((photoID) => (
                                            <button
                                                key={photoID}
                                                className="proj__image-thumb"
                                                onClick={() => setLightbox(`/projects/${p.id}/${photoID}`)}
                                                aria-label="View image fullscreen"
                                            >
                                                <img src={`/projects/${p.id}/${photoID}`} alt="" loading="lazy"/>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <ul className="proj__highlights">
                                    {p.highlights.map((h) => (
                                        <li key={h} className="proj__highlight">
                                            <span className="proj__highlight-bullet" aria-hidden="true"/>
                                            {h}
                                        </li>
                                    ))}
                                </ul>

                                <div className="proj__stack">
                                    {p.stack.map((s) => (
                                        <span key={s} className="proj__chip">{s}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Accent bar */}
                            <div className="proj__accent-bar" aria-hidden="true"/>
                        </article>
                    ))}
                </div>

            </div>

            {/* ── Lightbox ── */}
            {lightbox && (
                <div
                    className="proj__lightbox"
                    onClick={() => setLightbox(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image preview"
                >
                    <div className="proj__lightbox-inner" onClick={(e) => e.stopPropagation()}>
                        <img src={lightbox} alt="" className="proj__lightbox-img"/>
                        <button
                            className="proj__lightbox-close"
                            onClick={() => setLightbox(null)}
                            aria-label="Close preview"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}