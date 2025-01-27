import React, {useEffect, useState} from 'react'
import {getUser} from "../config/Auth.jsx";
import {useToken} from "../store/authStore.jsx";
import {useUserContext} from "../context/userContext.jsx";

const ProfilePage = () => {
    const token = useToken()
    const [userData, setUserdata] = useState({})
    const [loading, setLoading] = useState(true)
    const { logout } = useUserContext();

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUser(token)
            setUserdata(data)
            setLoading(false)
        }

        fetchUserData()
    }, [token]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <main className="main__profile">
            <section className="profile__section">
                <header className="section__header">
                    <h1 className="header__title">Perfil de Usuario</h1>
                </header>
                <section className="section__data">
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
                            <button className="buttons__button">Editar Usuario</button>
                            <button className="buttons__button" onClick={() => logout()}>Cerrar Sesión</button>
                        </section>
                    </article>
                    <img className="data__img" src="/assets/img/IconUser.svg" alt="Imagen de perfil de usuairo"/>
                </section>
            </section>
        </main>
    )
}

export default ProfilePage
