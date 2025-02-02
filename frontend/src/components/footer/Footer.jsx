import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../button/button';
import {useDarkMode} from "../../store/authStore.jsx";

const Footer = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const darkMode = useDarkMode();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = () => {
        navigate("/contact");
    };
  
    return (
        <section className={darkMode ? "footer footer--dark" : "footer"}>
            <p className='footer__terms-and-conditions'>
                {isMobile ? 'CC BY-NC-ND 4.0' : 
                'Por OutfitVault ©2025 Adrián Ucha, Pablo Barrera, Maurice Darner está autorizado bajo CC BY-NC-ND 4.0 licencia CC BY-NC-ND 4.0'}
            </p>
            <Button className={darkMode ? "footer__button footer__button--dark" : "footer__button"} onClick={handleClick}>
                Contáctanos
            </Button>
        </section>
    )
}

export default Footer