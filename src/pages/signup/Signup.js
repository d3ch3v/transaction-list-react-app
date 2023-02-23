//styles
import { useState } from 'react'
import styles from './Signup.module.css'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [password, setPassword] = useState('')
    const { signup, isPending, error } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName)
    }


    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
            <h2>Sign up</h2>
            <label>
                <span>Email:</span>
                <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
            </label>
            <label>
                <span>Enter password:</span>
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            </label>
            <label>
                <span>Display name:</span>
                <input type='text' onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
            </label>
            {!isPending && <button className='btn'>Sign up</button>}
            {isPending && <button className='btn' disabled>Loading ...</button>}
            {error && <p>{error}</p>}
        </form>
    )
}
