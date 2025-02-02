import React, { useEffect } from "react";
import { useSetUser } from "../../store/authStore.jsx";
import Button from "../button/button.jsx";

/**
 * ProfileDisplayCard component displays user information such as username and email.
 * It also provides buttons to edit the username or log out.
 *
 * @param {Object} userData - The user data, including username and email.
 * @param {Function} setEdit - Function to toggle edit mode for the username.
 * @param {Function} logout - Function to handle logging out the user.
 * 
 * @returns {JSX.Element} The profile display card with user details and buttons.
 */
const ProfileDisplayCard = ({ userData, setEdit, logout }) => {
    const setUser = useSetUser();
    
    // Move setUser to useEffect
    useEffect(() => {
        setUser(userData.user.username);
    }, [userData.user.username, setUser]);

    return (
        <article className="data__article">
            <p className="article__text">
                <span className="article__title">Usuario: </span>
                {userData.user.username}
            </p>
            <p className="article__text">
                <span className="article__title">Correo: </span>
                {userData.user.email}
            </p>
            <section className="article__buttons">
                <Button className="buttons__button" onClick={setEdit}>
                    Editar Usuario
                </Button>
                <Button className="buttons__button" onClick={() => logout()}>
                    Cerrar Sesión
                </Button>
            </section>
        </article>
    );
};

export default ProfileDisplayCard;