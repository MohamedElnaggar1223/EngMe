import { useState } from "react"
import { auth } from '../../../../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth"

export default function Login() 
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const logIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => console.log(userCredentials))
        .catch(e => console.error(e))
    }

    return (
        <div>
            <form onSubmit={logIn}>
                <h1>Log In</h1>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Log In</button>
            </form>
        </div>
    )
}
