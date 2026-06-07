import { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import ErrorMessage from '../components/Errormessage'
import { useNavigate } from 'react-router-dom'




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

       //const loginURL = BE_BASE_URL + "/api/auth/login"

        try {

            const response = await fetch("http://localhost:8080/api/auth/login", {
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
                console.log(data.data.token)
                localStorage.setItem('token', data.data.token)
                navigate('/verify')

                return
            }

        } catch (error) {
            console.log(error)
            setMessage("Sever Error. Please try again later.")

        }

    }

    return (
        <main>
            <h1>Login</h1>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />

            <Input
                type="password"
                placeholder="Password"
                value={password}
                setValue={setPassword}
            />
            <ErrorMessage message={message} />

            <Button text="Login" handleSubmit={handleLogin} />
        </main>
    )
}

export default LoginPage
