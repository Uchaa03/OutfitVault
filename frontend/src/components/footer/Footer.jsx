import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../button/button';

const Footer = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
        <section className='footer'>
            <p className='footer__terms-and-conditions'>
                {isMobile ? 'CC BY-NC-ND 4.0' : 
                'Por OutfitVault ©2025 Adrián Ucha, Pablo Barrera, Maurice Darner está autorizado bajo CC BY-NC-ND 4.0 licencia CC BY-NC-ND 4.0'}
            </p>
            <Button className='footer__button' onClick={handleClick}>
                Contáctanos
            </Button>
        </section>
    )
}

export default Footer