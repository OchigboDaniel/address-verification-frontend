import { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import ErrorMessage from '../components/Errormessage'
import { useNavigate } from 'react-router-dom'


function LoginPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Error Message
    const [message, setMessage] = useState('')

    // Function that handles the login
    async function handleLogin() {

        try {

            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.status === 401) {
                setMessage("Incorrect Password")
                return
            }



            if (response.ok) {
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
