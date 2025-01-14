import FormLayout from "../layouts/FormLayout.jsx";


const LoginPage = () => {
  return (
      <FormLayout>
          <h1 className="section__title">Inicia Sesión</h1>
          <article className="section__article">
              <img className="article__img" src="/assets/img/IconUser.svg" alt="Imagen de incio de sesión"/>
              <form className="article__form">
                  <label className="form__label">Nombre de Usuario</label>
                  <input className="form__input" type="text"/>
                  <label className="form__label">Contraseña</label>
                  <input className="form__input" type="text"/>
              </form>
          </article>

      </FormLayout>
  )
}

export default LoginPage