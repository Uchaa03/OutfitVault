import FormLayout from "../layouts/FormLayout.jsx";


const LoginPage = () => {
  return (
      <FormLayout>
          <header className="section__header">
              <h1 className="header__title">Inicia Sesión</h1>
              <button className="header__button">Regístrate</button>
          </header>
          <article className="section__article">
              <img className="article__img" src="/assets/img/IconUser.svg" alt="Imagen de incio de sesión"/>
              <form className="article__form">
                  <section className="form__section">
                      <label className="section__label">Nombre de Usuario</label>
                      <input className="section__input" type="text"/>
                  </section>
                  <sectionf className="form__section">
                      <label className="section__label">Contraseña</label>
                      <input className="section__input" type="text"/>
                  </sectionf>
                  <button className="form__button">Iniciar Sesión</button>
              </form>
          </article>

      </FormLayout>
  )
}

export default LoginPage