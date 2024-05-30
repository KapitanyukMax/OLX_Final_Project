import React, { FormEvent } from 'react';
import { auth, db, signInWithGooglePopup } from "../../firebase/firebase.ts";
import { signInWithEmailAndPassword } from 'firebase/auth';

async function handleLogin(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const { email, password } = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
  };
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

const logGoogleUser = async () => {
  const response = await signInWithGooglePopup();
  console.log(response);
}

export const Login: React.FC = () => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
        <button type="submit">LOGIN</button>
      </form>
      <div>
        <button onClick={logGoogleUser}>Sign In With Google</button>
      </div>
    </div>
  )
}