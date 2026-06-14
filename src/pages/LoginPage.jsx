import { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import ErrorMessage from '../components/Errormessage'
import { useNavigate } from 'react-router-dom'
import { loginURL } from '../config'



function LoginPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //BackEnd Url
    //const BE_BASE_URL = import.meta.env.BACKEND_URL

    //Error Message
    const [message, setMessage] = useState('')

    // Function that handles the login
    async function handleLogin() {

        try {

            const response = await fetch(loginURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })



            if (response.status === 401) {
                setMessage("Incorrect Password")
                return
            }

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('token', data.data.token)
                localStorage.setItem('role', data.data.role)

                if (data.data.role === "USER") {
                    navigate('/verify-address')
                } else {
                    navigate('/admin/dashboard')
                }

                return
            }

        } catch (error) {
            console.log(error)
            setMessage("Sever Error. Please try again later.")

        }

    }

    return (

        <main className="auth-main">
            <div className="auth-card">
                <h2>Login</h2>
                <input
                    className="auth-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ErrorMessage message={message} />
                <button className="submit-bttn" onClick={handleLogin}>Login</button>
                <p className="auth-link">
                    Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
                </p>
            </div>
        </main>
    )

}

export default LoginPage
