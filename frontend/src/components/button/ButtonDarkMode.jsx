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
        darkMode?
            <button className="button_darkmode" onClick={handleClick}>ModoClaro</button>:
            <button className="button_lightmode" onClick={handleClick}>ModoOscuro</button>

    )
}
export default ButtonDarkMode
