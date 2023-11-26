import { useState } from "react"
import { auth } from '../../../../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function Signup() 
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => console.log(userCredentials))
        .catch(e => console.error(e))
    }

    return (
        <div>
            <form onSubmit={signUp}>
                <h1>Sign Up</h1>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}
