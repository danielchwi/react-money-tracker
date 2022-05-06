import { useState } from 'react'
import styles from './Signup.module.css'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signup, error, isPending } = useSignup()

  const handleSubmit = e => {
    e.preventDefault()
    signup({email, password, displayName})
  }
  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <label>
        <span>Display name:</span>
        <input
          type='text'
          onChange={e => setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>

      <label>
        <span>Email:</span>
        <input
          type='email'
          onChange={e => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type='password'
          onChange={e => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>

      {!isPending &&<button className='btn' type='submit'>Sign Up</button>}
      {isPending && <button className='btn' disabled>Loading</button>}
      {error && <p className='error'>{error}</p>}

    </form>
  )
}
