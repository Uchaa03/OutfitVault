import React, {useEffect, useState} from 'react'
import {getUser} from "../config/Auth.jsx";
import {useToken} from "../store/authStore.jsx";
import {useUserContext} from "../context/userContext.jsx";
import LoadingPage from './LoadingPage.jsx';

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
    const token = useToken(); // Get the authentication token from the auth store
    const [userData, setUserdata] = useState({}); // State to store user data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const { logout } = useUserContext(); // Get the logout function from context

    useEffect(() => {
        /**
         * Fetch user data from the API.
         * This function is called inside useEffect to ensure it runs on initial render
         * or when the token changes.
         */
        const fetchUserData = async () => {
            try {
                const data = await getUser(token); // Fetch user data from server using the token
                setUserdata(data); // Update state with fetched data
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching user data:", error); // Handle any errors during fetch
            }
        };

        if (token) {
            fetchUserData(); // Fetch user data only if there's a valid token
        }
    }, [token]); // Dependency array ensures the effect runs when the token changes

    if (loading) {
        return <LoadingPage isVisible={loading} onFinish={() => setLoading(false)} />;
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
                          {userData.user.username} {/* Display username */}
                      </p>
                      <p className="article__text">
                          <span className="article__title">Correo: </span>
                          {userData.user.email} {/* Display user email */}
                      </p>
                      <section className="article__buttons">
                          <button className="buttons__button">Editar Usuario</button>
                          <button
                            className="buttons__button"
                            onClick={() => logout()} // Call logout function on click
                          >
                              Cerrar Sesión
                          </button>
                      </section>
                  </article>
                  <img
                    className="data__img"
                    src="/assets/img/IconUser.svg"
                    alt="Imagen de perfil de usuario" // Alt text for the profile image
                  />
              </section>
          </section>
      </main>
    );
};

export default ProfilePage;
