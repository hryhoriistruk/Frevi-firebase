import { signIn } from 'next-auth/react'

export default function LoginPage() {
    const handleGoogleLogin = () => signIn('google')

    return (
        <div className="auth-page">
            <h1>Welcome to Frevi</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    )
}