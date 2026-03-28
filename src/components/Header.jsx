import React from 'react'

function Header() {
    return (
        <header className="header">
            <div className="header__icon">❤️</div>
            <h1 className="header__title">Heart Disease Prediction</h1>
            <p className="header__subtitle">
                Enter patient medical details below for an instant ML-powered risk assessment
            </p>
        </header>
    )
}

export default Header
