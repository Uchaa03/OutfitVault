import FormLayout from "../layouts/FormLayout.jsx";


const LoginPage = () => {
  return (
      <FormLayout>
          <header className="section__header">
              <h1 className="header__title">Inicia Sesión</h1>
              <button className="header__button">Regístrate</button>
          </header>
          <form className="section__form">
              <img className="form__img" src="/assets/img/IconUser.svg" alt="Imagen de incio de sesión"/>
              <fieldset className="form__fieldset">
                  <label className="fieldset__label">Nombre de Usuario</label>
                  <input className="fieldset__input" type="text"/>
                  <label className="fieldset__label">Contraseña</label>
                  <input className="fieldset__input" type="text"/>
              </fieldset>
              <button className="form__button">Iniciar Sesión</button>
          </form>
      </FormLayout>
  )
}

export default LoginPage