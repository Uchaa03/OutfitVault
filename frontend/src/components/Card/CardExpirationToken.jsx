import React from 'react'
import {useUserContext} from "../../context/userContext.jsx";
import {renewToken} from "../../config/Auth.jsx";

const CardExpirationToken = () => {
    const {logout} = useUserContext()
    const storedToken = localStorage.getItem("authToken")

    return (
        <section className="card">
            <h2 className="card__title">Tu sesión expira en 1 minuto</h2>
            <button className="card__button" onClick={() => renewToken(storedToken)}>Renovar Sesión</button>
            <button className="card__button" onClick={() => logout()}>Cerrar Sesión</button>
        </section>
    )
}
export default CardExpirationToken
