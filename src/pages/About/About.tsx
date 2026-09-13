import {useEffect, useRef, useState} from "react";
import "./About.css";

const STATS = [
    {value: "3+", label: "Years professional experience"},
    {value: "1st", label: "Class BSc, City St George's"},
    {value: "95%", label: "OCR accuracy on GSDR schematics"},
    {value: "£M+", label: "Infrastructure value supported by HERMES"},
];

const FOCUS_AREAS = [
    {
        index: "01",
        title: "Simulation & modelling",
        body: "Built core features for HERMES, a nationwide rail simulation platform used in multimillion-pound UK infrastructure assessments.",
    },
    {
        index: "02",
        title: "Data automation",
        body: "Automated QA pipelines, OCR workflows, and symbol detection, cutting hours of manual work down to minutes with measurable accuracy gains.",
    },
    {
        index: "03",
        title: "ML | MCMC Sampling",
        body: "Founder of Bayers - A Rust library for Bayesian inference with an ask/tell interface.",
    },
];

function useInView(threshold = 0.15) {
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

export default function About() {
    const {ref: sectionRef, inView} = useInView(0.1);

    return (
        <section
            ref={sectionRef}
            className={`about${inView ? " about--visible" : ""}`}
            id="about"
        >
            {/* Background grid lines */}
            <div className="about__grid-bg" aria-hidden="true">
                {Array.from({length: 6}).map((_, i) => (
                    <div key={i} className="about__grid-line"/>
                ))}
            </div>

            <div className="about__inner">

                {/* Left col: label + bio */}
                <div className="about__left">
                    <div className="about__section-label">
                        <span className="about__label-line"/>
                        <span>About</span>
                    </div>

                    <h2 className="about__heading">
                        SOFTWARE ENGINEER.<br/>
                        <span className="about__heading-accent">SIMULATION SPECIALIST.</span><br/>
                    </h2>

                    <p className="about__bio">
                        I'm a Software Engineer with 3+ years of professional experience
                        building simulation environments, automation tooling, and
                        data-driven systems for demanding real-world domains.
                    </p>
                    <p className="about__bio">
                        Currently developing Bayers - a Bayesian inference built in Rust.
                    </p>
                    <p className="about__bio">
                        I've shipped national-level software and independently built AI-assisted tools that turn hours
                        of repetitive technical work into minutes. I'm drawn to problems where software has a real world
                        impact.
                    </p>

                    <div className="about__award">
                        <span className="about__award-icon">◆</span>
                        <span>Outstanding BSc Project Prize, City St George's, 2025</span>
                    </div>
                </div>

                {/* Right col: stats + focus areas */}
                <div className="about__right">

                    <div className="about__stats">
                        {STATS.map((s, i) => (
                            <div
                                key={s.label}
                                className="about__stat"
                                style={{animationDelay: `${0.1 + i * 0.08}s`}}
                            >
                                <span className="about__stat-value">{s.value}</span>
                                <span className="about__stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="about__focus">
                        {FOCUS_AREAS.map((f, i) => (
                            <div
                                key={f.index}
                                className="about__focus-item"
                                style={{animationDelay: `${0.3 + i * 0.12}s`}}
                            >
                                <div className="about__focus-header">
                                    <span className="about__focus-index">{f.index}</span>
                                    <span className="about__focus-title">{f.title}</span>
                                </div>
                                <p className="about__focus-body">{f.body}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}