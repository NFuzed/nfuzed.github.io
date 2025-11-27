import React from "react";
import styles from './Hero.module.css'

export default  function Hero(){
    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.inner}>
                <h1 className={styles.name}>Furqan Faruqui</h1>
                <p className={styles.tagline}>
                    Software Engineer | Java & Backend Specialist | Building Simulation & Automation Tools
                </p>
            </div>
        </section>
    );
}