import { useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/Errormessage';
import {signupURL} from '../config';





function SignUpPage() {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    //Error Message
    const [message, setMessage] = useState('')

    //Function to handle signup
    async function handleSignUp() {

        try {
            const response = await fetch(signupURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password })
            })

            const data = await response.json()

            if (response.ok) {
                navigate('/login')
                return
            }

        } catch (error) {

            setMessage("Sever Error. Please try again later.")

        }
    }

    return (
        <main>
            <div className="auth-main">
                <div className="auth-card">
                    <h1>SignUp</h1>
                    <Input
                        className="auth-input"
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        setValue={setFullName}
                    />
                    <Input
                        className="auth-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        setValue={setEmail}
                    />
                    <Input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
                    />

                    <ErrorMessage message={message} />

                    <Button
                        text="Sign Up"
                        handleSubmit={handleSignUp}
                    />

                    <p className="auth-link">
                        Already have an account? <span onClick={() => navigate('/login')}>login</span>
                    </p>

                </div>
            </div>



        </main>
    )
}

export default SignUpPage;