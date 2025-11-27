import React from "react";
import styles from './Navbar.module.css'
import logo from '../../assets/logo-transparent.png'

export default  function Navbar(){
    return (
        <header className={styles.navbar}>
            <nav className={styles.inner}>
                <a href={"#hero"} className={styles.logo}>
                    <img src={logo} alt="Furqan" />
                </a>

                <ul className={styles.links}>
                    <li><a href={'#hero'}>Home</a></li>
                </ul>
            </nav>
        </header>
    );
}