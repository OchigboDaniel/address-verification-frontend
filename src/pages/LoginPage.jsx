import { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'


function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Function that handles the login
    async function handleLogin() {
        console.log(email + " and " + password)
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()
        console.log(data)
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

            <Button text="Login" handleSubmit={handleLogin} />
        </main>
    )
}

export default LoginPage
