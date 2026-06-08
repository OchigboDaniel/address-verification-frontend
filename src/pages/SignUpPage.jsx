import { useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/Errormessage';




function SignUpPage() {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    //Error Message
    const [message, setMessage] = useState('')

    //BE base URL
   //const BE_BASE_URL = import.meta.env

    //Function to handle signup
    async function handleSignUp() {

        //const signupURL = BE_BASE_URL + "/api/auth/signup"
        
        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
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
            <div className="wrapper">
      <div className="auth-card">
            <h1>SignUp</h1>
            <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                setValue={setFullName}
            />
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