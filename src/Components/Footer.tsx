import React from "react"
import styles from "./Footer.module.css"


const Footer =()=>{
    return (
        <footer className={styles.footer}>
            <p>
                <span>Cadastro de Clientes</span> @SENAI
            </p>
        </footer>
    );
}

export default Footer;