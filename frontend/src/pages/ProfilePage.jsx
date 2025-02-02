import React, { useEffect, useState } from 'react';
import { getUser } from "../config/Auth.jsx";
import { useEditUser, useSetEditUser, useToken } from "../store/authStore.jsx";
import { useUserContext } from "../context/userContext.jsx";
import LoadingPage from "./LoadingPage.jsx";
import ProfileEditCard from "../components/Card/ProfileEditCard.jsx";
import ProfileDisplayCard from "../components/Card/ProfileDisplayCard.jsx";

/**
 * ProfilePage Component
 *
 * Renders the user's profile page. Retrieves user data using the authentication token
 * and allows toggling between view and edit modes.
 *
 * @component
 * @returns {JSX.Element} The rendered ProfilePage component.
 */
const ProfilePage = () => {
  const token = useToken();
  const [userData, setUserdata] = useState({});
  const [loading, setLoading] = useState(true);
  const { logout } = useUserContext();
  const isEditing = useEditUser();
  const setIsEditing = useSetEditUser();

  useEffect(() => {
    // Retrieve user data when the component mounts or when the token changes.
    const fetchUserData = async () => {
      const data = await getUser(token);
      setUserdata(data);
      setLoading(false);
    };

    fetchUserData();
  }, [token]);

  if (loading) {
    // Show a loading screen while fetching user data.
    return <LoadingPage isVisible={loading} onFinish={() => setLoading(false)} />;
  }

  /**
   * Toggles the editing state for the user profile.
   */
  const setEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <main className="main__profile">
      <section className="profile__section">
        <header className="section__header">
          <h1 className="header__title">
            {isEditing ? "Editar Usuario" : "Perfil de Usuario"}
          </h1>
        </header>
        <section className="section__data">
          {isEditing ? (
            <ProfileEditCard userData={userData} setEdit={setEdit} />
          ) : (
            <ProfileDisplayCard userData={userData} setEdit={setEdit} logout={logout} />
          )}
          <img
            className="data__img"
            src="/assets/img/IconUser.svg"
            alt="Imagen de perfil de usuario"
          />
        </section>
      </section>
    </main>
  );
};

export default ProfilePage;