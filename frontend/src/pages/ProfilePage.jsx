import React, { useEffect, useState } from 'react';
import { getUser } from "../config/Auth.jsx";
import {useEditUser, useSetEditUser, useToken} from "../store/authStore.jsx";
import { useUserContext } from "../context/userContext.jsx";
import LoadingPage from './LoadingPage.jsx';
import ProfileDisplayCard from "../components/Card/ProfileDisplayCard.jsx";
import ProfileEditCard from "../components/Card/ProfileEditCard.jsx";

const ProfilePage = () => {
    const token = useToken();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const { logout } = useUserContext();
    const isEditing = useEditUser();
    const setIsEditing = useSetEditUser();

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUser(token);
            setUserData(data);
            setLoading(false);
        };

        fetchUserData();
    }, [token, isEditing]);

    if (loading) {
        return <LoadingPage isVisible={loading} onFinish={() => setLoading(false)} />;
    }

    const setEdit = () => {
        setIsEditing(!isEditing); //Change the value
    };

    return (
        <main className="main__profile">
            <section className="profile__section">
                <header className="section__header">
                    <h1 className="header__title">{isEditing?"Editar Usuario":"Perfil de Usuario"}</h1>
                </header>
                <section className="section__data">
                    {isEditing ? (
                        <ProfileEditCard userData={userData} setEdit={setEdit} />
                    ) : (
                        <ProfileDisplayCard userData={userData} setEdit={setEdit} logout={logout} />
                    )}
                    <img className="data__img" src="/assets/img/IconUser.svg" alt="Imagen de perfil de usuario"/>
                </section>
            </section>
        </main>
    );
};

export default ProfilePage

