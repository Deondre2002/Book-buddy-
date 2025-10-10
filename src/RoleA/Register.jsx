import { useState } from "react"
import { useAuth } from "./AuthContext";

 export function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

const usernameChange = () => {
    console.log("event", event.target.value)
    setUsername(event.target.value)
}

const passwordChange = () => {
    console.log("event", event.target.value)
    setPassword(event.target.value)
}

    return (
        <form action="">
            <h1>Register</h1>
            <label htmlFor="username">
                <input type="text" placeholder="username" value={username} onChange={usernameChange} />
                </label>
            <label htmlFor="password">
                <input type="password" placeholder="password" value={password} onChange={passwordChange} />
                </label>
            <button type="submit">Sign Up</button>
        </form>
    )
}