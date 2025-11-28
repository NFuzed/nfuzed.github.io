import styles from './Projects.module.css';
import React from "react";

export default function TimelineItem({project, position, onClick}: any) {
    return (
        <button
            className={`${styles.item} ${styles[position]}`}
            onClick={onClick}
        >
            <span className={styles.year}>{project.year}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
        </button>
    );
}
