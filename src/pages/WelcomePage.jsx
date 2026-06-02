import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function WelcomePage() {
    const navigate = useNavigate()

    return (
        <main>
            <div className="pattern" />

            <div className="wrapper">
                <header>
                    <h1>Verify <span className="text-gradient">Address</span> with Confidence</h1>
                </header>

                

                <div className="text-white text-3xl">
                    <p>Instantly confirm you are physically present at any address using your device location.</p>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
            </div>


        </main>
    )
}

export default WelcomePage
