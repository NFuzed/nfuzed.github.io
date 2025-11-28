import React from "react";
import styles from './Projects.module.css';

export default function ProjectModal({project, onClose}: any) {
    return (
        <div className={styles.modalOverlay}>
            <button className={styles.close} onClick={onClose}>✕</button>

            <div className={styles.modalContent}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>

                <iframe
                    src={project.url}
                    title={project.title}
                    className={styles.iframe}
                />
            </div>
        </div>
    );
}
