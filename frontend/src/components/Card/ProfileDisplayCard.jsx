import React from "react";
import {useSetUser} from "../../store/authStore.jsx";
import Button from "../button/button.jsx";

const ProfileDisplayCard = ({ userData, setEdit, logout }) => {
    const setUser = useSetUser();
    setUser(userData.user.username);

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
                <Button className="buttons__button" onClick={setEdit}>Editar Usuario</Button>
                <Button className="buttons__button" onClick={() => logout()}>Cerrar Sesión</Button>
            </section>
        </article>
    );
};

export default ProfileDisplayCard