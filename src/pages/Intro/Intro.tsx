import {useEffect, useRef, useState} from "react";
import "./Intro.css";

const ROLES = [
    "Software Engineer",
    "Simulation Builder",
    "Automation Specialist",
    "ML Researcher",
];

export default function Intro() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [visible, setVisible] = useState(false);

    // Fade in on mount
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    // Typewriter
    useEffect(() => {
        const current = ROLES[roleIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        } else if (!deleting && displayed.length === current.length) {
            timeout = setTimeout(() => setDeleting(true), 2200);
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setRoleIndex((i) => (i + 1) % ROLES.length);
        }

        return () => clearTimeout(timeout);
    }, [displayed, deleting, roleIndex]);

    // Particle canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const NODE_COUNT = 55;
        const MAX_DIST = 130;

        type Node = { x: number; y: number; vx: number; vy: number; r: number; pulse: number };
        const nodes: Node[] = Array.from({length: NODE_COUNT}, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.28,
            vy: (Math.random() - 0.5) * 0.28,
            r: Math.random() * 1.4 + 0.6,
            pulse: Math.random() * Math.PI * 2,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < MAX_DIST) {
                        const alpha = (1 - d / MAX_DIST) * 0.18;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(55,138,221,${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            // Nodes
            for (const n of nodes) {
                n.pulse += 0.018;
                const glow = 0.4 + Math.sin(n.pulse) * 0.15;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r + 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(55,138,221,${glow * 0.18})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(133,183,235,${glow})`;
                ctx.fill();

                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({behavior: "smooth"});
    };

    return (
        <section className={`intro${visible ? " intro--visible" : ""}`} id="intro">
            <canvas ref={canvasRef} className="intro__canvas"/>

            <div className="intro__content">
                <div className="intro__tag">
                    <span className="intro__tag-dot"/> London, UK · Available for opportunities
                </div>

                <h1 className="intro__name">Furqan<br/>Faruqui</h1>

                <div className="intro__role">
                    <span className="intro__role-text">{displayed}</span>
                    <span className="intro__cursor"/>
                </div>

                <p className="intro__desc">
                    Building systems that model, automate, and simulate —
                    from national rail infrastructure to computer vision tooling
                    and ML applied to computational biology.
                </p>

                <div className="intro__actions">
                    <button className="intro__btn intro__btn--primary" onClick={() => scrollTo("projects")}>
                        View projects
                    </button>
                    <button className="intro__btn intro__btn--ghost" onClick={() => scrollTo("contact")}>
                        Get in touch →
                    </button>
                </div>

                <div className="intro__scroll">
                    <span>scroll</span>
                    <div className="intro__scroll-line"/>
                </div>
            </div>
        </section>
    );
}