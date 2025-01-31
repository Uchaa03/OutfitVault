import React from 'react';
import { useUserContext } from "../../context/userContext.jsx";
import { renewToken } from "../../config/Auth.jsx";
import {useSetTimeExpiration, useSetToken} from "../../store/authStore.jsx";

const CardExpirationToken = ({ setShowWarning }) => {
    const { logout, login } = useUserContext(); // Asegúrate de tener la función login en el contexto
    const storedToken = localStorage.getItem("authToken");
    const setToken = useSetToken();
    const setTimeExpiration = useSetTimeExpiration();


    const handleRenewToken = async () => {
        try {
            const response = await renewToken(storedToken);
            if (response.success) {
                // Actualiza el token en el estado global y en el localStorage
                localStorage.setItem("authToken", response.token);
                const newDateExpiration =  new Date(localStorage.getItem("timeExpiration"));
                newDateExpiration.setHours(newDateExpiration.getHours() + 1);
                localStorage.setItem("timeExpiration", newDateExpiration.toISOString());
                setTimeExpiration(newDateExpiration);
                setToken(response.token);
                setShowWarning(false); // Oculta la tarjeta de advertencia
            } else {
                console.error('Error al renovar el token:', response.message);
            }
        } catch (error) {
            console.error('Error al renovar el token:', error.message);
        }
    };

    const handleLogout = () => {
        logout(); // Cierra la sesión
        setShowWarning(false); // Oculta la tarjeta
    };

    return (
        <section className="section__token">
            <h1 className="token__title">Tu sesión expira pronto</h1>
            <h2 className="token__subtitle">¿Quieres renovar la sesión?</h2>
            <button className="token__button" onClick={handleRenewToken}>
                Renovar Sesión
            </button>
            <button className="token__button" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </section>
    );
};

export default CardExpirationToken;