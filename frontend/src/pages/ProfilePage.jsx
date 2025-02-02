import React, {useEffect, useState} from 'react'
import {getUser} from "../config/Auth.jsx";
import {useEditUser, useSetEditUser, useToken} from "../store/authStore.jsx";
import {useUserContext} from "../context/userContext.jsx";
import LoadingPage from './LoadingPage.jsx'; 
import ProfileEditCard from '../components/Card/ProfileEditCard.jsx';
import ProfileDisplayCard from '../components/Card/ProfileDisplayCard.jsx';
/**
 * ProfilePage Component
 *
 * This component renders the user's profile page, fetching their data from the server
 * based on the authentication token. It displays the user's username, email, and allows
 * the user to log out or edit their profile.
 *
 * @component
 * @returns {JSX.Element} The rendered profile page or a loading message if data is being fetched.
 */
const ProfilePage = () => {
    const token = useToken()
    const [userData, setUserdata] = useState({})
    const [loading, setLoading] = useState(true)
    const { logout } = useUserContext();
    const isEditing = useEditUser();
    const setIsEditing = useSetEditUser();

    useEffect(() => {
        /**
         * Fetch user data from the API.
         * This function is called inside useEffect to ensure it runs on initial render
         * or when the token changes.
         */
        const fetchUserData = async () => {
            const data = await getUser(token)
            setUserdata(data)
            setLoading(false)
        }

        fetchUserData()
    }, [token]);

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
