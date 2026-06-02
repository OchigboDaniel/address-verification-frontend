import { useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';



function signUp() {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSignUp(){
        console.log("signup" + fullName)
    }

    return (
        <main>
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

            <Button
                text="Sign Up"
                handleSubmit={handleSignUp}
            />



        </main>
    )
}

export default signUp;