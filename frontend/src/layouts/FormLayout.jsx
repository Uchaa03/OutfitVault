import React from 'react'

const FormLayout = ({children}) => {
    return (
        <main className="forms">
            <section className="forms__section">
                {children}
            </section>
        </main>
    )
}
export default FormLayout
