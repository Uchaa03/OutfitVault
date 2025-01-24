import React from 'react'
import userContext from "../context/userContext.jsx";
import {Navigate} from "react-router-dom";

const OutfitPage = () => {
    const token = userContext()
    if (!token) return <Navigate to="/login"/>

    return (
        <div>OutfitPage</div>
    )
}
export default OutfitPage