import React from 'react'
import {setUseDarkMode, useDarkMode} from "../../store/authStore.jsx";


const ButtonDarkMode = () => {
    const darkMode = useDarkMode()
    const setDarkMode = setUseDarkMode()

    const handleClick = () => {
        setDarkMode(!darkMode)
        console.log(darkMode)
    }

    return (
        <img
            alt={"Boton de Cambio de tema oscuro/claro"}
            src={darkMode?"/assets/img/CloudySun.png":"/assets/img/CloudyNight.png"}
            className={darkMode? "darkmode__button darkmode__button--dark":"darkmode__button"}
            onClick={handleClick}
        />
    )
}
export default ButtonDarkMode
