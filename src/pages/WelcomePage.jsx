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

                <p className="text-center text-light-200 mt-4 max-w-xl mx-auto">
        Instantly confirm you are physically present at any address using your device location.
      </p>

                

                <div className="flex flex-row gap-4 justify-center mt-8">
                    <button className="submit-bttn w-32" onClick={() => navigate('/login')}>Login</button>
                    <button className="submit-bttn w-32" onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
            </div>


        </main>
    )
}

export default WelcomePage
