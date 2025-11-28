import React, {useState} from 'react';
import styles from './Projects.module.css';
import {projects} from './Projects.data';
import TimelineItem from './TimelineItem.tsx';
import ProjectModal from './ProjectModal';

export default function Projects() {
    const [activeProject, setActiveProject] = useState<any>(null);

    return (
        <section id="projects" className={styles.projects}>
            <h2 className={styles.title}>Selected Work</h2>

            <div className={styles.timeline}>
                {projects.map((project, index) => (
                    <TimelineItem
                        key={project.id}
                        project={project}
                        position={index % 2 === 0 ? 'top' : 'bottom'}
                        onClick={() => setActiveProject(project)}
                    />
                ))}
            </div>

            {activeProject && (
                <ProjectModal
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                />
            )}
        </section>
    );
}
